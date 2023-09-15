import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import avatar from "../Img/avatar.png";

function Comment() {
  var [com, setCom] = useState([]);
  const match = useRouteMatch();

  useEffect(() => {
    function fetchData() {
      fetch(
        `http://10.10.247.43:8000/api/v1/comtxts?post[eq]=${match.params.postId}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setCom(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);

  const [state, setState] = useState({
    list: [
      {
        id: 1,
        author: "劉德華",
        comment: "給我一杯忘情水",
        time: new Date("2023-10-10 09:09:00"),
        attitude: 1,
      },
      {
        id: 2,
        author: "周杰倫",
        comment: "哎喲，不錯哦",
        time: new Date("2023-09-11 09:09:00"),
        attitude: 0,
      },
      {
        id: 3,
        author: "五月天",
        comment: "不打擾，是我的溫柔",
        time: new Date("2023-03-11 10:09:00"),
        attitude: -1,
      },
    ],
    newComment: "", // 用於儲存新評論的文本
  });

  function formatTime(time) {
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const date = time.getDate().toString().padStart(2, "0");
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  }

  // 點擊 "like" 按鈕事件處理程序
  function handleLikeClick(index) {
    const newList = [...state.list];
    newList[index].attitude = newList[index].attitude === 1 ? 0 : 1;
    setState({ ...state, list: newList });
  }

  // 提交評論事件處理程序
  function handleSubmitComment() {
    if (state.newComment.trim() !== "") {
      const newCommentObj = {
        id: state.list.length + 1,
        author: "新用户", // 設置新用戶
        comment: state.newComment,
        time: new Date(),
        attitude: 0,
      };

      const newList = [...state.list, newCommentObj];
      setState({ ...state, list: newList, newComment: "" });
    }
  }

  return (
    <div className="commentContainer">
      <div className="commentHead">
        <span>評論 {state.list.length} </span>
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
            value={state.newComment}
            onChange={(e) => setState({ ...state, newComment: e.target.value })}
          />
          <button className="commentSubmit" onClick={handleSubmitComment}>
            評論
          </button>
        </div>
      </div>
      {/* 已評論留言排序 */}
      <div className="commentList">
        {com.map((com) => (
          <div className="listItem" key={com.id}>
            {/* 留言頭像 */}
            <div className="userFace">
              <img className="userHead" src={avatar} />
            </div>
            {/* 留言文案 */}
            <div className="comment">
              <div className="user">{com.comtxtName}</div>
              <p className="text">{com.comment}</p>
              <div className="info">
                {/* <span className="time">{formatTime(item.time)}</span> */}
                <span className="time">{com.createdTime}</span>
                {/* <span
                  className={item.attitude === 1 ? "like liked" : "like"}
                  onClick={() => handleLikeClick(index)} // 添加點擊事件程序
                >
                  <i className="likeIcon" />
                </span> */}
                <span className="reply btnHover">是否還需要回复</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
