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
  // 以下這段為後端連結get-fetch
  // var [post, setPost] = useState([]);
  // const match = useRouteMatch();
  // useEffect(() => {
  //   function fetchData() {
  //     fetch(`http://192.168.194.32:8000/api/v1/posts/${match.params.postId}`, {
  //       method: "GET",
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((jsonData) => {
  //         setPost([jsonData.data]);
  //       })
  //       .catch((err) => {
  //         console.log("錯誤:", err);
  //       });
  //   }
  //   fetchData();
  // }, [match.params.postId]);

  const [post, setPost] = useState({
    //假的的數據傳入
    memName: "用戶的名字david",
    postTime: "發布時間20230917",
    title: "貼文標題:新手小白看這篇就夠‼️最好用的全臉開架彩妝大補帖，開架面膜百科全書",
    content:
      "内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色,個人覺得推開後喝水也不會沾杯,溫馨提醒：用前要做好唇部保養 因為是霧面唇彩喔内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色,個人覺得推開後喝水也不會沾杯,溫馨提醒：用前要做好唇部保養 因為是霧面唇彩喔内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色,個人覺得推開後喝水也不會沾杯,溫馨提醒：用前要做好唇部保養 因為是霧面唇彩喔内容這隻就是血統純正的茶棕色煙燻高冷又散發知性穩重的感覺粉霧感的質地也很搭最近流行的輕泰妝,上唇是奶霜順滑的質地而且不容易掉色,個人覺得推開後喝水也不會沾杯,溫馨提醒：用前要做好唇部保養 因為是霧面唇彩喔",
    imgUrl: "https://img95.699pic.com/photo/50046/0008.jpg_wh300.jpg",
    thumb: 20,
    save: 30,
  });

  const [isLiked, setIsLiked] = useState(false); // 初始状态为未点赞
  const [isFavorited, setIsFavorited] = useState(false); // 初始状态为未收藏

  // 点赞按钮点击事件处理函数
  const toggleLike = () => {
    setIsLiked(!isLiked);
    // setIsFavorited(false);
    setPost((prevPost) => ({
      ...prevPost,
      thumb: isLiked ? prevPost.thumb - 1 : prevPost.thumb + 1,
    }));
  };
  // 收藏按钮点击事件处理函数
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // setIsLiked(false);
    setPost((prevPost) => ({
      ...prevPost,
      save: isFavorited ? prevPost.save - 1 : prevPost.save + 1,
    }));
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        {/* {post.map((post) => {
          return ( */}
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
          <div className="postAll">
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
              <i className="material-icons">favorite</i>
            </button>
            <span>{post.save}</span>
          </div>
          <div className="postComment">
            <Comment />
          </div>
          </div>
        </div>
        {/* );
        })} */}
      </article>
      <Aside />
      <Footer />
    </div>
  );
}

export default Post;
