import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../CSS/Header.css";

import user from "../Img/dog.jpeg";
import logo from "../Img/logo.png";
import whiteArrow from "../Img/whiteArrow.png";
import purpleArrow from "../Img/purpleArrow.png";

function Header() {
  return (
    <div id="container">
      <div className="nav">nav</div>
      <header>
        <div>
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>
          <Link to="/">
            <span className="whisper">WHISPER</span>
          </Link>
          <button className="ddBtn">
            <p className="ddName">創建貼文</p>
            <img className="ddArrow" src={purpleArrow} />
            <span className="ddItem">
              <Link to="/upload/mkup">美妝保養</Link>
              <Link to="/upload/fashion">時尚穿搭</Link>
              <Link to="/upload/food">美食情報</Link>
              <Link to="/upload/life">健康生活</Link>
              <Link to="/upload/love">感情生活</Link>
            </span>
          </button>
        </div>
        <div>
          <Link to="/profile">
            <img className="userImg" src={user} />
          </Link>
          <Link to="/profile">
            <span className="userName">David.one</span>
          </Link>
          <button className="userBtn">
            <img className="userArrow" src={whiteArrow} />
            <span className="userItem">
              <Link to="/profile">我的主頁</Link>
              <Link to="/profile">編輯信息</Link>
              <Link to="/manage">管理貼文</Link>
              <hr />
              <Link to="/logout">登出</Link>
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
