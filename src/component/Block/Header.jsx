import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
  let [dd, setDd] = useState("創建貼文");
  const [user, setUser, login, setLogin] = useUserContext();
  const token = localStorage.getItem("token");

  function logout() {
    fetch("http://127.0.0.1:8000/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        localStorage.setItem("token", "");
        if (res.status >= 200) {
          setLogin(false);
          setUser({});
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function gm() {
    alert("請先登入帳戶");
  }

  function type(e) {
    setDd(e.target.innerText);
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
              <Link to="/upload/mkup" onClick={type}>
                美妝保養
              </Link>
              <Link to="/upload/fashion" onClick={type}>
                時尚穿搭
              </Link>
              <Link to="/upload/food" onClick={type}>
                美食情報
              </Link>
              <Link to="/upload/life" onClick={type}>
                健康生活
              </Link>
              <Link to="/upload/love" onClick={type}>
                感情生活
              </Link>
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
            <button className="userBtn">
              <img className="userArrow" src={whiteArrow} alt="" />
              <span className="userItem">
                <Link to="/home/1">
                  我的主頁&nbsp;&nbsp;
                  <img src={crown} className="myImg" alt="" />
                </Link>
                <Link to="/profile">編輯信息&nbsp;&nbsp;</Link>
                <Link to="/manage">管理貼文</Link>
                {user && user.admin ? (
                  <Link to="/admin/article/1">管理員模式</Link>
                ) : (
                  <span></span>
                )}
                {user && user.superadmin ? (
                  <Link to="/admin/users/manage/1">超級管理員</Link>
                ) : (
                  <span></span>
                )}
                <hr />
                <span onClick={logout}>登出</span>
              </span>
            </button>
          ) : (
            <Link to="/login">
              <span className="loginCss">登入</span>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
