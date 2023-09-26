import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import logo from "./img/logo.png";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      email: values.email,
      password: values.password,
    };

    fetch("http://10.10.247.90:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.status >= 500) {
          alert("伺服器中斷連接");
          throw new Error("Network response was not ok");
        } else if (response.status >= 400) {
          alert("帳號密碼錯誤");
          window.location.reload();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.authorization.token);
        alert('登入成功，即將返回首頁')
        history.push("/");
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

export default Login;
