import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./CSS/Signup.css";
import Validation from "./Validation/SignupValidation";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Signup() {
  // 使用useState定义state变量values和errors
  const [values, setValues] = useState({
    username: "",
    idNumber: "",
    email: "",
    phoneNumber: "", // 添加了 phoneNumber 字段
    password: "",
  });

  const [errors, setErrors] = useState({}); // 定義 errors 狀態
  const history = useHistory(); // 将useHistory移动到函数组件的顶层

  const handleInput = (event) => {
    // 更新对应输入字段的值
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    console.log("values", values)

    if (Object.keys(errors).length === 0) {
      const requestData = {
        mem_name: values.username,
        person_id: values.idNumber,
        email: values.email,
        phone: values.phoneNumber,
        password: values.password,
      };

      fetch("http://10.10.247.90:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.status >= 500) {
            alert('伺服器無法連線');
            throw new Error("API request failed");
          } else if (response.status >= 400) {
            alert('註冊失敗，請重新註冊')
            window.location.reload();
          }
          return response.json();
        })

        .then((data) => {
          alert('註冊成功，返回登入頁面')
          history.push("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // ... 其他部分不变 ...

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="signupContainer">
          <div className="signupText">
            <h2>歡迎加入Whisper</h2>
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
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
              <button className="btnSuccess">
                註冊
                {/* <Link className="customLink" to="/verify">
                  註冊
                </Link> */}
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

export default Signup;
