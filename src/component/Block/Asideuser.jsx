import React, { Component } from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../CSS/Asideuser.css";
import rabbit from "../img/rabbit.png";

function Asideuser() {
  var [user, setUser] = useState([]);

  const token = localStorage.getItem("token");
  console.log("Token in Profile:", token);

  useEffect(() => {
    function fetchData() {
      fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
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

      fetch(`http://127.0.0.1:8000/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setUser(jsonData.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="aside">
      <img className="asideImg" src={user.headimg || rabbit} />
      <span className="asideName">{user.mem_name}</span>
      <hr />
      <span className="asideMsg">致力於打造美好生活</span>
      <br />
      <span className="asideTime">創建時間:{user.created_at}</span>
      <br />
      <span className="asideTime">最後更新時間:{user.updated_at}</span>
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
