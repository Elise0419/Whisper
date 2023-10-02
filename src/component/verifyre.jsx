import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./CSS/Login.css";

import logo from "./img/logo.png";

function Verifyemail() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [sentVerification, setSentVerification] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendVerification = () => {
    fetch("http://127.0.0.1:8000/api/verify/change/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            alert(data.message);
          });
          history.push("/login");
        }
      })
      .then((data) => {
        console.log(data);
        setSentVerification(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="VerifyContainer">
          <div className="VerifyText">
            <h2>如果email輸入錯誤</h2>
            {/* 這裡插入logo */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <br />
            <br />
            <div className="">
              <label htmlFor="email">
                <strong>如果輸入的郵箱輸入有誤,請輸入正確email</strong>
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

            <button onClick={handleSendVerification} className="btnVerify">
              發送正確email驗證信息
            </button>
            <br />
            <p>完成Email驗證,帳號註冊完成～</p>
            <Link to="/login" className="btnDafaultborder">
              email驗證完成,請直接登入
            </Link>
          </div>
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Verifyemail;
