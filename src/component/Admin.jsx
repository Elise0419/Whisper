import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Admin() {
    const [data, setData] = useState([]);


    useEffect(() => {

        fetch(`https://10.10.247.90:8000/api/admin/management/article/show/1`)
            .then((res) => {
                if (res.status >= 400) {
                    alert('你無權造訪此頁面')
                } else if (res.status >= 200) {
                    return res.json();
                }
            })
            .then((data) => {
                setData(data.post);
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
                        <th>貼文者</th>
                        <th>貼文標題</th>
                        <th>貼文內容</th>
                        <th>執行操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.post_id}>
                            <td>{item.title}</td>
                            <td>{item.name}</td>
                            <td>{item.content}</td>
                            <td>
                                <Link to={`/post_${item.post_id}/comments`}>文章評論</Link>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Admin;