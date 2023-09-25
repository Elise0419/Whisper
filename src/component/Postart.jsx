import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "./CSS/Postart.css";

function Postart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [editingPost, setEditingPost] = useState(null);

  const { userId } = useParams(); // 从URL参数获取用户ID


  const history = useHistory();

  const handleEdit = (post) => {
    // 将编辑的帖子数据保存在 localStorage 中
    localStorage.setItem("editingPost", JSON.stringify(post));
    setEditingPost(post);
    // 跳转到上传页面
    history.push("/upload");
  };

  // 貼文編輯
  const handleUpdate = (postId, newData) => {
    const token = localStorage.getItem("token");

    fetch(`http://10.10.247.90:8000/api/posts/edit/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Response from server:", resJson);
        if (resJson.message === "Post updated successfully") {
          fetchPosts();
          setEditingPost(null);
        }
      })
      .catch((error) => console.error("Error:", error));
  };



  // 貼文刪除
  const handleDelete = (postId) => {
    const token = localStorage.getItem("token");

    fetch(`http://10.10.247.90:8000/api/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Response from server:", resJson);
        // 根据后端的返回结果，可以在这里进行相应的提示或更新页面等操作
        if (resJson.message === "deleted!") {
          // 在删除成功后重新获取数据
          fetchPosts();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    fetch(`http://10.10.247.90:8000/api/user/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Data from server:", resJson);
        if (resJson.message === "没有蒐藏任何貼文") {
          setPosts([]);
          setPostCount(0);
        } else {
          setPosts(resJson.posts);
          setPostCount(resJson.postCount);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);




  return (
    <div className="postart">
      <div className="manageCount">
        <p>全部稿件: {postCount}</p> {/* 显示用户已发布的帖子数量 */}
      </div>
      
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div className="manageEdit" key={post.postId}>
            {/* <div>{console.log("post", post)}</div> */}

            <Link to={`/post/${post.postId}/${post.type}`} className="manageContent"> {/* 到指定貼文 */}
              <img src={post.imgUrl} alt="" />
              <div className="manageText">
                <p className="managePost">{post.title}</p>
                <p className="manageTime">
                  作者:{post.memName}創作時間:{post.postTime}
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
              </Link>

            <div className="manageBtn">
              <button
                className="editBtn"
                onClick={() => handleEdit(post)}
                disabled={!!editingPost}
              >
                編輯
              </button>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(post.postId)}
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

export default Postart;
