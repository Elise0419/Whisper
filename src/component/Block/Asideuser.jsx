import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Asideuser.css";

import user from "../Img/dog.jpeg";

function Asideuser() {
  return (
    <aside>
      {/* 側邊欄內容 */}
      <div className="aside">
        <p className="forumUser">
          <img className="userImg" src={user} alt="" />
          <h3>David.one</h3>
        </p>
        <hr color="lightgray" width="80%" />
        <div className="asideInfo">
          <span>致力於打造美好生活,致力於打造美好生活,致力於打造美好生活</span>
          <p>創建時間:2023-08-01</p>
        </div>

        <div className="postNumber">
          <span>03</span>
          <span>當前貼文數量</span>
          <Link className="creatPost" to="/upload">
            創建貼文
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Asideuser;
