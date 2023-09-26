import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import thumb from "./img/thumb.png";
import redArrow from "./img/redArrow.png";
import comment from "./img/comment.png";
import aroma from "./img/aroma.png";
import dress from "./img/dress.png";
import makeup from "./img/makeup.png";
import cake from "./img/cake.png";
import rose from "./img/rose.png";
import rabbit from "./img/rabbit.png";
import ice from "./img/ice.png";

function Home() {
  const m = useRouteMatch().params.type;
  let [topic, setTopic] = useState([
    {
      img: makeup,
      list: "美妝保養",
      describe: "各種美妝技巧貼文",
      route: "/mkup",
    },
    { img: cake, list: "美食情報", describe: "好食物好味道", route: "/food" },
    {
      img: aroma,
      list: "健康生活",
      describe: "綠色出行綠色生活",
      route: "/life",
    },
    {
      img: dress,
      list: "時尚穿搭",
      describe: "fashion前言趨勢",
      route: "/fashion",
    },
    { img: rose, list: "感情生活", describe: "各種抱怨聚集地", route: "/love" },
  ]);
  let [searchVal, setSearchVal] = useState(""); // search bar input value
  let [searchMsg, setSearchMsg] = useState({}); // 宜珊的response;
  let [find, setFind] = useState(false); // 無搜尋結果
  let [card, setCard] = useState([]);
  let [pop, setPop] = useState([]);
  let [like, setLike] = useState([]);
  let [searchBarImg, setSearchBarImg] = useState([]);

  // 貼文渲染 & 主頁右側欄
  useEffect(() => {
    function fetchData() {
      // 所有貼文
      fetch("http://118.233.222.23:8000/api/v1/posts", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          if (searchMsg.message) {
            setFind(true);
            setCard([]);
          } else {
            setFind(false);
            setCard(
              searchMsg.data == undefined ? jsonData.data : searchMsg.data
            );
          }
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 流行貼文
      fetch("http://118.233.222.23:8000/api/topPosts/1", {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPop(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 點讚貼文
      fetch("http://118.233.222.23:8000/api/topPosts/2", {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setLike(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      const token = localStorage.getItem("token");
      console.log("Token in Profile:", token);

      fetch("http://118.233.222.23:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 403) {
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            return res.json();
          }
        })
        .then((jsonData) => {
          if (jsonData.error) {
            console.log("錯誤訊息:", jsonData.error);
          } else {
            setSearchBarImg({ ...jsonData.user, read: false });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [m, searchMsg]);

  // 搜尋
  function searchInput() {
    setSearchVal(document.getElementById("searchBar").value);
  }
  function searchButton() {
    if (searchVal == "") {
    } else {
      fetch(`http://118.233.222.23:8000/api/posts/search?query=${searchVal}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          if (jsonData.message == "Post not found!") {
            setSearchMsg({ message: `無法搜尋到 ${searchVal} 相關貼文` });
          } else {
            setSearchMsg(jsonData);
          }
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
  }

  // 重置 search bar
  function deleteSearch() {
    setSearchMsg("");
    document.getElementById("searchBar").value = "";
  }

  // 點擊率
  const cardClick = async (postId) => {
    fetch(`http://118.233.222.23:8000/api/posts/click${postId}`, {
      method: "POST",
      postId: `${postId}`,
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
  };

  let url;
  return (
    <div id="container">
      <Header />
      <section>
        <div className="topic">
          <p>主題個版</p>
          {topic.map((topic) => {
            return (
              <Link to="/mkup" onClick={deleteSearch}>
                <img className="topicImg" src={topic.img} />
                <span className="topicList">
                  {topic.list}
                  <br />
                  <span>{topic.describe}</span>
                </span>
                <img className="topicArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
      </section>
      <article>
        <div className="search">
          <img className="userHead" src={searchBarImg?.headimg || rabbit} />
          <input
            id="searchBar"
            type="text"
            placeholder="熱門貼文搜尋"
            onChange={searchInput}
          />
          <a className="searchBtn" onClick={searchButton}>
            Search
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div className="cardContainer">
          {/* 這邊是當 無搜尋結果 時 */}
          <div style={{ display: find ? "block" : "none" }} className="find">
            <p>{searchMsg.message}</p>
          </div>
          {Array.isArray(card) ? (
            card.map((card) => {
              // 將 MySQL 的 HTML 轉成 Text
              const myContent = document.createElement("div");
              const myTitle = document.createElement("div");
              myContent.innerHTML = card.content;
              myTitle.innerHTML = card.title;

              // 檢查是否包含 base64 字串 且不得為 null 值
              // 是則渲染 img 否則渲染 Text
              const isStringValid =
                card.content && card.content.includes("base64");

              // HTML 篩選器 判斷是否含 img 標籤
              // 是則抓出第一張照片
              const parser = new DOMParser();
              const doc = parser.parseFromString(card.content, "text/html");
              const imgElements = doc.querySelectorAll("img");
              if (imgElements.length > 0) {
                const firstImgElement = imgElements[0];
                url = firstImgElement.getAttribute("src");
              }

              return (
                <Link
                  className="card"
                  to={`/post/${card.postId}/${card.type}`}
                  key={card.postId}
                  onClick={() => cardClick(card.postId)}
                >
                  <span className="cardTop">
                    {card.imgUrl || isStringValid ? (
                      <div>
                        {card.imgUrl ? (
                          // 這邊是資料庫 imgUrl 預設貼文的照片處理
                          <img
                            src={card.imgUrl}
                            key={`${card.postId}`}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          // 這邊是用戶上傳的照片處理
                          <img className="multipleImg" src={url} />
                        )}
                      </div>
                    ) : (
                      <span className="cardTxt">
                        <span className="paperTape">paperTapepaperTape</span>
                        <br />
                        {myContent.textContent}
                      </span>
                    )}
                  </span>
                  <span className="cardMid">
                    <img src={card.headImg} alt={`Image ${card.postId}`} />
                    <span>{myTitle.textContent}</span>
                  </span>
                  <span className="cardBtm">
                    <span>#{card.tag}</span>
                    <span>
                      <img src={comment} />
                      {card.comtxtCount}
                      <img src={thumb} />
                      {card.thumb}
                    </span>
                  </span>
                </Link>
              );
            })
          ) : (
            // 這邊是單篇 card 處理
            <Link
              className="card"
              to={`/post/${card.postId}/${card.type}`}
              key={card.postId}
              onClick={() => cardClick(card.postId)}
            >
              <span className="cardTop">
                {typeof card.data[0].imgUrl === "string" ? (
                  <img
                    className="cardImg"
                    src={card.data[0].imgUrl}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="cardTxt">
                    <span className="paperTape">paperTapepaperTape</span>
                    <br />
                    {card.data[0].content}
                  </span>
                )}
              </span>
              <span className="cardMid">
                <img src={card.data[0].headImg} />
                <span className="cardTitle">{card.data[0].title}</span>
              </span>
              <span className="cardBtm">
                <span>#{card.data[0].tag}</span>
                <span>
                  <img src={comment} />
                  {card.comtxtCount}
                  <img src={thumb} />
                  {card.data[0].thumb}
                </span>
              </span>
            </Link>
          )}
        </div>
      </article>
      <aside>
        <div className="aside">
          <p>
            流行貼文排行榜&nbsp;
            <img src={ice} className="sideImg" />
          </p>
          {pop.map((pop) => {
            return (
              <Link to={`/post/${pop.postId}/${pop.type}`} key={pop.postId}>
                <img className="rankImg" src={pop.headImg} />
                <span className="rankList">{pop.title}</span>
                <img className="rankArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
        <div className="aside">
          <p>點讚貼文排行榜</p>
          {like.map((like) => {
            return (
              <Link to={`/post/${like.postId}/${like.type}`} key={like.postId}>
                <img className="rankImg" src={like.headImg} />
                <span className="rankList">{like.title}</span>
                <img className="rankArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Home;
