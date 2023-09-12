import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Article from "./Block/Article";

import user from "./Img/dog.jpeg";
import redArrow from "./Img/redArrow.png";
import lip from "./Img/lip.jpg";
import love from "./Img/love.jpg";
import dress from "./Img/dress.jpg";
import cake from "./Img/cake.jpg";
import yoga from "./Img/yoga.jpg";

function Love() {
  var [ad, setAd] = useState([]);
  var [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("http://10.10.247.43:8000/api/v1/ads", {
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

      fetch("http://10.10.247.43:8000/api/v1/posts", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPost(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);

  return (
    <div id="container">
      <Header />
      <section>
        <div className="topicTitle">
          <p>推薦的個人論壇</p>
          <Link to="/makeup">
            <img className="topicImg" src={lip} />
            <p className="topicList">美妝保養</p>
            {/* <p>各種美妝技巧貼文</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/food">
            <img className="topicImg" src={cake} />
            <p className="topicList">美食情報</p>
            {/* <p>好食物好味道</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/health">
            <img className="topicImg" src={yoga} />
            <p className="topicList">健康生活</p>
            {/* <p>綠色出行綠色生活</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/fashion">
            <img className="topicImg" src={dress} />
            <p className="topicList">時尚穿搭</p>
            {/* <p>fashion前言趨勢</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
          <Link to="/love">
            <img className="topicImg" src={love} />
            <p className="topicList">感情生活</p>
            {/* <p>各種抱怨聚集地</p> */}
            <img className="topicArrow" src={redArrow} />
          </Link>
        </div>
      </section>
      <article>
        <div className="search">
          <img src={user} alt="" />
          <input type="text" placeholder="熱門貼搜尋" />
          <button>Search</button>
        </div>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        {/* {post.map((post) => {
          return (
            <Link className="card" to="/post">
              <span className="cardTxt">
                <span className="paperTape">paperTapepaperTape</span>
                <span>
                  從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
                </span>
              </span>
              <span className="cardMid">
                <img src={user2} />
                <span className="cardTitle">狗狗貓貓護膚牌真的很好用</span>
              </span>
              <span className="cardBtm">
                <span>#tag</span>
                <span>
                  <img src={comment} alt="" />
                  50
                  <img src={like} alt="" />
                  50
                </span>
              </span>
            </Link>
          );
        })} */}
      </article>
      <aside>
        <div className="aside">
          <p>流行貼文排行榜</p>
          <Link to="/post">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
        </div>
        <div className="aside">
          <p>點贊貼文排行榜</p>
          <Link to="/post">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Love;
