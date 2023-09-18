import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./Aside.css";

import makeup2 from "../Img/makeup.jpeg";

function Aside() {
  const [forum, setForum] = useState([]);
  const match = useRouteMatch();
  useEffect(() => {
    function fetchData() {
      fetch(
        `http://192.168.1.3:8000/api/v1/rules?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          // setForum(jsonData.data);
          // console.log(forum);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.type]);

  return (
    <aside>
      <div className="aside">
        <span>
          <p className="forumTitle">
            <img src={makeup2} />
            <span>化妝品論壇</span>
          </p>
          <p className="forumIntro">
            化妝品使用教學論壇，給你帶來什麼體驗？化妝品使用教學論壇，給你帶來什麼體驗？
          </p>
          <p className="forumCreate">創建時間 2022-10-1</p>
        </span>
        <hr color="lightgray" width="80%" />
        <span className="forumBtm">
          <span>
            <p>8630</p>
            <p>瀏覽人數</p>
          </span>
          <span>
            <p>25</p>
            <p>貼文新增</p>
          </span>
        </span>
        <hr color="lightgray" width="80%" />
      </div>
      <div className="forumRule">
        <p>個版規則</p>
        <ol href="">
          {forum.map((forum) => {
            <li key={forum.id}>{forum.content}</li>;
          })}
        </ol>
      </div>
      <div className="forumTag">
        <span>
          <p>話題選擇器</p>
          <button className="tagA">#修護</button>
          <button className="tagB">#美妝產品</button>
          <button className="tagC">#美容科技</button>
          <br />
          <button className="tagA">#修護</button>
          <button className="tagB">#美妝產品</button>
          <button className="tagC">#美容科技</button>
        </span>
      </div>
    </aside>
  );
}

export default Aside;
