import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./Post.css";
import Comment from "./Block/Comment";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Aside from "./Block/Aside";

import avatar from "./Img/avatar.png";

function Post() {
  var [post, setPost] = useState([]);
  const match = useRouteMatch();
  useEffect(() => {
    function fetchData() {
      fetch(`http://192.168.194.32:8000/api/v1/posts/${match.params.postId}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPost([jsonData.data]);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.postId]);

  const [isLiked, setIsLiked] = useState(false); // 初始状态为未点赞
  const [isFavorited, setIsFavorited] = useState(false); // 初始状态为未收藏

  function toggleLike() {
    setIsLiked((prevState) => !prevState);
  }

  function toggleFavorite() {
    setIsFavorited((prevState) => !prevState);
  }

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        {post.map((post) => {
          return (
            <div className="postContainer" key={post.postId}>
              <div className="postUseinfo">
                <div className="postUsepic">
                  <img className="userHead" src={avatar} />
                </div>
                <div className="postUsertime">
                  <span>
                    {post.memName} {post.postTime}
                  </span>
                </div>
              </div>
              <div className="postArticle">
                <div className="postArticletitle">
                  <h2>{post.title}</h2>
                </div>
                <div className="postArticletext">
                  <p>{post.content}</p>
                  <img src={post.imgUrl} />
                </div>
              </div>
              <hr />
              <div className="postInteractive">
                <button
                  onClick={toggleLike}
                  className={`postCustbutton ${isLiked ? "active" : ""}`}
                >
                  <i className="material-icons">thumb_up</i>
                </button>
                <span>{post.thumb}</span>
                <button
                  onClick={toggleFavorite}
                  className={`postCustbutton ${isFavorited ? "active" : ""}`}
                >
                  <i className="material-icons">star</i>
                </button>
                <span>{post.save}</span>
              </div>
            </div>
          );
        })}
        <div className="postComment">
          <Comment />
        </div>
      </article>
      <Aside />
      <Footer />
    </div>
  );
}

export default Post;
