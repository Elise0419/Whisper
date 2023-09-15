import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Article from "./Block/Article";
import Section from "./Block/Section";

import user from "./Img/dog.jpeg";
import redArrow from "./Img/redArrow.png";

function Love() {
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
          <Link to="/post">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
        </div>
        <div className="aside">
          <p>點贊貼文排行榜</p>
          <Link to="/post">
            <p className="rankNum">No.1</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.2</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.3</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.4</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
          <Link to="/post">
            <p className="rankNum">No.5</p>
            <p className="rankList">飛柔清爽修護瞬效柔...</p>
            <img className="rankArrow" src={redArrow} />
          </Link>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Love;
