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

  let [searchInput, setSearchInput] = useState("");
  let [searchQuery, setSearchQuery] = useState({});
  function sI() {
    var s = document.getElementById("sI").value;
    setSearchInput(s);
  }
  function sB() {
    if (searchInput == "") {
    } else {
      fetch(`http://10.10.247.43:8000/api/posts/search?query=${searchInput}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          if (jsonData.message == "Post not found!") {
            setSearchQuery({ message: `無法搜尋到 ${searchInput} 相關貼文` });
          } else {
            setSearchQuery(jsonData);
          }
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
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
          <input id="sI" type="text" placeholder="熱門貼文搜尋" onChange={sI} />
          <button onClick={sB}>Search</button>
        </div>
        <Article searchQuery={searchQuery} />
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
