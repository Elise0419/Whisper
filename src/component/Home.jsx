import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./CSS/Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Article from "./Block/Article";
import Section from "./Block/Section";

import user from "./Img/dog.jpeg";
import redArrow from "./Img/redArrow.png";

function Home() {
  let [pop, setPop] = useState([]);
  let [like, setLike] = useState([]);
  // let [key, setKey] = useState({});

  useEffect(() => {
    function fetchData() {
      fetch("http://10.10.247.43:8000/api/topPosts/1", {
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
      fetch("http://10.10.247.43:8000/api/topPosts/2", {
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

  let [s, setS] = useState("");
  let [data, setData] = useState([]);
  function searchI() {
    var a = document.getElementById("search").value;
    setS(a);
  }
  function searchB() {
    fetch(`http://10.10.247.43:8000/api/posts/search?query=${s}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  }

  return (
    <div id="container">
      <Header />
      <section>
        <Section />
      </section>
      <article>
        <div className="search">
          <img src={user} />
          <input
            id="search"
            type="text"
            placeholder="熱門貼文搜尋"
            onChange={searchI}
          />
          <button onClick={searchB}>Search</button>
        </div>
        <Article search={data} />
      </article>
      <aside>
        <div className="aside">
          <p>流行貼文排行榜</p>
          {pop.map((pop) => {
            return (
              <Link to={`/post/${pop.postId}`} key={pop.postId}>
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
              <Link to={`/post/${like.postId}`} key={like.postId}>
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

export default Home;
