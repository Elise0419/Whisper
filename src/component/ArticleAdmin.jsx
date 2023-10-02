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
        `http://127.0.0.1:8000/api/admin/management/articles/delete/post_${post_id}`,
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
      `http://127.0.0.1:8000/api/admin/management/articles/show/${match.params.page}`,
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
        console.log(res);
        setData(res.articles.data);
        setLastpage(res.articles.last_page);
      })
      .catch((error) => {
        console.error("發生錯誤：", error);
      });
  }, [page]);

  return (
    <div className="adminbody">
      <div className="adminContainer">
        <div className="adminHeadline"> 文章資訊</div>
        <table className="adminTable">
          <thead>
            <tr className="adminTh">
              <th className="adminID">文章ID</th>
              <th className="adminTitle">貼文標題</th>
              <th className="adminID">貼文者ID</th>
              <th className="adminID">貼文者名稱</th>
              <th className="adminText">貼文內容</th>
              <th className="adminopeate">執行操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="adminTrheigh">
                <td className="adminID">{item.post_id}</td>
                <td
                  className="adminTitlecon"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <td className="adminID">{item.user_id}</td>
                <td className="adminID">{item.users.mem_name}</td>
                <td
                  className="adminTextcon"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                {/* <td>{item.content}</td> */}
                <td>
                  <button className="adminBtn">
                    <Link
                      className="adminlink"
                      to={`/admin/post_${item.post_id}/comments/1`}
                    >
                      文章評論
                    </Link>
                  </button>
                  <button
                    className="adminBtn"
                    onClick={() => DeleteClick(`${item.post_id}`)}
                  >
                    刪除貼文
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="sortBtn">
          <Link
            className="adminlink"
            to={`/admin/article/${parseInt(match.params.page) - 1}`}
          >
            上一頁
          </Link>
        </button>
        {Array.from({ length: lastpage }).map((_, index) => (
          <span key={index} className="sortdelterBtn">
            &nbsp;
            <Link
              className="adminlink"
              to={`/admin/article/${parseInt(index) + 1}`}
            >
              {index + 1}
            </Link>
            &nbsp;
          </span>
        ))}
        <button className="sortBtn">
          <Link
            className="adminlink"
            to={`/admin/article/${parseInt(match.params.page) + 1}`}
          >
            下一頁
          </Link>
        </button>
      </div>
    </div>
  );
}
export default ArticleAdmin;
