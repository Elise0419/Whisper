import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Asideuser.css";

import user from "../Img/dog.jpeg";

function Asideuser() {
  return (
    <div className="aside">
      <img className="asideImg" src={user} />
      <span className="asideName">David.one</span>
      <hr />
      <span className="asideMsg">致力於打造美好生活</span>
      <br />
      <span className="asideTime">創建時間:2023-08-01</span>
      <div className="asideNum">
        <p>03</p>
        <p>當前貼文數量</p>
      </div>
      <Link to="/upload">
        <button className="asideBtn" to="">
          創建貼文
        </button>
      </Link>
    </div>
  );
}

export default Asideuser;
