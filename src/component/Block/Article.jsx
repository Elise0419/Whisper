import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import user2 from "../Img/cat.jpg";
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
  }, []);

  return (
    <React.Fragment>
      {art.map((art) => {
        return (
          <Link className="card" to={`/post/${art.postId}`} key={art.postId}>
            <span className="cardTop">
              {typeof art.imgUrl === "string" ? (
                <img className="cardImg" src={art.imgUrl} />
              ) : (
                <span className="cardTxt">
                  <span className="paperTape">paperTapepaperTape</span>
                  <br />
                  {art.content}
                </span>
              )}
            </span>
            <span className="cardMid">
              <img src={user2} />
              <span className="cardTitle">{art.title}</span>
            </span>
            <span className="cardBtm">
              <span>#tag</span>
              <span>
                <img src={comment} alt="" />
                50
                <img src={like} alt="" />
                50
              </span>
            </span>
          </Link>
        );
      })}
    </React.Fragment>
  );
}

export default Article;
