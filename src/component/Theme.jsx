import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Theme.css";
import Header from "./Block/Header.jsx";
import Footer from "./Block/Footer";

import thumb from "./Img/thumb.png";
import comment from "./Img/comment.png";
import user from "./Img/dog.jpeg";
import adArrow from "./Img/adArrow.png";
import redArrow from "./Img/redArrow.png";
import makeup2 from "./Img/makeup.jpeg";
import aroma from "./Img/aroma.png";
import dress from "./Img/dress.png";
import makeup from "./Img/makeup.png";
import cake from "./Img/cake.png";
import rose from "./Img/rose.png";
import bite from "./Img/bite.png";

function Makeup() {
  const match = useRouteMatch();
  let [ad, setAd] = useState([]);
  let [searchVal, setSearchVal] = useState("");
  let [searchMsg, setSearchMsg] = useState({});
  let [find, setFind] = useState(false);
  let [card, setCard] = useState([]);
  let [rule, setRule] = useState([]);
  let [tag, setTag] = useState([]);

  // 搜尋
  function searchInput() {
    setSearchVal(document.getElementById("searchBar").value);
  }
  function searchButton() {
    if (searchVal == "") {
    } else {
      fetch(
        `http://127.0.0.1:8000/api/posts/search?query=${searchVal}&type=${match.params.type}`,
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

  useEffect(() => {
    function fetchData() {
      fetch(`http://127.0.0.1:8000/api/v1/ads?type[eq]=${match.params.type}`, {
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

      fetch(
        `http://127.0.0.1:8000/api/v1/posts?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
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

      fetch(
        `http://127.0.0.1:8000/api/v1/rules?type[eq]=${match.params.type}`,
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

      fetch(`http://127.0.0.1:8000/api/tags/${match.params.type}`, {
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
    }
    fetchData();
  }, [match.params.type, searchMsg]);

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

  // 重置 search bar
  function deleteSearch() {
    setSearchMsg("");
    document.getElementById("searchBar").value = "";
  }

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

  return (
    <div id="container">
      <Header />
      <section>
        <div className="topic">
          <p>主題個版</p>
          <Link to="/mkup" onClick={deleteSearch}>
            <img className="topicImg" src={makeup} />
            <span className="topicList">
              美妝保養
              <br />
              <span>各種美妝技巧貼文</span>
            </span>
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/food" onClick={deleteSearch}>
            <img className="topicImg" src={cake} />
            <span className="topicList">
              美食情報
              <br />
              <span>好食物好味道</span>
            </span>
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/life" onClick={deleteSearch}>
            <img className="topicImg" src={aroma} />
            <span className="topicList">
              健康生活
              <br />
              <span>綠色出行綠色生活</span>
            </span>
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/fashion" onClick={deleteSearch}>
            <img className="topicImg" src={dress} />
            <span className="topicList">
              時尚穿搭
              <br />
              <span>fashion前言趨勢</span>
            </span>
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/love" onClick={deleteSearch}>
            <img className="topicImg" src={rose} />
            <span className="topicList">
              感情生活
              <br />
              <span>各種抱怨聚集地</span>
            </span>
            <img className="topicArrow" src={redArrow} />
          </Link>
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
        <div className="search">
          <img src={user} />
          <input
            id="searchBar"
            type="text"
            placeholder="熱門貼文搜尋"
            onChange={searchInput}
          />
          <button onClick={searchButton}>Search</button>
        </div>
        <div className="cardContainer">
          <div style={{ display: find ? "block" : "none" }} className="find">
            <p>{searchMsg.message}</p>
          </div>
          {Array.isArray(card) ? (
            card.map((card) => {
              return (
                // 增加一個onclick 點擊率事件
                <Link
                  className="card"
                  to={`/post/${card.postId}`}
                  key={card.postId}
                  onClick={() => cardClick(card.postId)}
                >
                  <span className="cardTop">
                    {typeof card.imgUrl === "string" ? (
                      <img
                        className="cardImg"
                        src={card.imgUrl}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="cardTxt">
                        <span className="paperTape">paperTapepaperTape</span>
                        <br />
                        {card.content}
                      </span>
                    )}
                  </span>
                  <span className="cardMid">
                    <img src={card.headImg} />
                    <span className="cardTitle">{card.title}</span>
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
            <Link
              className="card"
              to={`/post/${card.postId}`}
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
            <img src={bite} className="bite" />
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
