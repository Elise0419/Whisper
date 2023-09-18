import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Article from "./Block/Article";
import Section from "./Block/Section";

import user from "./Img/dog.jpeg";
import redArrow from "./Img/redArrow.png";

function Love() {
  let [pop, setPop] = useState([]);
  let [like, setLike] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch("http://192.168.1.3:8000/api/topPosts/1", {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPop(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
      fetch("http://192.168.1.3:8000/api/topPosts/2", {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setLike(jsonData.data);
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
        <Section />
      </section>
      <article>
        <div className="search">
          <img src={user} alt="" />
          <input type="text" placeholder="熱門貼文搜尋" />
          <button>Search</button>
        </div>
        <Article />
      </article>
      <aside>
        <div className="aside">
          <p>流行貼文排行榜</p>
          {pop.map((pop) => {
            return (
              <Link to="/post" key={pop.postId}>
                <img className="rankNum" src={pop.headImg} />
                <p className="rankList">{pop.title}</p>
                <img className="rankArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
        <div className="aside">
          <p>點贊貼文排行榜</p>
          {like.map((like) => {
            return (
              <Link to="/post" key={like.postId}>
                <img className="rankNum" src={like.headImg} />
                <p className="rankList">{like.title}</p>
                <img className="rankArrow" src={redArrow} />
              </Link>
            );
          })}
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Love;
