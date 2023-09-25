import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Admin() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const token = localStorage.getItem("token");

    const Prepage = () => {
        setPage(page + 1);
    };
    const Nextpage = () => {
        setPage(page + 1);
    };

    const DeleteClick = (post_id) => {
        console.log(post_id);
        if (window.confirm('確定要刪除此貼文嗎')) {
            fetch(`admin/management/articles/delete/post_${post_id}`, {
                method: "Delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status >= 400) {
                        alert('刪除貼文失敗，請重新操作');
                        throw new Error("API request failed");
                    } else if (res.status >= 200) {
                        alert('刪除貼文成功')
                    }
                })
                .catch((err) => {
                    // console.log("Error:", err);
                    alert(err)
                });
        }
    };

    useEffect(() => {
        fetch(`http://10.10.247.90:8000/api/admin/management/articles/show/${page}`, {
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
                setData(res.articles.data);
                console.log(res.articles.data)
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
                        <th>文章ID</th>
                        <th>貼文標題</th>
                        <th>貼文者ID</th>
                        <th>貼文者名稱</th>
                        <th>貼文內容</th>
                        <th>執行操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.post_id}>
                            <td>{item.post_id}</td>
                            <td>{item.title}</td>
                            <td>{item.user_id}</td>
                            <td>{item.users.mem_name}</td>
                            <td>{item.content}</td>
                            <td>
                                <Link to={`/admin/post_${item.post_id}/comments`}>文章評論</Link>
                                <button onClick={() => DeleteClick(`${item.post_id}`)}>Delete</button>
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
export default Admin;