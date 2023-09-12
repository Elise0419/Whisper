import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

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
            創建貼文
            <img className="ddArrow" src={purpleArrow} />
            <span className="ddItem">
              <Link to="/upload">美妝保養</Link>
              <Link to="/upload">時尚穿搭</Link>
              <Link to="/upload">美食情報</Link>
              <Link to="/upload">健康生活</Link>
              <Link to="/upload">感情生活</Link>
            </span>
          </button>
        </div>
        <div>
          <Link to="profile">
            <img className="userImg" src={user} />
          </Link>
          <Link to="profile">
            <span className="userName">David.one</span>
          </Link>
          <img className="userArrow" src={whiteArrow} />
        </div>
      </header>
    </div>
  );
}

export default Header;
