import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Theme.css";
import Header from "../Block/Header.jsx";
import Aside from "../Block/Aside.jsx";
import Article from "../Block/Article";

import user from "../Img/dog.jpeg";
import ad1 from "../Img/ad1.jpg";
import adArrow from "../Img/adArrow.png";

function Food() {
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
          <input type="text" placeholder="熱門貼搜尋" />
          <button>Search</button>
        </div>

        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </article>
      <Aside />
      <footer>© 2023</footer>
    </div>
  );
}

export default Food;
