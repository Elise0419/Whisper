import React, { Component } from "react";
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
  return (
    <div id="container">
      <Header />
      <section>
        <div className="topicTitle">
          <p>推薦的個人論壇</p>
          <Link to="/mkup">
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
          <Link to="/life">
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
