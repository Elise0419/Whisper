import { useEffect, useState } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import "./CSS/Adminall.css";

function ArticleAdmin() {
  const [data, setData] = useState([]);
  const [lastpage, setLastpage] = useState({});
  const match = useRouteMatch();
  const { page } = useParams();

  const token = localStorage.getItem("token");


  const DeleteClick = (post_id) => {
    if (window.confirm("確定要刪除此貼文嗎")) {
      fetch(
        `http://118.233.222.23:8000/api/admin/management/articles/delete/post_${post_id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (res.status >= 400) {
            alert("刪除貼文失敗，請重新操作");
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            alert("刪除貼文成功");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  useEffect(() => {
    fetch(
      `http://118.233.222.23:8000/api/admin/management/articles/show/${match.params.page}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          alert("你無權造訪此頁面");
          throw new Error("API request failed");
        } else return res.json();
      })
      .then((res) => {
        console.log(res)
        setData(res.articles.data);
        setLastpage(res.articles.last_page)

      })
      .catch((error) => {
        console.error("發生錯誤：", error);
      });
  }, [page]);

  return (
    <div>
      <h1>文章資訊</h1>
      <table>
        <thead>
          <tr>
            <th>文章ID</th>
            <th>貼文標題</th>
            <th>貼文者ID</th>
            <th>貼文者名稱</th>
            <th>貼文內容</th>
            <th>執行操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.post_id}</td>
              <td dangerouslySetInnerHTML={{ __html: item.title }} />
              <td>{item.user_id}</td>
              <td>{item.users.mem_name}</td>
              <td dangerouslySetInnerHTML={{ __html: item.content }} />
              {/* <td>{item.content}</td> */}
              <td>
                <Link to={`/admin/post_${item.post_id}/comments/1`}>
                  文章評論
                </Link>
                <button onClick={() => DeleteClick(`${item.post_id}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/admin/article/${parseInt(match.params.page) - 1}`}>
        pre
      </Link>
      {Array.from({ length: lastpage }).map((_, index) => (
        <span key={index}>
          &nbsp;
          <Link to={`/admin/article/${parseInt(index) + 1}`}>
            {index + 1}
          </Link>
          &nbsp;
        </span>
      ))}
      <Link to={`/admin/article/${parseInt(match.params.page) + 1}`}>
        next
      </Link>
    </div>
  );
}
export default ArticleAdmin;
