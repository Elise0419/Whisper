import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../store/UserContext";

import "../CSS/Header.css";

import logo from "../img/logo.png";
import whiteArrow from "../img/whiteArrow.png";
import purpleArrow from "../img/purpleArrow.png";
import rabbit from "../img/rabbit.png";
import crown from "../img/crown.png";
import mail from "../img/love3.png";
import grayMail from "../img/grayMail.png";

function Header() {
  let [dd, setDd] = useState("創建貼文");
  // let [user, setUser] = useState({});
  const [user, setUser] = useUserContext();
  const [login, setLogin] = useState(true);
  const m = useRouteMatch().params.type;
  const token = localStorage.getItem("token");

  function logout() {
    fetch("http://118.233.222.23:8000/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.setItem("token", "");
        if (res.status >= 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  useEffect(
    function () {
      if (m) {
        if (m === "love") {
          setDd("感情生活");
        } else if (m === "life") {
          setDd("健康生活");
        } else if (m === "food") {
          setDd("美食情報");
        } else if (m === "fashion") {
          setDd("時尚穿搭");
        } else if (m === "mkup") {
          setDd("美妝保養");
        }
      } else {
        setDd("創建貼文");
      }

      function fetchData() {
        fetch(`http://118.233.222.23:8000/api/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.status >= 200 && res.status < 400) {
              return res.json();
            } else {
              throw new Error("Failed to fetch user data");
            }
          })
          .then((jsonData) => {
            setLogin(false);
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

  function gm() {
    alert("請先登入帳戶");
  }

  return (
    <div id="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <div className="nav">nav</div>
      <header>
        <div>
          <Link to="/home/1">
            <img className="logo " src={logo} alt="" />
          </Link>
          <Link to="/home/1">
            <span className="whisper">WHISPER</span>
          </Link>
          <button className="ddBtn">
            <p className="ddName">{dd}</p>
            <img className="ddArrow" src={purpleArrow} alt="" />
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
          <button className="headerSecret">
            {token ? (
              <Link to="/secret">
                <img
                  src={mail}
                  className="secret animate__animated animate__heartBeat animate__infinite"
                  alt=""
                />
              </Link>
            ) : (
              <img src={grayMail} className="grayMail" onClick={gm} alt="" />
            )}
          </button>
          <Link to="/profile">
            <img className="userImg" src={user?.headimg || rabbit} alt="" />
          </Link>
          <Link to="/profile">
            <span className="userName">{user?.mem_name || "Guest"}</span>
          </Link>
          {login ? (
            <Link to="/login">
              <span className="loginCss">登入</span>
            </Link>
          ) : (
            <button className="userBtn">
              <img className="userArrow" src={whiteArrow} alt="" />
              <span className="userItem">
                <Link to="/home/1">
                  我的主頁&nbsp;&nbsp;
                  <img src={crown} className="myImg" alt="" />
                </Link>
                <Link to="/profile">編輯信息&nbsp;&nbsp;</Link>
                <Link to="/manage">管理貼文</Link>
                {user.admin ? (
                  <Link to="/admin/article">管理員模式</Link>
                ) : (
                  <span></span>
                )}
                <hr />
                <span onClick={logout}>登出</span>
              </span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
