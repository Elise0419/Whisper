import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import thumb from "./Img/thumb.png";
import redArrow from "./Img/redArrow.png";
import comment from "./Img/comment.png";
import aroma from "./Img/aroma.png";
import dress from "./Img/dress.png";
import makeup from "./Img/makeup.png";
import cake from "./Img/cake.png";
import rose from "./Img/rose.png";
import rabbit from "./Img/rabbit.png";
import ice from "./Img/ice.png";

function Home() {
  const match = useRouteMatch();
  let [searchVal, setSearchVal] = useState("");
  let [searchMsg, setSearchMsg] = useState({});
  let [find, setFind] = useState(false);
  let [card, setCard] = useState([]);
  let [pop, setPop] = useState([]);
  let [like, setLike] = useState([]);

  // 搜尋
  function searchInput() {
    setSearchVal(document.getElementById("searchBar").value);
  }
  function searchButton() {
    if (searchVal == "") {
    } else {
      fetch(`http://127.0.0.1:8000/api/posts/search?query=${searchVal}`, {
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

  // 貼文渲染 & 主頁右側欄
  useEffect(() => {
    function fetchData() {
      fetch("http://127.0.0.1:8000/api/v1/posts", {
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

      fetch("http://127.0.0.1:8000/api/topPosts/1", {
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

      fetch("http://127.0.0.1:8000/api/topPosts/2", {
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
      </section>
      <article>
        <div className="search">
          <img src={rabbit} />
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
                    <img src={card.imgUrl} referrerPolicy="no-referrer" />
                  ) : (
                    <span>
                      <span className="paperTape">paperTapepaperTape</span>
                      <br />
                      {card.content}
                    </span>
                  )}
                </span>
                <span className="cardMid">
                  <img src={card.headImg} />
                  <span>{card.title}</span>
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
          <p>
            流行貼文排行榜&nbsp;
            <img src={ice} className="sideImg" />
          </p>
          {pop.map((pop) => {
            return (
              <Link to={`/post/${pop.postId}`} key={pop.postId}>
                <img className="rankImg" src={pop.headImg} />
                <span className="rankList">{pop.title}</span>
                <img className="rankArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
        <div className="aside">
          <p>點贊貼文排行榜</p>
          {like.map((like) => {
            return (
              <Link to={`/post/${like.postId}`} key={like.postId}>
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
