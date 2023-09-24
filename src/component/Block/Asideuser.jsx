import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Asideuser.css";
// import rabbit from "../img/rabbit.png";

function Asideuser() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  
  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    // 貼文數量抓取
    fetch(`http://118.233.222.23:8000/api/user/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log("Data from server:", resJson);
        if (resJson.message === "没有蒐藏任何貼文") {
          setPosts([]);
          setPostCount(0);
        } else {
          setPosts(resJson.posts);
          setPostCount(resJson.postCount);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // 個人信息抓去
  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("token");
      console.log("Token in Profile:", token);

      fetch("http://118.233.222.23:8000/api/profile", {
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
    }

    fetchData();
    fetchPosts(); // Call the fetchPosts function here
  }, []);

  return (
    <div className="aside">

      <div>{console.log(user)}</div>
      <img className="asideImg" src={user.headimg} />
      <span className="asideName">{user.mem_name}</span>
      <hr />
      <div className="asideUser">
      <span className="asideMsg">{user.promise}</span>
      <br />
      <span className="asideTime">
        創建時間: {formatDate(user.created_at)}
      </span>
      <br />
      <span className="asideTime">
        最後更新時間: {formatDate(user.updated_at)}
      </span>

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
