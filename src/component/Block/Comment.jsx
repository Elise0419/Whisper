import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import rabbit from "../img/rabbit.png"

import "../CSS/Post.css";
function Comment() {
  const [user, setUser] = useState({ read: true, push: true, btnhover: false });
  const [com, setCom] = useState({
    comments: [], // 評論列表
    newComment: "", // 用於儲存新評論的文本
  });

  const match = useRouteMatch();

  function formatTime(time) {
    if (!time || typeof time !== "string") {
      return "Invalid Date";
    }

    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function fetchData() {
    fetch(
      `http://118.233.222.23:8000/api/v1/comtxts?postId[eq]=${match.params.postId}`
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const comments = jsonData.data.map((comment) => {
          return {
            ...comment,
            time: formatTime(comment.updateTime),
          };
        });
        setCom({ ...com, comments });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function getData() {
    const token = localStorage.getItem("token");
    fetch("http://118.233.222.23:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          // history.push("/verify");
          throw new Error("API request failed");
        } else if (res.status >= 200) {
          return res.json();
        }
      })
      .then((jsonData) => {
        if (jsonData.error) {
        } else {
          setUser({ ...jsonData.user, read: false, push: false });
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  useEffect(() => {
    getData();
    fetchData();
  }, [match.params.postId]);

  function handleLikeClick(index) {
    const newList = [...com.comments];
    newList[index].attitude = newList[index].attitude === 1 ? 0 : 1;
    setCom({ ...com, comments: newList });
  }

  function submitCommentToBackend(newCommentObj) {
    const token = localStorage.getItem("token");
    fetch(
      `http://118.233.222.23:8000/api/posts/${match.params.postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCommentObj),
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        if (jsonData.message === "評論已新增！") {
          fetchData();
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function handleSubmitComment() {
    if (com.newComment.trim() !== "") {
      const newCommentObj = {
        comtxtName: " ", // 这里可能需要修改为合适的值
        comment: com.newComment,
        updateTime: new Date().toISOString(),
        attitude: 0,
      };

      submitCommentToBackend(newCommentObj);
      // 清空新评论输入框
      setCom({ ...com, newComment: "" });
    }
  }

  return (
    <div className="commentContainer">
      <div className="commentHead">
        <span>評論 {com.comments.length} </span>
      </div>
      <div className="commentSend">
        <div className="userFace">
          <img className="userHead" src={user.headimg || rabbit} alt="" />
        </div>
        <div className="textareaContainer">
          <textarea
            cols="80"
            rows="5"
            placeholder={
              user.push ? "你尚未登入，請先進行登入後評論" : "寫下你的評論"
            }
            className="iptTxt"
            value={com.newComment}
            onChange={(e) => setCom({ ...com, newComment: e.target.value })}
            readOnly={user.read}
          />
          <button
            className="commentSubmit"
            onClick={handleSubmitComment}
            disabled={user.push}
          >
            {user.push ? <Link to="/login" className="commentLink">點我登入</Link>
 : "評論"}
          </button>
        </div>
      </div>
      <div className="commentList">
        {com.comments.map((comment) => (
          <div className="listItem" key={comment.id}>
            <div className="userFace">
              <img className="userHead" src={comment.headImg} alt="" />
            </div>
            <div className="comment">
              <div className="user">{comment.comtxtName}</div>
              <p className="text">{comment.comment}</p>
              <div className="info">
                <span className="time">{formatTime(comment.createdTime)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
