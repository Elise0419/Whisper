import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CSS/Collectart.css";

function Collectart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const { postId } = useParams();

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    fetch(`http://10.10.247.90:8000/api/posts/usersave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "没有蒐藏任何貼文") {
          setPosts([]);
          setPostCount(0);
        } else {
          setPosts(data.data);
          setPostCount(data.count);
        }
      })
      .catch((error) => {
        console.error("抓取資料時發生錯誤:", error);
      });
  };

  const handleDelete = (postId) => {
    const token = localStorage.getItem("token");
    fetch(`http://10.10.247.90:8000/api/saveposts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Response from server:", resJson);
        if (resJson.message === "deleted!") {
          fetchPosts();
          window.location.reload(); // 在删除成功后重新加载页面
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);
    fetchPosts();
  }, [postId]);

  return (
    <div className="collectart">
      <div className="manageCount">
        <p>全部稿件 {postCount}</p>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="manageEdit" key={post.postInfo.postId}>
            <Link className="manageContent" to={`/post/${post.postInfo.postId}/${post.postInfo.type}`}>
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
            </Link>
            <div className="manageBtn">
              <button
                className="deleteBtn"
                onClick={() => handleDelete(post.postInfo.postId)}
              >
                刪除
              </button>
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
