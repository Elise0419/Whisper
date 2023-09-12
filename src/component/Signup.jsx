import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Signup.css";

import Validation from "./SignupValidation";

import Header from "./Block/Header";
import Footer from "./Block/Footer";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    idNumber: "",
    email: "",
    password: "",
  });

  // 定義 errors 狀態
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    // 使用 values.username, values.idNumber, values.email, values.password 来获取相应的值
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="signupContainer">
          <div className="signupText">
            <h2>歡迎加入Whisper</h2>
            <p>我已經有帳號,請直接登入～</p>
            <Link to="/login" className="btnDafaultborder">
              登入
            </Link>
          </div>
          <div className="signupMain">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="username">
                  <strong>用戶名稱暱稱</strong>
                </label>
                <input
                  type="text"
                  placeholder="輸入用戶名"
                  name="username"
                  onChange={handleInput}
                />
                {errors.username && (
                  <span className="errorMessage">{errors.username}</span>
                )}
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

              <div className="">
                <label htmlFor="email">
                  <strong>電子郵件</strong>
                </label>
                <input
                  type="email"
                  placeholder="輸入Email"
                  name="email"
                  onChange={handleInput}
                />
                {errors.email && (
                  <span className="errorMessage">{errors.email}</span>
                )}
              </div>

              <div className="">
                <label htmlFor="phoneNumber">
                  <strong>手機號碼</strong>
                </label>
                <input
                  type="phoneNumber"
                  placeholder="輸入手機號碼"
                  name="phoneNumber"
                  onChange={handleInput}
                />
                {errors.phoneNumber && (
                  <span className="errorMessage">{errors.phoneNumber}</span>
                )}
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
                />
                {errors.password && (
                  <span className="errorMessage">{errors.password}</span>
                )}
              </div>

              <button className="btnSuccess">註冊</button>
            </form>
          </div>
        </div>
      </article>
      <aside></aside>
      <Footer />
    </div>
  );
}

export default Signup;
