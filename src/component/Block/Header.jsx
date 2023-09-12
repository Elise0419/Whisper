import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import user from "../img/dog.jpeg";
import logo from "../img/logo.png";
import whiteArrow from "../img/whiteArrow.png";
import purpleArrow from "../img/purpleArrow.png";

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
          <a href="">
            <img className="userImg" src={user} />
          </a>
          <a href="">
            <span className="userName">David.one</span>
          </a>
          <img className="userArrow" src={whiteArrow} />
        </div>
      </header>
    </div>
  );
}

export default Header;
