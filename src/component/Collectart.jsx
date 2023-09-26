import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CSS/Collectart.css";
import posttext from "./img/posttext.jpg";

function Collectart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const { postId } = useParams();

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    fetch(`http://118.233.222.23:8000/api/posts/usersave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

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
    fetch(`http://118.233.222.23:8000/api/saveposts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Response from server:", resJson);
        if (resJson.message === "Deleted!") {
          fetchPosts();
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
        posts.map((post) => {
          // 將 MySQL 的 HTML 轉成 Text
          const myContent = document.createElement("div");
          const myTitle = document.createElement("div");
          myContent.innerHTML = post.postInfo.content;
          myTitle.innerHTML = post.postInfo.title;

          // 檢查是否包含 base64 字串 且不得為 null 值
          // 是則渲染 img 否則渲染 Text
          const isStringValid =
            post.postInfo.content && post.postInfo.content.includes("base64");
          // HTML 篩選器 判斷是否含 img 標籤
          // 是則抓出第一張照片
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            post.postInfo.content,
            "text/html"
          );

          const imgElements = doc.querySelectorAll("img");
          if (imgElements.length > 0) {
            const firstImgElement = imgElements[0];
            var url = firstImgElement.getAttribute("src");
          }

          return (
            <div className="manageEdit" key={post.postInfo.postId}>
              <Link
                className="manageContent"
                to={`/post/${post.postInfo.postId}/${post.postInfo.type}`}
              >
                {/* 根据优先级显示图片 */}
                {post.postInfo.imgUrl && (
                  <img src={post.postInfo.imgUrl} alt="" />
                )}
                {!post.postInfo.imgUrl && isStringValid && (
                  <img src={url} alt="" />
                )}
                {!post.postInfo.imgUrl && !isStringValid && (
                  <img src={posttext} alt="" />
                )}

                <div className="manageText">
                  <p className="managePost">{myTitle.innerText}</p>
                  <p className="manageTime">
                    作者:{post.postInfo.memName}創作時間:
                    {post.postInfo.postTime}
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
          );
        })
      ) : (
        <div>無法獲取帖子數據</div>
      )}
    </div>
  );
}

export default Collectart;
