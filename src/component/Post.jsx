import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./CSS/Post.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Comment from "./Block/Comment";

import makeup2 from "./img/makeup.jpeg";
import bite from "./img/bite.png";
import makeup from "./img/makeup.png";

function Post({ postId, userToken }) {
  const match = useRouteMatch();
  let [post, setPost] = useState([]);
  let [vote, setVote] = useState([]);
  let [oneWidth, setOneWidth] = useState(50);
  let [twoWidth, setTwoWidth] = useState(50);
  const [disabled, setDisabled] = useState(false);
  let [rule, setRule] = useState([]);
  // 初始狀態未點讚 未收藏狀態
  let [isLiked, setIsLiked] = useState(false);
  let [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    function fetchData() {
      // 取單篇文章
      fetch(
        `http://10.10.247.90:8000/api/v1/posts/${match.params.postId}/${match.params.type}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData.data);
          setPost([jsonData.data]);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 投票
      fetch(`http://10.10.247.90:8000/api/votes/${match.params.type}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          setVote(jsonData.data[0]);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 個版規則
      fetch(
        `http://10.10.247.90:8000/api/v1/rules?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
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

  // 投票區域處理
  useEffect(() => {
    if (vote.voteId) {
      let record = localStorage.getItem(`vote${vote.voteId}`);
      record = JSON.parse(record);
      console.log(record);
      if (record != null) {
        setOneWidth(record.one);
        setTwoWidth(record.two);
        setDisabled(true);
        document.getElementById(record.ans).checked = true;
      } else {
        document.getElementById("ansOne").checked = false;
        document.getElementById("ansTwo").checked = false;
        setOneWidth(50);
        setTwoWidth(50);
        setDisabled(false);
      }
    }
  }, [vote]);

  const toggleLike = () => {
    if (post.length > 0) {
      const newThumbCount = isLiked ? post[0].thumb - 1 : post[0].thumb + 1;
      const postId = post[0].postId;
      const requestData = {
        postId: postId,
        thumb: !isLiked,
      };
      console.log("userToken" + userToken);
      fetch(
        `http://10.10.247.90:8000/api/posts/thumb${match.params.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(requestData),
        }
      )
        .then((res) => res.json())
        .then((jsonData) => {
          if (jsonData.message === "updated!") {
            setIsLiked(!isLiked);
            setPost((prevPost) => [{ ...prevPost[0], thumb: newThumbCount }]);
          }
        })
        .catch((err) => {
          console.log("點讚請求錯誤:", err);
        });
    }
  };

  const toggleFavorite = function () {
    const userToken = localStorage.getItem("token");
    if (post.length > 0) {
      setIsFavorited(!isFavorited);
      const newSaveCount = isFavorited ? post[0].save - 1 : post[0].save + 1;
      fetch(
        `http://10.10.247.90:8000/api/posts/save/${match.params.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ save: newSaveCount }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((jsonData) => {
          console.log("jsonData", jsonData);
          if (
            jsonData.message === "貼文已收藏" ||
            jsonData.message === "貼文已經被收藏過"
          ) {
            setPost((prevPost) => [{ ...prevPost[0], save: newSaveCount }]);
          }
        })
        .catch((err) => {
          console.error("收藏请求错误:", err);
        });
    }
  };

  // vote
  function widthChange(e) {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    fetch(
      `http://10.10.247.90:8000/api/votes/click/${vote.voteId}?${e.target.id}=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        if ((jsonData.message = "投票成功！")) {
          setOneWidth(vote.ansOnePoint);
          setTwoWidth(vote.ansTwoPoint);
          setDisabled(true);

          let voteData = {
            id: vote.voteId,
            ans: e.target.id,
            one: vote.ansOnePoint,
            two: vote.ansTwoPoint,
          };
          voteData = JSON.stringify(voteData);
          localStorage.setItem(`vote${vote.voteId}`, voteData);
        }
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
                      // 這邊是用戶上傳的照片處理
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
                  {/* 收藏按鈕 */}
                  <button
                    onClick={toggleFavorite}
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
              &nbsp;&nbsp;{vote.forumTitle}
            </p>
          </span>
          <div className="vote">
            <span className="voteTitle">{vote.title}</span>
            <div className="choice">
              <div>
                <label style={{ width: oneWidth + "%" }}>
                  <input
                    type="radio"
                    name="radio"
                    id="ansOne"
                    onClick={widthChange}
                    disabled={disabled}
                  />
                  <span>{vote.ansOne}</span>
                </label>
                <label style={{ width: twoWidth + "%" }}>
                  <input
                    type="radio"
                    name="radio"
                    id="ansTwo"
                    onClick={widthChange}
                    disabled={disabled}
                  />
                  <span>{vote.ansTwo}</span>
                </label>
              </div>
            </div>
            <img src={vote.imgOne} />
            <img src={vote.imgTwo} />
          </div>
        </div>
        <div className="aside">
          <p>
            話題選擇器&nbsp;&nbsp;
            <img src={bite} className="sideImg" />
          </p>
          <span className="tag">
            {post.map((post) => {
              return <button key={post.tag_id}>#{post.tag}</button>;
            })}
          </span>
        </div>
        <div className="aside">
          <p>個版規則</p>
          <ol className="rule">
            {rule.map((rule) => {
              return (
                <div key={rule.id}>
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
