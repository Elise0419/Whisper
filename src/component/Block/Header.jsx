import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import "../CSS/Header.css";

import logo from "../img/logo.png";
import whiteArrow from "../img/whiteArrow.png";
import purpleArrow from "../img/purpleArrow.png";
import rabbit from "../img/rabbit.png";
import crown from "../img/crown.png";
import mail from "../img/love3.png";

function Header() {
  let [dd, setDd] = useState("創建貼文");
  let [user, setUser] = useState("創建貼文");
  const m = useRouteMatch().params.type;
  useEffect(
    function () {
      if (m) {
        if (m == "love") {
          setDd("感情生活");
        } else if (m == "life") {
          setDd("健康生活");
        } else if (m == "food") {
          setDd("美食情報");
        } else if (m == "fashion") {
          setDd("時尚穿搭");
        } else if (m == "mkup") {
          setDd("美妝保養");
        }
      } else {
        setDd("創建貼文");
      }

      function fetchData() {
        const token = localStorage.getItem("token");
        console.log("Token in Profile:", token);

        fetch(`http://10.10.247.90:8000/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((jsonData) => {
            setUser(jsonData.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      fetchData();
    },
    [m]
  );

  return (
    <div id="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <div className="nav">nav</div>
      <header>
        <div>
          <Link to="/">
            <img className="logo " src={logo} />
          </Link>
          <Link to="/">
            <span className="whisper">WHISPER</span>
          </Link>
          <button className="ddBtn">
            <p className="ddName">{dd}</p>
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
          <Link to="/secret">
            <img
              src={mail}
              className="secret animate__animated animate__heartBeat animate__infinite"
            />
          </Link>
          <Link to="/profile">
            <img className="userImg" src={user?.headimg || rabbit} />
          </Link>
          <Link to="/profile">
            <span className="userName">{user?.mem_name || ''}</span>
          </Link>
          <button className="userBtn">
            <img className="userArrow" src={whiteArrow} />
            <span className="userItem">
              <Link to="/profile">
                我的主頁&nbsp;&nbsp;
                <img src={crown} className="myImg" />
              </Link>
              <Link to="/profile">編輯信息&nbsp;&nbsp;</Link>
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
