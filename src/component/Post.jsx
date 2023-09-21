import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./CSS/Post.css";
import Comment from "./Block/Comment";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import makeup2 from "./img/makeup.jpeg";
import bite from "./img/bite.png";
import makeup from "./img/makeup.png";

function Post({ userToken = null }) {
  const match = useRouteMatch();
  let [post, setPost] = useState([]);
  let [rule, setRule] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch(`http://127.0.0.1:8000/api/v1/posts/${match.params.postId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((jsonData) => {
          setPost([jsonData.data]);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      fetch(`http://127.0.0.1:8000/api/v1/rules?type[eq]=fashion`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setRule(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.postId]);

  let [isLiked, setIsLiked] = useState(false);
  let [isFavorited, setIsFavorited] = useState(false);

  const toggleLike = () => {
    console.log(post);
    if (post.length > 0) {
      const newThumbCount = isLiked ? post[0].thumb - 1 : post[0].thumb + 1;
      const requestData = {
        postId: post[0].postId,
        thumb: !isLiked,
      };

      fetch(`http://127.0.0.1:8000/api/posts/thumb${match.params.postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((jsonData) => {
          if (jsonData.message === "updated!") {
            setIsLiked(!isLiked); // 更新点赞状态
            setPost((prevPost) => [{ ...prevPost[0], thumb: newThumbCount }]);
          }
        })
        .catch((err) => {
          console.log("点赞请求错误:", err);
        });
    }
  };

  const toggleFavorite = () => {
    if (post.length > 0) {
      setIsFavorited(!isFavorited);
      const newSaveCount = isFavorited ? post[0].save - 1 : post[0].save + 1;

      fetch(`http://127.0.0.1:8000/api/posts/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ save: newSaveCount }),
      })
        .then((res) => res.json())
        .then((jsonData) => {
          if (jsonData.data) {
            setPost((prevPost) => [
              { ...prevPost[0], save: jsonData.data.save },
            ]);
          }
        })
        .catch((err) => {
          console.log("收藏请求错误:", err);
        });
    }
  };

  function hashtag(t) {
    fetch(`http://127.0.0.1:8000/api/v1/posts?tag[eq]=${t}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  }

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        {post.map((post) => {
          const myContent = document.createElement("div");
          const myTitle = document.createElement("div");
          myContent.innerHTML = post.content;
          myTitle.innerHTML = post.title;

          const parser = new DOMParser();
          const doc = parser.parseFromString(post.content, "text/html");
          const imgElements = doc.querySelectorAll("img");
          const urls = Array.from(imgElements).map((img) =>
            img.getAttribute("src")
          );

          return (
            <div className="postContainer" key={post.postId}>
              <div className="postUseinfo">
                <div className="postUsepic">
                  <img className="userHead" src={post.headImg} />
                </div>
                <div className="postUsertime">
                  <span>
                    {post.memName} {post.postTime}
                  </span>
                </div>
              </div>
              <div className="postAll">
                <div className="postArticle">
                  <div className="postArticletitle">
                    <h2>{myTitle.textContent}</h2>
                  </div>
                  <div className="postArticletext">
                    <p>{myContent.textContent}</p>
                    {post.imgUrl ? (
                      // 這邊是資料庫 imgUrl 預設貼文的照片處理
                      <img
                        src={post.imgUrl}
                        key={`${post.postId}`}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      urls.map((url, index) => (
                        <div key={index}>
                          {console.log(url)}
                          <img src={url} alt={`Image ${index}`} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <hr />
                <div className="postInteractive">
                  <button
                    onClick={toggleLike}
                    className={`postCustbutton ${isLiked ? "active" : ""}`}
                  >
                    <i className="material-icons">thumb_up</i>
                  </button>
                  <span>{post.thumb}</span>
                  <button
                    onClick={toggleFavorite} // 确保这里调用了 toggleFavorite 函数
                    className={`postCustbutton ${isFavorited ? "active" : ""}`}
                  >
                    <i className="material-icons">favorite</i>
                  </button>
                  <span>{post.save}</span>
                </div>
                <div className="postComment">
                  <Comment />
                </div>
              </div>
            </div>
          );
        })}
      </article>
      <aside>
        <div className="aside">
          <span className="voteTopic">
            <p>
              <img src={makeup} />
              &nbsp;&nbsp;美妝保養
            </p>
          </span>
          <div className="vote">
            <span className="voteTitle">最好用的評價口紅!!!😍</span>
            <div className="choice">
              <div>
                <label>
                  <input type="radio" name="radio" />
                  <span>heme</span>
                </label>
                <label>
                  <input type="radio" name="radio" />
                  <span>Romand</span>
                </label>
              </div>
            </div>
            <img src={makeup2} />
            <img src={makeup2} />
          </div>
        </div>
        <div className="aside">
          <p>
            話題選擇器&nbsp;&nbsp;
            <img src={bite} className="sideImg" />
          </p>
          <span className="tag">
            {post.map((post) => {
              return (
                <button onClick={() => hashtag(post.tag)} key={post.tag_id}>
                  #{post.tag}
                </button>
              );
            })}
          </span>
        </div>
        <div className="aside">
          <p>個版規則</p>
          <ol className="rule">
            {rule.map((rule) => {
              return (
                <div key={rule.id}>
                  {console.log(rule)}
                  <li>{rule.content}</li>
                </div>
              );
            })}
          </ol>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Post;
