import React, { Component } from "react";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

import user from "./img/dog.jpeg";
import user2 from "./img/cat.jpg";
import makeup from "./img/makeup.jpg";
import like from "./img/like.png";
import comment from "./img/comment.png";
import redArrow from "./img/redArrow.png";
import lip from "./img/lip.jpg";
import love from "./img/love.jpg";
import dress from "./img/dress.jpg";
import cake from "./img/cake.jpg";
import yoga from "./img/yoga.jpg";

function Love() {
  var [ad, setAd] = useState([]);
  var [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("http://10.10.247.43:8000/api/v1/ads", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setAd(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

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
    <div id="container">
      <Header />
      <section>
        <div className="topicTitle">
          <p>推薦的個人論壇</p>
          <a>
            <img className="topicImg" src={lip} />
            <p className="topicList">美妝保養</p>
            {/* <p>各種美妝技巧貼文</p> */}
            <img className="topicArrow" src={redArrow} />
          </a>
          <a>
            <img className="topicImg" src={cake} />
            <p className="topicList">美食情報</p>
            {/* <p>好食物好味道</p> */}
            <img className="topicArrow" src={redArrow} />
          </a>
          <a>
            <img className="topicImg" src={yoga} />
            <p className="topicList">健康生活</p>
            {/* <p>綠色出行綠色生活</p> */}
            <img className="topicArrow" src={redArrow} />
          </a>
          <a>
            <img className="topicImg" src={dress} />
            <p className="topicList">時尚穿搭</p>
            {/* <p>fashion前言趨勢</p> */}
            <img className="topicArrow" src={redArrow} />
          </a>
          <a>
            <img className="topicImg" src={love} />
            <p className="topicList">感情生活</p>
            {/* <p>各種抱怨聚集地</p> */}
            <img className="topicArrow" src={redArrow} />
          </a>
        </div>
      </section>
      <article>
        <div className="search">
          <img src={user} alt="" />
          <input
            type="text"
            placeholder="Let’s share what going on your mind..."
          />
          <button>創建貼文</button>
        </div>

        {post.map((post) => {
          return (
            <a className="card" href="">
              <img className="cardImg" src={makeup} alt="" />
              <span className="cardMid">
                <img src={user2} />
                <span className="cardTitle">{post.title}</span>
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
            </a>
          );
        })}

        {post.map((post) => {
          return (
            <a className="card" href="">
              <span className="cardTxt">
                <span className="paperTape">paperTapepaperTape</span>
                <br />
                從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
            </a>
          );
        })}

        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
        <a className="card" href="">
          <img className="cardImg" src={makeup} alt="" />
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
        </a>
        <a className="card" href="">
          <span className="cardTxt">
            <span className="paperTape">paperTapepaperTape</span>
            <br />
            從英國有機農場清晨手摘，精心萃取大馬士革玫瑰、保加利亞白薔薇、古典玫瑰、英格蘭玫瑰等超過20種頂級玫瑰品種，再進行萃取精華成分，千葉玫瑰具有緊緻舒緩養膚實力，能使肌膚柔嫩細緻、散發健康光澤，並提升保濕度。
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
        </a>
      </article>
      <aside>
        <div className="rankTitle">
          <p>流行貼文排行榜</p>
          <a href="">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
        </div>
        <div className="rankTitle">
          <p>點贊貼文排行榜</p>
          <a href="">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
          <a href="">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </a>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Love;
