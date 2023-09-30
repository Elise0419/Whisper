import { useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";

function SuperAdmin() {
  const [data, setData] = useState([]);
  const [lastpage, setLastpage] = useState({});
  const { page } = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const [sortField, setSortField] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selected, setSelected] = useState({});

  const token = localStorage.getItem("token");

  const SelectChange = (event, user_id) => {
    const selectedOption = event.target.value;
    setSelected({ 'type': selectedOption, 'user_id': user_id });
  };

  const promotion = () => {
    console.log(selected)
    if (selected.type !== 'none')
      if (window.confirm('確定執行提升管理員')) {
        fetch(`http://118.233.222.23:8000/api/superadmin/management/users/promotion`, {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: selected.user_id,
            type: selected.type,
          })
        })
          .then((res) => {
            if (res.status >= 400) {
              res.json(data).then((data) => {
                console.log(data.error)
              })
              throw new Error("API request failed");
            } else if (res.status >= 200) {
              alert('增加管理員成功');
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }
  }

  const DeleteClick = (user_id) => {
    if (window.confirm('確定要移除此管理員')) {
      fetch(`http://118.233.222.23:8000/api/superadmin/management/user_${user_id}/downgrade`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status >= 400) {
            alert('請重新操作');
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            alert('已成功移除管理員身分');
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  const toggleSorting = (field) => {
    if (field === sortField) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const sorting = `${sortField}:${sortOrder}`;
    fetchData(sorting);
  }, [page, sortField, sortOrder]);

  const fetchData = (sorting) => {
    fetch(
      `http://118.233.222.23:8000/api/admin/management/users/show/${match.params.page}?sorting=${sorting}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          alert("你無權造訪此頁面");
          history.push("/home/1");
          throw new Error("API request failed");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.users.data);
        setData(res.users.data);
        setLastpage(res.users.last_page);
        console.log(res);
      })
      .catch((error) => {
        console.error("發生錯誤：", error);
      });
  };

  return (
    <div>
      <h1>使用者管理介面</h1>
      <table>
        <thead>
          <tr>
            <th>使用者ID</th>
            <th>使用者名稱</th>
            <th>信箱</th>
            <th>
              建立時間
              <button onClick={() => toggleSorting("created_at")}>
                {sortField === "created_at" ? (sortOrder === "asc" ? "▲" : "▼") : "無排序"}
              </button>
            </th>
            <th>更新時間
              <button onClick={() => toggleSorting("updated_at")}>
                {sortField === "updated_at" ? (sortOrder === "asc" ? "▲" : "▼") : "無排序"}
              </button>
            </th>
            <th>
              登入時間
              <button onClick={() => toggleSorting("login_time")}>
                {sortField === "login_time" ? (sortOrder === "asc" ? "▲" : "▼") : "無排序"}
              </button>
            </th>
            <th>登出時間
              <button onClick={() => toggleSorting("logout_time")}>
                {sortField === "logout_time" ? (sortOrder === "asc" ? "▲" : "▼") : "無排序"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.user_id}</td>
              <td>{item.mem_name}</td>
              <td>{item.email}</td>
              <td>
                {new Date(item.created_at).toLocaleString()}
              </td>
              <td>
                {new Date(item.updated_at).toLocaleString()}
              </td>
              <td>
                {new Date(item.login_time).toLocaleString()}
              </td>
              <td>
                {new Date(item.logout_time).toLocaleString()}
              </td>
              <td>
                {item.admin.length > 0 ? ('admin') : ('user')}
              </td>
              <td>
                {item.admin.length > 0 ? (<button onClick={() => DeleteClick(`${item.user_id}`)}>
                  移除管理員
                </button>) : (<button onClick={promotion}>
                  提升管理員
                </button>)}
              </td>
              <td>
                {item.admin.length > 0 ? (
                  <select name="" id="" defaultValue={item.admin[0].type} onChange={(event) => SelectChange(event, item.user_id)}>
                    <option value="none">無</option>
                    <option value="life">健康生活</option>
                    <option value="love">感情生活</option>
                    <option value="food">美食情報</option>
                    <option value="fashion">時尚穿搭</option>
                    <option value="mkup">美妝保養</option>
                  </select>
                ) : (
                  <select name="" id="" onChange={(event) => SelectChange(event, item.user_id)}>
                    <option value="none">無</option>
                    <option value="life">健康生活</option>
                    <option value="love">感情生活</option>
                    <option value="food">美食情報</option>
                    <option value="fashion">時尚穿搭</option>
                    <option value="mkup">美妝保養</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/admin/users/manage/${parseInt(match.params.page) - 1}`}>
        pre
      </Link>
      {
        Array.from({ length: lastpage }).map((_, index) => (
          <span key={index}>
            &nbsp;
            <Link to={`/admin/users/manage/${parseInt(index) + 1}`}>
              {index + 1}
            </Link>
            &nbsp;
          </span>
        ))
      }
      <Link to={`/admin/users/manage/${parseInt(match.params.page) + 1}`}>
        next
      </Link>
    </div >
  );

};



export default SuperAdmin;
