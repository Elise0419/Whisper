import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import user2 from "../Img/cat.jpg";
import like from "../Img/like.png";
import comment from "../Img/comment.png";

function Article() {
  var [post, setPost] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch("http://10.10.247.43:8000/api/v1/posts", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPost(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {post.map((post) => {
        return (
          <Link className="card" to={`/post/${post.postId}`} key={post.postId}>
            {console.log(post)}
            <span className="cardTop">
              {typeof post.imgUrl === "string" ? (
                <img className="cardImg" src={post.imgUrl} />
              ) : (
                <span className="cardTxt">
                  <span className="paperTape">paperTapepaperTape</span>
                  <br />
                  {post.content}
                </span>
              )}
            </span>
            <span className="cardMid">
              <img src={user2} />
              <span key={post.postId} className="cardTitle">
                {post.title}
              </span>
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
