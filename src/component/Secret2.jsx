import React, { useEffect, useState } from "react";
import $ from "jquery"; // Import jQuery
import { Link } from "react-router-dom";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import "./CSS/Secret.css";

function Secret2() {
  let [read, setRead] = useState(false);
  useEffect(() => {
    $(window).scroll(function (e) {
      parallaxScroll();
    });

    function parallaxScroll() {
      var scrolled = $(window).scrollTop();
      $(".y1").css({
        transform: "translate3d(0," + scrolled * -0.15 + "px, 0)",
      });
      $(".y2").css({
        transform: "translate3d(0," + scrolled * -0.25 + "px, 0)",
      });
      $(".y3").css({
        transform: "translate3d(0," + scrolled * -0.3 + "px, 0)",
      });
      $(".y4").css({
        transform: "translate3d(0," + scrolled * -0.4 + "px, 0)",
      });
      $(".y5").css({
        transform: "translate3d(0," + scrolled * -0.5 + "px, 0)",
      });
      $(".y6").css({
        transform: "translate3d(0," + scrolled * -0.6 + "px, 0)",
      });
    }
  }, []);
  return (
    <div>
      <Header />
      <div>
        <p className="scroll">(Please scroll down)</p>
        <section class="wrapper">
          <span class="scroll-text">
            <span class="fl y3">S</span>
            <span class="fl y1">e</span>
            <span class="fl y4">c</span>
            <span class="fl y2">r</span>
            <span class="fl y4">e</span>
            <span class="fl y3">t&nbsp;</span>
            <span class="fl y5">t</span>
            <span class="fl y2">r</span>
            <span class="fl y4">e</span>
            <span class="fl y6">e&nbsp;</span>
            <span class="fl y1">h</span>
            <span class="fl y4">o</span>
            <span class="fl y2">l</span>
            <span class="fl y5">e</span>
            <span class="fl y2">~</span>
            <span class="fl y3">~</span>
          </span>
        </section>
        <div className="popRead">
          <div>
            <Link to="/secret">
              <span className="readClose">X</span>
            </Link>

            <h2>你從來沒有告訴過任何人的秘密是什麼？</h2>

            <pre>我發現我老公外遇了。我不想離婚。</pre>
            <p>
              我老公外遇了，我很痛苦，完全沒辦法原諒。
              事情爆光之前，我覺得我們是幸福的，有一個孩子，生活平靜簡單。
              但現在發生的事情就好像，把這個美夢打醒了，我不想離婚。
              覺得應該要給小孩一個完整的家，所以我們目前是假面夫妻的模式。
            </p>
            <p>
              他不是一個好丈夫，但的確是一個孩子眼中的好爸爸。
              他不是豬隊友，他會幫忙分擔家計以及照顧小孩跟做家務事。
              但他不認錯也不承認他有外遇，可能是怕我錄音（我現在沒證據，不要問我怎麼知道的）。
            </p>
          </div>
        </div>
      </div>
      <aside className="pushDown"></aside>
      <Footer />
    </div>
  );
}

export default Secret2;
