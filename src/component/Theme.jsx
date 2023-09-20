import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Theme.css";
import Header from "./Block/Header.jsx";
import Footer from "./Block/Footer";

import thumb from "./Img/thumb.png";
import comment from "./Img/comment.png";
import user from "./Img/dog.jpeg";
import adArrow from "./Img/adArrow.png";
import makeup2 from "./Img/makeup.jpeg";
import redArrow from "./Img/redArrow.png";
import lip from "./Img/lip.jpg";
import love from "./Img/love.jpg";
import dress from "./Img/dress.jpg";
import cake from "./Img/cake.jpg";
import yoga from "./Img/yoga.jpg";

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
        `http://10.10.247.43:8000/api/posts/search?query=${searchVal}&type=${match.params.type}`,
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
      fetch(
        `http://10.10.247.43:8000/api/v1/ads?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
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
        `http://10.10.247.43:8000/api/v1/posts?type[eq]=${match.params.type}`,
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
        `http://10.10.247.43:8000/api/v1/rules?type[eq]=${match.params.type}`,
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

      fetch(`http://10.10.247.43:8000/api/tags/${match.params.type}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          // setTag(jsonData);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.type, searchMsg]);

  // 點擊率
  const cardClick = async (postId) => {
    fetch(`http://10.10.247.43:8000/api/posts/click${postId}`, {
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

  function deleteSearch() {
    setSearchMsg("");
    document.getElementById("searchBar").value = "";
  }

  return (
    <div id="container">
      <Header />
      <section>
        <div className="topicTitle">
          <p>推薦的個人論壇</p>
          <Link to="/mkup" onClick={deleteSearch}>
            <img className="topicImg" src={lip} />
            <p className="topicList">美妝保養</p>
            {/* <p>各種美妝技巧貼文</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/food" onClick={deleteSearch}>
            <img className="topicImg" src={cake} />
            <p className="topicList">美食情報</p>
            {/* <p>好食物好味道</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/life" onClick={deleteSearch}>
            <img className="topicImg" src={yoga} />
            <p className="topicList">健康生活</p>
            {/* <p>綠色出行綠色生活</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/fashion" onClick={deleteSearch}>
            <img className="topicImg" src={dress} />
            <p className="topicList">時尚穿搭</p>
            {/* <p>fashion前言趨勢</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/love" onClick={deleteSearch}>
            <img className="topicImg" src={love} />
            <p className="topicList">感情生活</p>
            {/* <p>各種抱怨聚集地</p> */}
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
          {card.map((card) => {
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
          })}
        </div>
      </article>
      <aside>
        <div className="aside">
          <span className="voteTopic">
            <img src={makeup2} />
            <span>美妝保養</span>
          </span>
          <div className="vote">
            <span className="voteTitle">最好用的評價口紅!!!😍</span>
            <span>
              <div className="mydict">
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
            </span>
            <img src={makeup2} />
            <img src={makeup2} />
          </div>
        </div>
        <div className="forumRule">
          <p>個版規則</p>
          <ol>
            {rule.map((rule) => {
              return (
                <div key={rule.id}>
                  <li>{rule.content}</li>
                </div>
              );
            })}
          </ol>
        </div>
        <div className="forumTag">
          <span>
            <p>話題選擇器</p>
            {/* {tag.map((tag) => {
              return (
                <div key={tag.id}>
                  <li>{tag}</li>
                </div>
              );
            })} */}
            <button className="tagA">#修護</button>
            <button className="tagB">#美妝產品</button>
            <button className="tagC">#美容科技</button>
            <br />
            <button className="tagA">#修護</button>
            <button className="tagB">#美妝產品</button>
            <button className="tagC">#美容科技</button>
          </span>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Makeup;
