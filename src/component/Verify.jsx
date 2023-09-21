import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Login.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Verifyemail() {
  return (
    <div id="container">
      <Header />
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
            <p>完成Email驗證,帳號註冊完成～</p>
            <Link to="/signup" className="btnDafaultborder">
              信息輸入錯誤,重新註冊帳號
            </Link>
          </div>
        </div>
      </article>
      <aside></aside>
      <Footer />
    </div>
  );
}

export default Verifyemail;
