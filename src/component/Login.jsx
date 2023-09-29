import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./img/logo.png";
import "./CSS/Login.css";

function Login() {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    acm_error: "",
    pwd_error: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      acm_error: "",
      pwd_error: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      email: values.email,
      password: values.password,
    };

    fetch("http://118.233.222.23:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.status >= 500) {
          alert("伺服器沒有回應");
          throw new Error("Network response was not ok");
          //帳號錯誤
        } else if (response.status === 404) {
          response.json().then((data) => {
            setValues({
              ...values,
              acm_error: data.acm_error,
            });
          });
          // 密碼錯誤
        } else if (response.status === 401) {
          response.json().then((data) => {
            setValues({
              ...values,
              pwd_error: data.pwd_error,
              password: "",
            });
          });
          // window.location.reload();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.authorization.token);
        alert("登入成功，即將返回首頁");
        history.push("/home/1");
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="loginContainer">
          <div className="loginText">
            <h2>歡迎登入Whisper</h2>
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
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
                  className="verifyMain form input"
                />
                <span className="LoginError">{values.acm_error}</span>
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
                  value={values.password}
                />
                <span className="LoginError">{values.pwd_error}</span>
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
    </div>
  );
}

export default Login;
