import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./CSS/Collectart.css";

function Collectart() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0); // 添加 postCount 状态

  const { postId } = useParams();

  // 刪除貼文
  function handleDelete(postId) {
    const token = localStorage.getItem("token");
    fetch(`http://118.233.222.23:8000/api/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "deleted!") {
          // 删除成功
          console.log("删除成功！");

          // 在删除成功后重新获取数据
          fetch(`http://118.233.222.23:8000/api/posts/usersave`, {
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
        } else {
          console.error("删除失败:", data.message);
        }
      })
      .catch((error) => {
        console.error("删除时发生错误:", error);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    // 目前收藏的貼文
    fetch(`http://118.233.222.23:8000/api/posts/usersave`, {
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
          setPostCount(0); // 设置帖子数量为 0
        } else {
          setPosts(data.data);
          setPostCount(data.count); // 设置帖子数量为返回的 count 值
        }
      })
      .catch((error) => {
        console.error("抓取資料時發生錯誤:", error);
      });
  }, [postId]);

  return (
    <div className="collectart">
      <div className="manageCount">
        <p>全部稿件 {postCount}</p>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="manageEdit" key={post.postInfo.postId}>
            {/* <div>{console.log("post", post)}</div> */}
            <Link className="manageContent" to={`/post/${post.postInfo.postId}/${post.postInfo.type}` }>
              {/* <div className="manageContent"> */}
                <img src={post.postInfo.imgUrl} alt="" />
                <div className="manageText">
                  <p className="managePost">{post.postInfo.title}</p>
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
              {/* </div> */}
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
