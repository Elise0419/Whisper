import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
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

  const history = useHistory();
  function closeChoose(e) {
    if (e.target.className != "popChoose") {
      history.push("/secrets");
    } else {
      setChoose(false);
    }
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
          <button type="reset" className="green" onClick={greenBtn}>
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
            <div className="letter-image" id="letter">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>你從來沒有告訴過任何人的秘密是什麼？</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>你有沒有假裝喜歡你收到的禮物？</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
          </div>
          <div>
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>你去過廁所最奇怪的地方在哪裡？</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>說出一個你後悔接吻的人。</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
          </div>
          <div>
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>你有沒有說過“我愛你”，但不是真的？ 給誰</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border">
                    <p>你發過裸照嗎？</p>
                  </div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Secreat;
