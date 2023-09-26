import React, { useEffect, useState } from "react";
import $ from "jquery"; // Import jQuery
import Header from "./Block/Header";
import Footer from "./Block/Footer";

import "./CSS/Secret.css";
import pen from "./img/pen.png";

function Secreat() {
  // 彈出寫秘密視窗
  let [write, setWrite] = useState(false);
  let [choose, setChoose] = useState(false);
  let [read, setRead] = useState(false);
  let [gate, setGate] = useState(false);

  function openWrite() {
    setWrite(true);
  }

  // 關閉彈出視窗按鈕
  function closeWrite() {
    setWrite(false);
  }

  function openChoose() {
    if (gate) {
      setChoose(true);
    } else {
      alert("抽秘密前 請先寫下妳的秘密");
    }
  }

  function closeChoose(e) {
    console.log(e.target.className);
    if (e.target.className) {
      setChoose(false);
      setRead(true);
    } else {
      setChoose(false);
    }
  }

  function closeRead() {
    setRead(false);
    setGate(false);
  }

  function greenBtn() {
    setTimeout(() => {
      setWrite(false);
      setGate(true);
    }, 2000);
  }

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
      <div className="perspective">
        <div className="tardis-wrap">
          <div className="tardis">
            <div className="side">
              <div className="top-sign">
                <div className="text">
                  <span className="left">Secret</span>
                  <span className="tiny">Tree Hole</span>
                  <span className="right">BOX</span>
                </div>
              </div>
              <div className="door-frame">
                <div className="door door-left">
                  <div className="window">
                    <div className="pane a"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="side">
              <div className="top-sign">
                <div className="text">
                  <span className="left">Secret</span>
                  <span className="tiny">Tree Hole</span>
                  <span className="right">BOX</span>
                </div>
              </div>
              <div className="door-frame">
                <div className="door door-left">
                  <div className="window">
                    <div className="pane a"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="side">
              <div className="top-sign">
                <div className="text">
                  <span className="left">Secret</span>
                  <span className="tiny">Tree Hole</span>
                  <span className="right">BOX</span>
                </div>
              </div>
              <div className="door-frame">
                <div className="door door-left">
                  <div className="window">
                    <div className="pane a"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="side">
              <div className="top-sign">
                <div className="text">
                  <span className="left">Secret</span>
                  <span className="tiny">Tree Hole</span>
                  <span className="right">BOX</span>
                </div>
              </div>
              <div className="door-frame">
                <div className="door door-left">
                  <div className="window">
                    <div className="pane a"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="floor">
              <div className="floor-panel a"></div>
              <div className="floor-panel b"></div>
              <div className="floor-panel c"></div>
              <div className="floor-panel d"></div>
              <div className="floor-lid"></div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={gate ? "chooseBtn" : "chooseBtnF chooseBtn"}
        onClick={openChoose}
        type="button"
      >
        <span>whisper</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
      <img src={pen} className="pen" onClick={openWrite} />
      {write && (
        <form className="popWrite">
          <div className="writeClose" onClick={closeWrite}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
            <label>close</label>
          </div>
          <h2>最受不了婆婆的哪些舉動！</h2>
          <textarea
            className="writeSecrat"
            rows="5"
            cols="50"
            name=""
            id=""
            placeholder="tell me something..."
          ></textarea>
          <textarea
            className="writeQuestion"
            rows="5"
            cols="1"
            name=""
            id=""
            placeholder="What truth do you want to hear?..."
          />
          <button type="reset" class="green" onClick={greenBtn}>
            <span>send</span>
            <img
              src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png"
              height="62"
              width="62"
            />
          </button>
        </form>
      )}
      {choose && (
        <div className="popChoose" onClick={closeChoose}>
          <div>
            <div to="/secret2" class="letter-image" id="letter">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>你從來沒有告訴過任何人的秘密是什麼？</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
            <div to="/secret2" class="letter-image">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>你有沒有假裝喜歡你收到的禮物？</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
          </div>
          <div>
            <div class="letter-image">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>你去過廁所最奇怪的地方在哪裡？</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
            <div class="letter-image">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>說出一個你後悔接吻的人。</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
          </div>
          <div>
            <div class="letter-image">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>你有沒有說過“我愛你”，但不是真的？ 給誰</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
            <div class="letter-image">
              <div class="animated-mail">
                <div class="back-fold"></div>
                <div class="letter">
                  <div class="letter-border">
                    <p>你發過裸照嗎？</p>
                  </div>
                  <div class="letter-title"></div>
                  <div class="letter-context"></div>
                  <div class="letter-stamp">
                    <div class="letter-stamp-inner"></div>
                  </div>
                </div>
                <div class="top-fold"></div>
                <div class="body"></div>
                <div class="left-fold"></div>
              </div>
              <div class="shadow"></div>
            </div>
          </div>
        </div>
      )}
      {/* {read && (
        <div>
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
              <span className="readClose" onClick={closeRead}>
                X
              </span>

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
      )} */}
      <aside className="pushDown"></aside>
      <Footer />
    </div>
  );
}

export default Secreat;
