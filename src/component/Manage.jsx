//import React, { useState } from "react";
import "./Manage.css";

// 引入tab組件
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector.tsx";

import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";
import Postart from "./Block/Postart";

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
                收藏貼文
              </TabSelector>
            </nav>
          </div>
          {/* 發布貼文內容 */}
          <TabPanel hidden={selectedTab !== "postArticle"}>
          <Postart />
          </TabPanel>
          <div>
            {/* 收藏貼文內容 */}
            <TabPanel hidden={selectedTab !== "collectArticle"}>
              <div>收藏貼文</div>{" "}
            </TabPanel>
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
