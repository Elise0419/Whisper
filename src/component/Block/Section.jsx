import React, { Component } from "react";
import { Link } from "react-router-dom";

import redArrow from "../Img/redArrow.png";
import lip from "../Img/lip.jpg";
import love from "../Img/love.jpg";
import dress from "../Img/dress.jpg";
import cake from "../Img/cake.jpg";
import yoga from "../Img/yoga.jpg";

function Section() {
  return (
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
  );
}

export default Section;
