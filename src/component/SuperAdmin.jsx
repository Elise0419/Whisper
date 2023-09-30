import { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";

function SuperAdmin() {
  const [data, setData] = useState([]);
  const [lastpage, setLastpage] = useState({});
  const { page } = useParams();
  const match = useRouteMatch();

  const token = localStorage.getItem("token");


  const DeleteClick = (coment_id) => {
    if (window.confirm('確定要刪除此留言嗎')) {
      fetch(`http://118.233.222.23:8000/api/admin/management/articles/delete/comment_${coment_id}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status >= 400) {
            alert('刪除留言失敗，請重新操作');
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            alert('刪除留言成功');
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
      `http://118.233.222.23:8000/api/admin/management/users/show/${match.params.page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          alert("你無權造訪此頁面");
          throw new Error("API request failed");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.users.data)
        setData(res.users.data);
        setLastpage(res.users.last_page)
        console.log(res)
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
            <th>使用者ID</th>
            <th>使用者名稱</th>
            <th>信箱</th>
            <th>建立時間</th>
            <th>更新時間</th>
            <th>登入時間</th>
            <th>登出時間</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.user_id}</td>
              <td>{item.mem_name}</td>
              <td>{item.email}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
              <td>{new Date(item.login_time).toLocaleString()}</td>
              <td>{new Date(item.logout_time).toLocaleString()}</td>
              <td>
                <button onClick={() => DeleteClick(`${item.id}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/admin/users/manage/${parseInt(match.params.page) - 1}`}>
        pre
      </Link>
      {Array.from({ length: lastpage }).map((_, index) => (
        <span key={index}>
          &nbsp;
          <Link to={`/admin/users/manage/${parseInt(index) + 1}`}>
            {index + 1}
          </Link>
          &nbsp;
        </span>
      ))}
      <Link to={`/admin/users/manage/${parseInt(match.params.page) + 1}`}>
        next
      </Link>
    </div>
  );

};



export default SuperAdmin;
