import React, { Component } from "react";
import { useEffect, useState } from "react";

import "./Theme.css";
import Header from "../Header.jsx";
import Aside from "../Aside.jsx";

import user from "../img/dog.jpeg";
import user2 from "../img/cat.jpg";
import makeup from "../img/makeup.jpg";
import like from "../img/like.png";
import comment from "../img/comment.png";
import ad1 from "../img/ad1.jpg";
import adArrow from "../img/adArrow.png";

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
        <div className="section">
          {ad.map((ad) => {
            return (
              <a key={ad.id}>
                <img className="adPic" src={ad.imgUrl} />
                <p className="adLook">
                  查看更多
                  <img src={adArrow} />
                </p>
              </a>
            );
          })}
          {/* 測試 */}
          <a>
            <img className="adPic" src={ad1} />
            <p className="adLook">
              查看更多
              <img src={adArrow} />
            </p>
          </a>
          <a>
            <img className="adPic" src={ad1} />
            <p className="adLook">
              查看更多
              <img src={adArrow} />
            </p>
          </a>
          <a>
            <img className="adPic" src={ad1} />
            <p className="adLook">
              查看更多
              <img src={adArrow} />
            </p>
          </a>
          {/* 測試 */}
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
      </article>
      <Aside />
      <footer>© 2023</footer>
    </div>
  );
}

export default Love;
