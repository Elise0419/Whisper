import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "./CSS/Postart.css";
import posttext from "./img/posttext.jpg";

function Postart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [editingPost, setEditingPost] = useState(null);

  const { userId } = useParams(); // 从URL参数获取用户ID

  const history = useHistory();

  let url;
  const handleEdit = (post) => {
    // 将编辑的帖子数据保存在 localStorage 中
    localStorage.setItem("editingPost", JSON.stringify(post));
    setEditingPost(post);
    // 跳转到上传页面
    history.push(`/upload/${post.type}`);
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
      <p>全部稿件:{postCount || 0}</p>
      </div>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          // 將 MySQL 的 HTML 轉成 Text
          const myContent = document.createElement("div");
          const myTitle = document.createElement("div");
          myContent.innerHTML = post.content;
          myTitle.innerHTML = post.title;

          // 檢查是否包含 base64 字串 且不得為 null 值
          // 是則渲染 img 否則渲染 Text
          const isStringValid = post.content && post.content.includes("base64");

          // HTML 篩選器 判斷是否含 img 標籤
          // 是則抓出第一張照片
          const parser = new DOMParser();
          const doc = parser.parseFromString(post.content, "text/html");
          const imgElements = doc.querySelectorAll("img");
          if (imgElements.length > 0) {
            const firstImgElement = imgElements[0];
            var url = firstImgElement.getAttribute("src");
          }

          return (
            <div className="manageEdit" key={post.postId}>
              <Link
                to={`/post/${post.postId}/${post.type}`}
                className="manageContent"
              >
                {/* <img src={url} /> */}
                {post.imgUrl && (
                  <img src={post.imgUrl} alt="" />
                )}
                {!post.imgUrl && isStringValid && (
                  <img src={url} alt="" />
                )}
                {!post.imgUrl && !isStringValid && (
                  <img src={posttext} alt="" />
                )}



                {/* <img src={post.url || posttext} alt="" /> */}
                <div className="manageText">
                  <p className="managePost">{myTitle.innerText}</p>
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
          );
        })
        ) : (
          <div>
            {userId ? (
              <div>無法獲取帖子數據</div>
            ) : (
              <div>請先登入</div>
            )}
          </div>
        )}
      </div>
    );
  }

export default Postart;
