import React, { Component } from "react";

import Header from "./Block/Header";
import Footer from "./Block/Footer";
import love from "./img/love4.png";

import Secret from "./CSS/Secret.css";

function Secreat() {
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
      <button className="secretBtn">lucky draw</button>
      <Footer />
    </div>
  );
}

export default Secreat;
