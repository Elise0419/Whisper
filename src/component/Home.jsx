import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./CSS/Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import lip from "./Img/lip.jpg";
import love from "./Img/love.jpg";
import dress from "./Img/dress.jpg";
import cake from "./Img/cake.jpg";
import yoga from "./Img/yoga.jpg";
import user from "./Img/dog.jpeg";
import thumb from "./Img/thumb.png";
import redArrow from "./Img/redArrow.png";
import comment from "./Img/comment.png";

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
      fetch(`http://10.10.247.43:8000/api/posts/search?query=${searchVal}`, {
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
      fetch("http://10.10.247.43:8000/api/v1/posts", {
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

      fetch("http://10.10.247.43:8000/api/topPosts/1", {
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

      fetch("http://10.10.247.43:8000/api/topPosts/2", {
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
          <p>流行貼文排行榜</p>
          {pop.map((pop) => {
            return (
              <Link to={`/post/${pop.postId}`} key={pop.postId}>
                <img className="rankNum" src={pop.headImg} />
                <p className="rankList">{pop.title}</p>
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
                <img className="rankNum" src={like.headImg} />
                <p className="rankList">{like.title}</p>
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
