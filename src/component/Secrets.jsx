import React, { useEffect, useState } from "react";
import $ from "jquery"; // Import jQuery
import { Link } from "react-router-dom";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import "./CSS/Secret.css";
import "./CSS/Secrets.css";

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
          <div className="smoke">
            <Link to="/secret">
              <p className="readClose">X</p>
            </Link>
            <h2>
              <span>你從來沒有</span>
              <span>告訴過</span>
              <span>任何人的</span>
              <span>秘密</span>
              <span>是什麼？</span>
            </h2>
            <pre>
              <span>我發現我老公外遇了。</span>
              <span>我不想離婚。</span>
            </pre>
            <p>
              <span>我老公外遇了，</span>
              <span>我很痛苦，</span>
              <span>完全沒辦法原諒。</span>
              <span>事情爆光之前，</span>
              <span>我覺得我們是幸福的，</span>
              <span>有一個孩子，生活平靜簡單。</span>
              <span>但現在發生的事情就好像，</span>
              <span>把這個美夢打醒了，我不想離婚。</span>
              <span>覺得應該要給小孩一個完整的家，</span>
              <span>所以我們目前是假面夫妻的模式。</span>
            </p>
            <p>
              <span>他不是一個好丈夫，</span>
              <span>但的確是一個孩子眼中的好爸爸。</span>
              <span>他不是豬隊友，</span>
              <span>他會幫忙分擔家計以及照顧小孩跟做家務事。</span>
              <span>但他不認錯也不承認他有外遇，</span>
              <span>可能是怕我錄音（我現在沒證據，不要問我怎麼知道的）。</span>
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
