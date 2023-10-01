import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "./CSS/Adminall.css";

function CommentAdmin() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({});
  const match = useRouteMatch();

  const token = localStorage.getItem("token");

  const Prepage = () => {
    setPage(page + 1);
  };
  const Nextpage = () => {
    setPage(page + 1);
  };

  const DeleteClick = (coment_id) => {
    if (window.confirm("確定要刪除此留言嗎")) {
      fetch(
        `http://127.0.0.1:8000/api/admin/management/articles/delete/comment_${coment_id}`,
        {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (res.status >= 400) {
            alert("刪除留言失敗，請重新操作");
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            alert("刪除留言成功");
            // window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/admin/management/comments/show/post_${match.params.postId}/${match.params.page}`,
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
        setData(res.comments.data);
        setPage(res.comments.last_page);
      })
      .catch((error) => {
        console.error("發生錯誤：", error);
      });
  }, []);

  return (
    <div className="adminbody">
      <div className="admincommentContainer">
        <div className="admincHeadline"> 文章資訊</div>
        <table className="adminTable">
          <thead>
            <tr className="adminTh">
              <th className="adminID">留言序號</th>
              <th className="adminID">留言者ID</th>
              <th className="adminID">留言者名稱</th>
              <th className="adminText">留言內容</th>
              <th className="adminopeate">執行操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="adminTrheigh">
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.users.mem_name}</td>
                <td>{item.comment}</td>
                <td>
                  <button
                    className="adminBtn"
                    onClick={() => DeleteClick(`${item.id}`)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          to={`/admin/post_:postId(\d+)/comments/${
            parseInt(match.params.page) - 1
          }`}
        >
          pre
        </Link>
        {Array.from({ length: page }).map((_, index) => (
          <span key={index}>
            &nbsp;
            <Link
              to={`/admin/post_:postId(\d+)/comments/${parseInt(index) + 1}`}
            >
              {index + 1}
            </Link>
            &nbsp;
          </span>
        ))}
        <Link
          to={`/admin/post_:postId(\d+)/comments/${
            parseInt(match.params.page) + 1
          }`}
        >
          next
        </Link>
      </div>
    </div>
  );
}
export default CommentAdmin;
