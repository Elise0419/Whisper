import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Validation from "./Validation/RestpwdValidation";

import "./CSS/Restpwd.css";

import logo from "./img/logo.png";

function Restpwd() {
  const { data } = useParams();
  console.log(data)
  const history = useHistory();
  const [values, setValues] = useState({
    new_password: "",
    password_confirm: "",
  });

  const decodedData = decodeURIComponent(data);

  const paramParts = decodedData.split('&');

  const params = {};

  paramParts.forEach(part => {
    const [key, value] = part.split('=');
    params[key] = value;
  });

  const token = atob(params.token);
  const expires = params.expires;
  const signature = params.signature;

  console.log('Token:', token);
  console.log('Expires:', expires);
  console.log('Signature:', signature);

  const [errors, setErrors] = useState({
    wrong: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (!errors.password && !errors.confirmPassword) {
      // 設置新密碼發送請求
      fetch(`http://118.233.222.23:8000/api/password/forgot/reset/expires=${expires}/signature=${signature}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          new_password: values.new_password,
          password_confirm: values.password_confirm,
        }),
      })
        .then((response) => {
          if (response.status >= 500) {
            response.json().then((data) => {
              console.log(data.message)
            });
            alert('請重新驗證')

          } else if (response.status === 400) {
            response.json().then((data) => {
              setErrors({
                ...errors,
                wrong: data.message,
              });
            });
          } else {
            history.push("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="restContainer">
          <div className="restText">
            <h2>Whisper設置新密碼</h2>
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>請在輸入框設置新密碼</p>
          </div>
          <div className="restMain">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="new_password">
                  <strong>請輸入新密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="輸入新密碼"
                  name="new_password"
                  onChange={handleInput}
                  value={values.new_password}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="">
                <label htmlFor="password_confirm">
                  <strong>再次輸入密碼</strong>
                </label>
                <input
                  type="password"
                  placeholder="再次輸入密碼"
                  name="password_confirm"
                  onChange={handleInput}
                  value={values.password_confirm}
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
    </div>
  );
}

export default Restpwd;
