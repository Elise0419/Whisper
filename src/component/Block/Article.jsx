import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import like from "../Img/like.png";
import comment from "../Img/comment.png";

function Article() {
  var [art, setArt] = useState([]);
  const match = useRouteMatch();

  var url = match.params.type
    ? `http://10.10.247.43:8000/api/v1/posts?type[eq]=${match.params.type}`
    : `http://10.10.247.43:8000/api/v1/posts`;

  useEffect(() => {
    function fetchData() {
      fetch(url, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setArt(jsonData.data);
          console.log(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.type]);

  // 在這裡發送請求，更新點擊率
  const handleCardClick = async (postId) => {
    try {
      //發送請求來更新點擊率 地址請後端提供
      const response = await fetch(
        `http://10.10.247.43:8000/api/v1/posts/${postId}/click`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(`成功更新點擊率: ${data}`);
    } catch (error) {
      console.error("錯誤:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="cardContainer">
        {art.map((art) => {
          return (
            // 增加一個onclick 點擊率事件
            <Link
              className="card"
              to={`/post/${art.postId}`}
              key={art.postId}
              onClick={() => handleCardClick(art.postId)}
            >
              <span className="cardTop">
                {typeof art.imgUrl === "string" ? (
                  <img
                    className="cardImg"
                    src={art.imgUrl}
                    referrerpolicy="no-referrer"
                  />
                ) : (
                  <span className="cardTxt">
                    <span className="paperTape">paperTapepaperTape</span>
                    <br />
                    {art.content}
                  </span>
                )}
              </span>
              <span className="cardMid">
                <img src={art.headImg} />
                <span className="cardTitle">{art.title}</span>
              </span>
              <span className="cardBtm">
                <span>#{art.type}</span>
                <span>
                  <img src={comment} />
                  {art.save}
                  <img src={like} />
                  {art.thumb}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Article;
