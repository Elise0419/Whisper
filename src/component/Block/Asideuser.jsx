import React, { Component } from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../CSS/Asideuser.css";

function Asideuser() {
  var [user, setUser] = useState([]);

  // var token = localStorage.setItem("token", );
  var token = localStorage.getItem("token");
  useEffect(() => {
    function fetchData() {
      fetch("http://192.168.1.3:8000/projectmfee41/public/api/login", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          // setUser(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="aside">
      <img className="asideImg" src={user} />
      <span className="asideName">David.one</span>
      <hr />
      <span className="asideMsg">致力於打造美好生活</span>
      <br />
      <span className="asideTime">創建時間:2023-08-01</span>
      <br />
      <span className="asideTime">最後更新時間:2023-08-01</span>
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
