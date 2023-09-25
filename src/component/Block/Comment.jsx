import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import avatar from "../img/avatar.png";

function Comment() {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({
    comments: [], // 評論列表
    newComment: "", // 用於儲存新評論的文本
  });

  const match = useRouteMatch();

  function formatTime(time) {
    if (!time || typeof time !== "string") {
      return "Invalid Date";
    }

    const [year, month, date, hours, minutes] = time.split(/[-T:]/);
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  }

  function fetchData() {
    fetch(
      `http://10.10.247.90:8000/api/v1/comtxts?postId[eq]=${match.params.postId}`,
      {
        method: "GET",
      }
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
    console.log("Token in Profile:", token);

    fetch("http://10.10.247.90:8000/api/profile", {
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
          console.log("錯誤訊息:", jsonData.error);
        } else {
          setUser(jsonData.user);
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
      `http://10.10.247.90:8000/api/posts/${match.params.postId}/comments`,
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
        console.log("jsonData", jsonData);
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
          <div>{console.log(user)}</div>
          <img className="userHead" src={user.headimg} alt="" />
          {/* <img className="userHead" src={avatar} alt="" /> */}
        </div>
        <div className="textareaContainer">
          <textarea
            cols="80"
            rows="5"
            placeholder="寫下你的評論"
            className="iptTxt"
            value={com.newComment}
            onChange={(e) => setCom({ ...com, newComment: e.target.value })}
          />
          <button className="commentSubmit" onClick={handleSubmitComment}>
            評論
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
                <span className="time">{comment.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
