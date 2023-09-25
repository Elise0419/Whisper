import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Login.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Verifyemail() {
  const [email, setEmail] = useState("");
  const [sentVerification, setSentVerification] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendVerification = () => {
    fetch("http://10.10.247.90:8000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSentVerification(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="VerifyContainer">
          <div className="VerifyText">
            <h2>請驗證您的Email</h2>
            {/* 這裡插入logo */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <br /><br />
            <div className="">
              <label htmlFor="email">
                <strong>如果您剛剛輸入的郵箱輸入有誤,請輸入正確email</strong>
              </label>
              <input
                type="email"
                placeholder="請輸入正確email"
                name="email"
                onChange={handleEmailChange}
                value={email}
                className="verifyMain"
              />
            </div>

            <button onClick={handleSendVerification} className="btnVerify">發送驗證信息</button>
            <br />
            <p>完成Email驗證,帳號註冊完成～</p>
            <Link to="/login" className="btnDafaultborder">
              email驗證完成,請直接登入
            </Link>
          </div>
        </div>
      </article>
      <aside></aside>
      <Footer />
    </div>
  );
}

export default Verifyemail;
