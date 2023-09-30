import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CSS/Forgotpw.css";
import logo from "./img/logo.png";

function Mailsend() {
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
      <div className="fgtContainer">
        <div className="fgtText">
          <h2>忘記密碼確認身分</h2>
          <img
            src={logo}
            alt=""
            width="100px"
            style={{ borderRadius: "50%" }}
          />
          <p>已發送重設密碼連結信件至信箱</p>
        </div>
      </div>
    </div>
  );
}

export default Mailsend;
