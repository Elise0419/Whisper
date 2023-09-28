import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Login.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Verifyemail() {
  return (
    <div id="container">
      <section></section>
      <article>
        <div className="VerifyContainer">
          <div className="VerifyText">
            <h2>請驗證您的Email</h2>
            {/* 這裡插入logo */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <br /><br />
            <div className="">
              <strong>尚未完成email驗證,請至郵箱驗證您的email</strong>
            </div>
            <Link to="/verifyre" className="btnVerify">
              如果沒有收到email,請點擊這裡
            </Link>

            <p>完成Email驗證才能帳號註冊完成～</p>
            <Link to="/login" className="btnDafaultborder">
              email驗證完成,請直接登入
            </Link>
          </div>
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Verifyemail;
