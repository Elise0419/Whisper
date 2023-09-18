import React from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./Theme.css";
import Header from "./Block/Header.jsx";
import Aside from "./Block/Aside";
import Article from "./Block/Article";
import Section from "./Block/Section";

import user from "./Img/dog.jpeg";
import adArrow from "./Img/adArrow.png";

function Makeup() {
  var [ad, setAd] = useState([]);
  const match = useRouteMatch();

  useEffect(() => {
    function fetchData() {
      fetch(
        `http://10.10.247.43:8000/api/v1/ads?type[eq]=${match.params.type}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setAd(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, [match.params.type]);

  return (
    <div id="container">
      <Header />
      <section>
        <Section />
        <div className="section">
          {ad.map((ad) => {
            return (
              <a key={ad.id} href={ad.webUrl}>
                <img
                  className="adPic"
                  src={ad.imgUrl}
                  referrerPolicy="no-referrer"
                />
                <p className="adLook">
                  查看更多
                  <img src={adArrow} />
                </p>
              </a>
            );
          })}
        </div>
      </section>
      <article>
        <div className="search">
          <img src={user} alt="" />
          <input type="text" placeholder="熱門貼文搜尋" />
          <button>Search</button>
        </div>
        <Article />
      </article>
      <Aside />
      <footer>© 2023</footer>
    </div>
  );
}

export default Makeup;
