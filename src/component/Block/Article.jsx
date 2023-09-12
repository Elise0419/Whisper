import React, { Component } from "react";
import { Link } from "react-router-dom";

import user2 from "../Img/cat.jpg";
import makeup from "../Img/makeup.jpg";
import like from "../Img/like.png";
import comment from "../Img/comment.png";

function Article() {
  return (
    <Link className="card" to="/post">
      <span className="cardTop">
        {/* <img className="cardImg" src={makeup} alt="" /> */}
        <span className="cardTxt">
          <span className="paperTape">paperTapepaperTape</span>
          <br />
          從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
        </span>
      </span>
      <span className="cardMid">
        <img src={user2} />
        <span className="cardTitle">狗狗貓貓護膚牌真的很好用</span>
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
}

export default Article;
