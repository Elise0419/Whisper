import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";


function ConmentAdmin() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const match = useRouteMatch();

    const token = localStorage.getItem("token");

    const Prepage = () => {
        setPage(page + 1);
    };
    const Nextpage = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetch(`http://118.233.222.23:8000/api/admin/management/comments/show/post_${match.params.postId}/${page}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status >= 400) {
                    alert('你無權造訪此頁面')
                    throw new Error("API request failed");
                } else
                    return res.json();

            })
            .then((res) => {
                setData(res.comments.data);
            })
            .catch((error) => {
                console.error('發生錯誤：', error);
            });
    }, []);

    return (
        <div>
            <h1>文章資訊</h1>
            <table>
                <thead>
                    <tr>
                        <th>留言者ID</th>
                        <th>留言者名稱</th>
                        <th>貼文內容</th>
                        <th>執行操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr>
                            <td>{item.user_id}</td>
                            <td>{item.users.mem_name}</td>
                            <td>{item.comment}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span onClick={() => Prepage}>上一頁</span>
            <span onClick={() => Nextpage}>下一頁</span>
        </div>
    )
}
export default ConmentAdmin;