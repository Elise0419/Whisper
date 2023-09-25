// 引入React和useState钩子
import React, { useState } from "react";
// 引入Link组件用于路由导航
import { Link, useHistory } from "react-router-dom";

// 引入LoginValidation（假设是一个用于验证登录表单的模块）
import Validation from "./Validation/LoginValidation";
// 引入Header和Footer组件
import Header from "./Block/Header";
import Footer from "./Block/Footer";

// 引入logo图片
import logo from "./img/logo.png";

function Login() {
  // 使用useState定义state变量values和errors
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const history = useHistory(); // 将useHistory移动到函数组件的顶层

  // 处理输入框的变化事件
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // 处理表单提交事件
  const handleSubmit = (event) => {
    event.preventDefault();
    // 使用Validation函数验证表单数据，并将错误信息存储在errors状态中
    setErrors(Validation(values));

    if (Object.keys(errors).length === 0) {
      const requestData = {
        email: values.email,
        password: values.password,
      };

      // 只有当表单验证通过时才进行页面跳转
      fetch("http://118.233.222.23:8000/api/login", {
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
          // 在这里处理从后端返回的数据
          localStorage.setItem("token", data.authorization.token); // 将Token存储在本地

          history.push("/");
          // 登录成功后跳转到首页

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
            {/* 使用Link组件导航到注册页面 */}
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
                {errors.email && <span className="error">{errors.email}</span>}
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
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              {/* 使用Link组件导航到忘记密码页面 */}
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
