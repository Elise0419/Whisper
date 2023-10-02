import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./CSS/Forgotpw.css";
import Validation from "./Validation/ForgotpwValidation";

import logo from "./img/logo.png";

function Forgotpw() {
  const history = useHistory();

  const [values, setValues] = useState({
    email: "",
    person_id: "",
  });

  const [errors, setErrors] = useState({
    wrong: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // 使用fetch來發送POST請求
    fetch("http://127.0.0.1:8000/api/password/forgot/mail", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          history.push("/mail/success");
        } else {
          res.json().then((data) => {
            setErrors({
              ...errors,
              wrong: data.message,
            });
          });
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
                <label htmlFor="person_id">
                  <strong>身份證字號</strong>
                </label>
                <input
                  type="text"
                  placeholder="輸入身份證字號"
                  name="person_id"
                  onChange={handleInput}
                />
                {errors.person_id && (
                  <span className="errorMessage">{errors.person_id}</span>
                )}
              </div>

              <button type="submit" className="btnSuccessfog">
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
