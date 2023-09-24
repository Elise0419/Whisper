import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 引入 useParams
import "./CSS/Collectart.css";

function Collectart() {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams(); // 使用 useParams 获取 postId

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    // 使用 fetch 請求後端 API 獲取數據
    fetch(`http://192.168.194.32:8000/api/posts/usersave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // 將後端返回的數據設置到狀態中
      })
      .catch((error) => {
        console.error("抓取資料時發生錯誤:", error);
      });
  }, [postId]); 
 // 注意，這裡的依賴列表是空的，表示它只在組件首次渲染時執行

  return (
    <div className="collectart">
      {Array.isArray(posts) ? (
        posts.map((post) => (
          <div className="manageEdit" key={post.postId}>
            <div className="manageContent">
              <img src={post.imgUrl} alt="" />
              <div className="manageText">
                <p className="managePost">{post.title}</p>
                <p className="manageTime">
                  {post.memName}.發布者.{post.postTime}
                </p>

                <div className="manageInteractions">
                  <span>
                    <i className="material-icons">thumb_up</i>
                    <span>{post.thumb}</span>
                    <i className="material-icons">favorite</i>
                    <span>{post.save}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="manageBtn">
              <button className="deleteBtn">刪除</button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div>無法獲取帖子數據</div>
      )}
    </div>
  );
}

export default Collectart;
