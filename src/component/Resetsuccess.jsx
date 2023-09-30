import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CSS/Forgotpw.css";
import logo from "./img/logo.png";

function Resetsuccess() {
  const history = useHistory();
  useEffect(() => {
    const delay = 3000;
    const timeoutId = setTimeout(() => {
      history.push("/login");
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [history]);

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="fgtContainer">
          <div className="fgtText">
            <h2>完成變更密碼</h2>
            {/* 這裡插入logo */}
            {/* eslint-disable-next-line */}
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>已完成密碼變更，3秒後回到登入頁面</p>
          </div>

        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Resetsuccess;
