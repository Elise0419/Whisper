import React, { Component } from "react";

import "./Header.css";

import user from "./img/dog.jpeg";
import logo from "./img/logo.png";
import whiteArrow from "./img/whiteArrow.png";
import purpleArrow from "./img/purpleArrow.png";

function Header() {
  return (
    <div id="container">
      <div className="nav">nav</div>
      <header>
        <div>
          <a href="">
            <img className="logo" src={logo} />
          </a>
          <a href="">
            <span className="whisper">WHISPER</span>
          </a>
          <button className="ddBtn">
            切換論壇個版
            <img className="ddArrow" src={purpleArrow} />
            <span className="ddItem">
              <a href="">美妝保養</a>
              <a href="">時尚穿搭</a>
              <a href="">美食情報</a>
              <a href="">健康生活</a>
              <a href="">感情生活</a>
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
