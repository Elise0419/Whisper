import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Forgotpw.css";
import Validation from "./Validation/ForgotpwValidation";

import logo from "./img/logo.png";

function Forgotpw() {

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="fgtContainer">
          <div className="fgtText">
            <h2>完成變更密碼</h2>
            {/* 這裡插入logo */}
            {/* eslint-disable-next-line */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>已完成密碼變更，快使用新密碼登入</p>
          </div>
         
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Forgotpw;
