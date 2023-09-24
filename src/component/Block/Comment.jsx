import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import avatar from "../img/avatar.png";

function Comment() {
  var [com, setCom] = useState({
    comments: [], // 評論列表
    newComment: "", // 用於儲存新評論的文本
  });
  const match = useRouteMatch();

  useEffect(() => {
    function formatTime(time) {
      if (!time || typeof time !== "string") {
        return "Invalid Date";
      }

      // 在這裡對日期字串進行格式化
      const year = time.substring(0, 4);
      const month = time.substring(5, 7);
      const date = time.substring(8, 10);
      const hours = time.substring(11, 13);
      const minutes = time.substring(14, 16);

      return `${year}-${month}-${date} ${hours}:${minutes}`;
    }

    function fetchData() {
      fetch(
        `http://192.168.194.32:8000/api/v1/comtxts?post[eq]=${match.params.postId}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          const comments = jsonData.data.map((comment) => {
            return {
              ...comment,
              time: formatTime(comment.createdtime),
            };
          });
          setCom({ ...com, comments });
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.postId]);

  function handleLikeClick(index) {
    const newList = [...com.comments];
    newList[index].attitude = newList[index].attitude === 1 ? 0 : 1;
    setCom({ ...com, comments: newList });
  }

  function handleSubmitComment() {
    if (com.newComment.trim() !== "") {
      const newCommentObj = {
        id: com.comments.length + 1,
        author: "David", // 这里可以根据需要从用户状态中获取
        comment: com.newComment,
        time: new Date().toISOString(), // 将日期格式化为ISO 8601格式
        attitude: 0,
        headImg: avatar, // 添加头像
      };

      setCom({
        ...com,
        comments: [...com.comments, newCommentObj],
        newComment: "", // 清空新評論文本
      });
    }
  }

  return (
    <div className="commentContainer">
      <div className="commentHead">
        <span>評論 {com.comments.length} </span>
      </div>
      <div className="commentSend">
        <div className="userFace">
          <img className="userHead" src={avatar} alt="" />
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
              <div className="user">{comment.author}</div>
              <p className="text">{comment.comment}</p>
              <div className="info">
                <span className="time">{comment.time}</span>
                <span
                  className={comment.attitude === 1 ? "like liked" : "like"}
                  onClick={() => handleLikeClick(comment.id - 1)}
                >
                  <i className="likeIcon" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
