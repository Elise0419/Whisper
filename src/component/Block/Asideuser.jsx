import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Asideuser.css";
import rabbit from "../img/rabbit.png";

function Asideuser() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  let dTSc = user.created_at;
  let dTc = new Date(dTSc);
  let yc = dTc.getFullYear();
  let mc = (dTc.getMonth() + 1).toString().padStart(2, "0");
  let dc = dTc.getDate().toString().padStart(2, "0");
  let fDc = `${yc}-${mc}-${dc}`;

  let dTSu = user.updated_at;
  let dTu = new Date(dTSu);
  let yu = dTu.getFullYear();
  let mu = (dTu.getMonth() + 1).toString().padStart(2, "0");
  let du = dTu.getDate().toString().padStart(2, "0");
  let fDu = `${yu}-${mu}-${du}`;

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    fetch(`http://10.10.247.90:8000/api/user/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
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

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("token");
      fetch("http://10.10.247.90:8000/api/profile", {
        headers: {
          "Content-Type": "application/json",
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
          console.log("錯誤:", err);
        });
    }

    fetchData();
    fetchPosts();
  }, []);

  return (
    <div className="aside">
      <div className="asideContainer">
        <div className="asideName">
          <div>{console.log("user", user)}</div>
          <img className="asideImg" src={user.headimg || rabbit} />
          {/* <img className="asideImg" src={user.headimg} /> */}
          <span className="asideText">{user.mem_name}</span>
        </div>

        <div className="asideUser">
          <hr />

          <div className="asideMsg">{user.promise}</div>
          <br />

          <div className="asideTime">
            <span>創建時間: {fDc}</span>
            <span>最後更新時間: {fDu}</span>
          </div>

          <div>
            <p className="asideNum">{postCount}</p>
            <p className="asideNum">發布貼文數量</p>
          </div>
          <Link to="/upload/fashion">
            <button className="asideBtn">創建貼文</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Asideuser;
