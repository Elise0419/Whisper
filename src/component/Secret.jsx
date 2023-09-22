import React, { useState } from "react";

import Header from "./Block/Header";
import Footer from "./Block/Footer";

import "./CSS/Secret.css";
import pen from "./img/pen.png";

function Secreat() {
  // 彈出寫秘密視窗
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handlePenClick = () => {
    setPopupOpen(true);
  };

  // 關閉彈出視窗按鈕
  function closeBtn() {
    setPopupOpen(false);
  }

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
      <a
        // href="javascript: void(0)"
        class="secretBtn"
      >
        <span>Button</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </a>
      <img src={pen} className="pen" onClick={handlePenClick} />
      {isPopupOpen && (
        <form className="popup">
          <div class="close-container" onClick={closeBtn}>
            <div class="leftright"></div>
            <div class="rightleft"></div>
            <label class="close">close</label>
          </div>
          <h2>最受不了婆婆的哪些舉動！</h2>
          <textarea
            className="userSecrat"
            rows="5"
            cols="50"
            name=""
            id=""
            placeholder="tell me something..."
          ></textarea>
          <textarea
            className="askQuestions"
            rows="5"
            cols="1"
            name=""
            id=""
            placeholder="What truth do you want to hear?..."
          />
        </form>
      )}
      <button className="sendSecret">send</button>
      <Footer />
    </div>
  );
}

export default Secreat;
