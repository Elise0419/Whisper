import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Restpwd.css";
import Validation from "./Validation/RestpwdValidation";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./Img/logo.png";

function Restpwd() {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (!errors.password && !errors.confirmPassword) {
      // 发送密码重置请求
      fetch("http://example.com/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("密码重置成功", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="restContainer">
          <div className="restText">
            <h2>Whisper修改密碼</h2>
            <img src={logo} alt="" width="100px" style={{ borderRadius: "50%" }} />
            <p>請輸入新密碼喔～</p>
          </div>
          <div className="restMain">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="password">
                  <strong>新密码</strong>
                </label>
                <input
                  type="password"
                  placeholder="输入新密码"
                  name="password"
                  onChange={handleInput}
                  className=""
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="">
                <label htmlFor="confirmPassword">
                  <strong>确认密码</strong>
                </label>
                <input
                  type="password"
                  placeholder="再次输入密码"
                  name="confirmPassword"
                  onChange={handleInput}
                  className=""
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <button type="submit" className="btnSuccess">
                重置密码
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
