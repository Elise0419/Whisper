import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./CSS/Restpwd.css";
import Validation from "./Validation/RestpwdValidation";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import logo from "./img/logo.png";

function Restpwd() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [values, setValues] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
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

    if (!errors.password && !errors.confirmPassword && !errors.oldPassword) {
      // 发送密码重置请求
      fetch("http://118.233.222.23:8000/api/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: values.oldPassword,
          new_password: values.password,
          password_confirm: values.confirmPassword,
        }),
      })
        .then((response) => {
          if (response.status === 401) {
            history.push("/login");
          } else if (response.status === 400) {
            response.json().then((data) => {
              setErrors({
                ...errors,
                wrong: data.message,
              });
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log("密码重置成功", data);
          history.push("/login");
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
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>請輸入新密碼喔～</p>
          </div>
          <div className="restMain">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="oldPassword">
                  <strong>請輸入舊密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="輸入舊密碼"
                  name="oldPassword"
                  onChange={handleInput}
                  value={values.oldPassword}
                />
                {errors.oldPassword && (
                  <span className="error">{errors.oldPassword}</span>
                )}
              </div>
              <div className="">
                <label htmlFor="password">
                  <strong>請輸入新密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="輸入新密碼"
                  name="password"
                  onChange={handleInput}
                  value={values.password}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="">
                <label htmlFor="confirmPassword">
                  <strong>再次輸入密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="再次輸入密碼"
                  name="confirmPassword"
                  onChange={handleInput}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <button type="submit" className="btnSuccess">
                重置密碼
              </button>
              <span>{errors.wrong}</span>
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
