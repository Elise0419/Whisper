import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Restpwd.css";
import Validation from "./Validation/LoginValidation";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./Img/logo.png";

function Restpwd() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // 使用fetch來發送POST請求
    fetch("http://example.com/your_php_script.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        // 在這裡處理從後端返回的數據
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="loginContainer">
          <div className="loginText">
            <h2>歡迎登入Whisper</h2>
            {/* 這裡插入logo */}
            <img src={logo} alt="" width="100px" style={{ borderRadius: "50%" }} />
            <p>目前還沒有帳號,請註冊新帳號～</p>
            <Link to="/signup" className="btnDafaultborder">
              註冊帳號
            </Link>
          </div>
          <div className="loginMain">
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
                <label htmlFor="password">
                  <strong>密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="輸入密碼"
                  name="password"
                  onChange={handleInput}
                  className=""
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <Link to="/forgotpw" className="btnDafaultborder">
              忘記密碼
            </Link>
              <button type="submit" className="btnSuccess">
                登入
              </button>
            </form>
          </div>
        </div>
      </article>
      <aside></aside>
      <Footer />
    </div>
  );
}

export default Restpwd;
