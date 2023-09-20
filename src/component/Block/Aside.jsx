import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "../CSS/Aside.css";

import makeup2 from "../Img/makeup.jpeg";

function Aside() {
  let [forum, setForum] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [searchQuery, setSearchQuery] = useState({});
  let [art, setArt] = useState([]);
  let [showInfo, setShowInfo] = useState(false);
  const match = useRouteMatch();

  useEffect(() => {
    function fetchData() {
      fetch(
        `http://10.10.247.43:8000/api/v1/rules?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setForum(jsonData.data);
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
        <span className="voteTopic">
          <img src={makeup2} />
          <span>美妝保養</span>
        </span>
        <div className="vote">
          <span className="voteTitle">最好用的評價口紅!!!😍</span>
          <span>
            <div className="mydict">
              <div>
                <label>
                  <input type="radio" name="radio" />
                  <span>heme</span>
                </label>
                <label>
                  <input type="radio" name="radio" />
                  <span>Romand</span>
                </label>
              </div>
            </div>
          </span>
          <img src={makeup2} />
          <img src={makeup2} />
        </div>
      </div>
      <div className="forumRule">
        <p>個版規則</p>
        <ol href="">
          {forum.map((forum) => {
            return (
              <div key={forum.id}>
                <li>{forum.content}</li>
              </div>
            );
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
