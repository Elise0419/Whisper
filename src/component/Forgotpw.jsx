import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Forgotpw.css";
import Validation from "./Validation/ForgotpwValidation";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Forgotpw() {
  const [values, setValues] = useState({
    email: "",
    idNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // 使用fetch來發送POST請求
    fetch("http://118.233.222.23:8000/api/password/forgot/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "已將信件發送至信箱") {
          alert("成功發送郵件到您的郵箱，請查收郵箱！");
        } else {
          alert("發送郵件失敗,請聯繫管理員。");
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="fgtContainer">
          <div className="fgtText">
            <h2>歡迎Whisper用戶</h2>
            {/* 這裡插入logo */}
            {/* eslint-disable-next-line */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>忘記密碼可以馬上找回，或者～</p>
            <Link to="/signup" className="btnDafaultborder">
              註冊新帳號
            </Link>
          </div>
          <div className="fgtMain">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="email">
                  <strong>電子郵件</strong>
                </label>
                <input
                  type="email"
                  placeholder="輸入Email"
                  name="email"
                  onChange={handleInput}
                  className=""
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="">
                <label htmlFor="idNumber">
                  <strong>身份證字號</strong>
                </label>
                <input
                  type="text"
                  placeholder="輸入身份證字號"
                  name="idNumber"
                  onChange={handleInput}
                />
                {errors.idNumber && (
                  <span className="errorMessage">{errors.idNumber}</span>
                )}
              </div>

              <button type="submit" className="btnSuccess">
                找回密碼
              </button>
            </form>
          </div>
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Forgotpw;
