import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import "./CSS/Postart.css";

function Postart() {
  return (
    <div className="postart">
      <div className="manageEdit">
        <div className="manageContent">
          <img
            src="https://imgs.gvm.com.tw/upload/gallery/20201209/75813_01.jpg"
            alt=""
          />
          <div className="manageText">
            <p className="managePost">貼文名字：給予正想踏進美妝美妝</p>
            <p className="manageTime">David.one.發布者.2023.8.15.16:00pm</p>

            <div className="manageInteractions">
              <span>
                <i className="material-icons">thumb_up</i> {/* 點讚 icon */}
                <span>12</span> {/* 顯示讚數 */}
                <i className="material-icons">favorite</i> {/* 收藏 icon */}
                <span>8</span> {/* 顯示收藏數 */}
              </span>
            </div>
          </div>
        </div>
        <div className="manageBtn">
          <button className="editBtn">編輯</button>
          <button className="deleteBtn">刪除</button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Postart;
