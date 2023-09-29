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
            <h2>忘記密碼確認身分</h2>
            {/* 這裡插入logo */}
            {/* eslint-disable-next-line */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>已發送重設密碼連結信件至信箱</p>

          </div>
         
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Forgotpw;
