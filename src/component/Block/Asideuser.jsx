import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Asideuser.css";
// import rabbit from "../img/rabbit.png";

function Asideuser() {
  let [user, setUser] = useState([]);
  let dTSc = user.created_at;
  let dTc = new Date(dTSc);
  let yc = dTc.getFullYear();
  let mc = (dTc.getMonth() + 1).toString().padStart(2, "0"); // 注意月份从 0 开始，需要加 1
  let dc = dTc.getDate().toString().padStart(2, "0");
  let fDc = `${yc}-${mc}-${dc}`;

  let dTSu = user.updated_at;
  let dTu = new Date(dTSu);
  let yu = dTu.getFullYear();
  let mu = (dTu.getMonth() + 1).toString().padStart(2, "0"); // 注意月份从 0 开始，需要加 1
  let du = dTu.getDate().toString().padStart(2, "0");
  let fDu = `${yu}-${mu}-${du}`;

  const token = localStorage.getItem("token");
  console.log("Token in Profile:", token);

  useEffect(() => {
    function fetchData() {
      fetch("http://10.10.247.90:8000/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 403) {
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            return res.json();
          }
        })
        .then((jsonData) => {
          if (jsonData.error) {
            console.log("錯誤訊息:", jsonData.error);
          } else {
            setUser(jsonData.user);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
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

      fetch(`http://10.10.247.90:8000/api/profile`, {
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
    fetchPosts(); // Call the fetchPosts function here
  }, []);

  return (
    <div className="aside">
      <img className="asideImg" src={user.headimg || rabbit} />
      <span className="asideName">{user.mem_name}</span>
      <hr />
      <div className="asideUser">
      <span className="asideMsg">{user.promise}</span>
      <br />
      <span className="asideTime">創建時間:2023-08-01</span>
      <br />
      <span className="asideTime">最後更新時間:2023-08-01</span>
      <div className="asideNum">
        <p>{postCount}</p>
        <p>發布貼文數量</p>
      </div>
      <Link to="/upload/life">
        <button className="asideBtn">創建貼文</button>
      </Link>
    </div>

      </div>
      
  );
}

export default Asideuser;
