import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CSS/Postart.css";

function Postart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const { userId } = useParams(); // 从URL参数获取用户ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    // 发送 POST 请求获取用户发布的帖子列表和已发布的帖子数量
    fetch(`http://192.168.194.32:8000/api/user/posts`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "没有蒐藏任何貼文") {
        setPosts([]);
        setPostCount(0); // 设置帖子数量为 0
      } else {
        setPosts(data.data);
        setPostCount(data.count); // 设置帖子数量为返回的 count 值
      }
    })
    .catch(error => console.error('Error:', error));
  }, [userId]);

  return (
    <div className="postart">
      <div className="manageCount">
        <p>全部稿件: {postCount}</p> {/* 显示用户已发布的帖子数量 */}
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="manageEdit" key={post.postInfo.postId}>
            <div className="manageContent">
              <img src={post.postInfo.imgUrl} alt="" />
              <div className="manageText">
                <p className="managePost">{post.postInfo.title}</p>
                <p className="manageTime">
                  作者:{post.postInfo.memName}創作時間:{post.postInfo.postTime}
                </p>
                <div className="manageInteractions">
                  <span>
                    <i className="material-icons">thumb_up</i>
                    <span>{post.postInfo.thumb}</span>
                    <i className="material-icons">favorite</i>
                    <span>{post.postInfo.save}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="manageBtn">
              <button className="editBtn">編輯</button>
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

export default Postart;
