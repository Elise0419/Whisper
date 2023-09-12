import React, { useState } from "react";
import "./Post.css";

import Comment from "./Block/Comment";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Aside from "./Block/Aside";

import avatar from "./img/avatar.png";

function Post() {
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
        {/* post詳情頁面 */}
        <div className="postContainer">
          {/* 發布者info */}
          <div className="postUseinfo">
            <div className="postUsepic">
              <img className="userHead" src={avatar} alt="" />
            </div>
            <div className="postUsertime">
              <span>發布者:David.one.2023.8.15.16:00pm</span>
            </div>
          </div>
          {/* 文章內容 */}
          <div className="postArticle">
            <div className="postArticletitle">
              <h2>
                標題:
                8個新手實用化妝技巧詳解!遮瑕零色差＆不卡紋用法，光澤無瑕底妝、微笑唇這樣畫
              </h2>
            </div>
            <div className="postArticletext">
              <h3>小標題: 化妝技巧1: 精選美妝蛋材質</h3>
              <p>
                如果你是花貓臉單、肌膚瑕疵很多毛孔又大，我們要慎選美妝蛋的材質。海綿材質的美妝蛋妝感薄透自然，但遮瑕力不足；絨毛面的美妝蛋是瑕疵肌膚的救星！因為絨毛不容易吃粉，所以能有效提高妝面的遮瑕度，還可以針對毛孔進行填補，呈現出來的妝感屬於光澤無瑕。
              </p>
              <img
                src="https://imgs.gvm.com.tw/upload/gallery/20201209/75813_01.jpg"
                alt=""
              />
              <h3>化妝技巧2:上粉底同時創建眼部輪廓</h3>
              <p>
                這個技巧特別適合眼睛容易浮腫的人。一般來說，我們上妝同時也會幫眼窩肌膚、眼皮拍上粉底，但此做法很容易讓眼周輪廓減弱，甚至產生積線問題。（眼周上粉底：適合想畫全妝，或是想畫完整眼妝）
                因此如果只是淡妝，甚至不打算畫眼影的女孩，我們在上底妝時可以「避開眼皮區域（眼窩）」這樣就算不畫眼影，也會有一個極自然的眼部輪廓。後續再畫上眼線與睫毛膏，清新感的日常妝就完成囉！
              </p>
            </div>
          </div>
          <hr />
          {/* 文章的點贊和收藏 */}
          <div className="postInteractive">
            <button
              onClick={toggleLike}
              className={`postCustbutton ${isLiked ? "active" : ""}`}
            >
              <i className="material-icons">thumb_up</i>
            </button>
            <span>点赞</span>
            <button
              onClick={toggleFavorite}
              className={`postCustbutton ${isFavorited ? "active" : ""}`}
            >
              <i className="material-icons">star</i>
            </button>
            <span>收藏</span>
          </div>
        </div>
        {/* 評論區域 */}
        <div className="postComment">
          {/* comment組件，傳遞 state 數據 */}
          <Comment />
        </div>
      </article>
      <Aside />
      <Footer />
    </div>
  );
}

export default Post;
