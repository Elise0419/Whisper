//import React, { useState } from "react";
import "./CSS/Manage.css";

// 引入tab組件
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector.tsx";

import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";
// 發布貼文組件
import Postart from "./Postart";
// 收藏貼文組件
import Collectart from "./Collectart";
import heart from "./img/heart.png";

function Manage() {
  const [selectedTab, setSelectedTab] = useTabs([
    "postArticle",
    "collectArticle",
    "replyMessage",
  ]);

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="manageContainer">
          <div className="manageTitle">
            <nav>
              <TabSelector
                className="manageTab"
                isActive={selectedTab === "postArticle"}
                onClick={() => setSelectedTab("postArticle")}
              >
                發布貼文
              </TabSelector>
              <TabSelector
                className="manageTab"
                isActive={selectedTab === "collectArticle"}
                onClick={() => setSelectedTab("collectArticle")}
              >
                收藏貼文 &nbsp;
                <img src={heart} className="saveImg" />
              </TabSelector>
            </nav>
          </div>
          {/* 發布貼文內容 */}
          <div className="Article">
            <TabPanel hidden={selectedTab !== "postArticle"}>
              <div className="manageCount">
                <p>全部稿件2</p>
              </div>
              <Postart />
              <Postart />
            </TabPanel>
            <div>
              {/* 收藏貼文內容 */}
              <TabPanel hidden={selectedTab !== "collectArticle"}>
                <div className="manageCount">
                  <p>全部稿件6</p>
                </div>
                <Collectart />

                <Collectart />
                <Collectart />
                <Collectart />
                <Collectart />

                <Collectart />
              </TabPanel>
            </div>
          </div>
        </div>
      </article>

      <aside>
        {/* 側邊欄內容 */}
        <Asideuser />
      </aside>
      <Footer />
    </div>
  );
}

export default Manage;
