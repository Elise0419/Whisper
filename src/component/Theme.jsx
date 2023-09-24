import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Theme.css";
import Header from "./Block/Header.jsx";
import Footer from "./Block/Footer";

import thumb from "./img/thumb.png";
import comment from "./img/comment.png";
import user from "./img/dog.jpeg";
import adArrow from "./img/adArrow.png";
import redArrow from "./img/redArrow.png";
import makeup2 from "./img/makeup.jpeg";
import aroma from "./img/aroma.png";
import dress from "./img/dress.png";
import makeup from "./img/makeup.png";
import cake from "./img/cake.png";
import rose from "./img/rose.png";
import bite from "./img/bite.png";

function Makeup() {
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
  let [ad, setAd] = useState([]);
  let [searchVal, setSearchVal] = useState(""); // search bar input value
  let [searchMsg, setSearchMsg] = useState({}); // 宜珊的response;
  let [find, setFind] = useState(false); // 無搜尋結果
  let [card, setCard] = useState([]);
  let [vote, setVote] = useState([]);
  let [oneWidth, setOneWidth] = useState(50);
  let [twoWidth, setTwoWidth] = useState(50);
  const [disabled, setDisabled] = useState(false);
  let [tag, setTag] = useState([]);
  let [rule, setRule] = useState([]);

  // 貼文渲染 & 主頁右側欄
  useEffect(() => {
    function fetchData() {
      // 廣告
      fetch(`http://127.0.0.1:8000/api/v1/ads?type[eq]=${m}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setAd(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 個版
      fetch(`http://127.0.0.1:8000/api/v1/posts?type[eq]=${m}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          // 沒有搜尋紀錄
          if (searchMsg.message) {
            setFind(true);
            setCard([]);
          } else {
            // 有搜尋紀錄
            setFind(false);
            setCard(
              searchMsg.data == undefined ? jsonData.data : searchMsg.data
            );
          }
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 投票
      fetch(`http://127.0.0.1:8000/api/votes/${m}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          // 只要切換個版 就重新渲染
          setVote(jsonData.data[0]);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 標籤
      fetch(`http://127.0.0.1:8000/api/tags/${m}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setTag(jsonData.tags);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 規則
      fetch(`http://127.0.0.1:8000/api/v1/rules?type[eq]=${m}`, {
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
  }, [m, searchMsg]);

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

  // 搜尋
  function searchInput() {
    setSearchVal(document.getElementById("searchBar").value);
  }
  function searchButton() {
    if (searchVal == "") {
    } else {
      fetch(
        `http://127.0.0.1:8000/api/posts/search?query=${searchVal}&type=${m}`,
        {
          method: "GET",
        }
      )
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
    setSearchVal("");
  }

  // 重置 search bar
  function deleteSearch() {
    setSearchMsg("");
    document.getElementById("searchBar").value = "";
  }

  // 點擊率
  const cardClick = async (postId) => {
    fetch(`http://127.0.0.1:8000/api/posts/click${postId}`, {
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

  // vote
  function widthChange(e) {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    fetch(
      `http://127.0.0.1:8000/api/votes/click/${vote.voteId}?${e.target.id}=true`,
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

  // 點擊標籤
  function hashtag(t) {
    document.getElementById("searchBar").value = "";
    fetch(`http://127.0.0.1:8000/api/v1/posts?tag[eq]=${t}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setCard(jsonData);
        setFind(false);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  }

  let url;
  return (
    <div id="container">
      <Header />
      <section>
        <div className="topic">
          <p>主題個版</p>
          {topic.map((topic) => {
            return (
              <Link to={topic.route} onClick={deleteSearch}>
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
        <div className="ad">
          {ad.map((ad) => {
            return (
              <a key={ad.id} href={ad.webUrl}>
                <img
                  className="adPic"
                  src={ad.imgUrl}
                  referrerPolicy="no-referrer"
                />
                <p className="adLook">
                  查看更多
                  <img src={adArrow} />
                </p>
              </a>
            );
          })}
        </div>
      </section>
      <article>
        {/* Search Bar */}
        <div className="search">
          <img src={user} />
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
                      {card.save}
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
                  {card.data[0].save}
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
          <span className="voteTopic">
            <p>
              <img src={makeup} />
              &nbsp;&nbsp;{vote.type}
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
            {tag.map((tag) => {
              return (
                <button onClick={() => hashtag(tag.tag)} key={tag.tag_id}>
                  #{tag.tag}
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

export default Makeup;
