//import React, { useState } from "react";
import "./Manage.css";

// 引入tab組件
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector.tsx";

import Header from "./Block/Header";
import Footer from "./Block/Footer";

import user from "./Img/dog.jpeg";

function Manage() {
  const [selectedTab, setSelectedTab] = useTabs([
    "postArticle",
    "ccollectArticle",
    "replyMessage"
  ]);

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="manageContainer">
          <div className="manageTitle">
            <nav className="flex border-b border-gray-300">
              <TabSelector
                isActive={selectedTab === "postArticle"}
                onClick={() => setSelectedTab("postArticle")}
              >
                發布貼文
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "ccollectArticle"}
                onClick={() => setSelectedTab("ccollectArticle")}
              >
                收藏貼文
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "replyMessage"}
                onClick={() => setSelectedTab("replyMessage")}
              >
                留言回覆
              </TabSelector>
            
            </nav>
          </div>
          <div>
            <TabPanel hidden={selectedTab !== "postArticle"}>
              <div className="manageCount">
                <p>全部稿件16</p>
              </div>
              <div className="manageEdit">
                <div className="manageContent">
                  <img
                    src="https://imgs.gvm.com.tw/upload/gallery/20201209/75813_01.jpg"
                    alt=""
                  />
                  <div className="manageText">
                    <p className="managePost">貼文名字：給予正想踏進美妝美妝</p>
                    <p className="managePoster">
                      David.one.發布者.2023.8.15.16:00pm
                    </p>

                    <div className="manageInteractions">
                      <span>
                        <i className="material-icons">thumb_up</i>{" "}
                        {/* 點讚 icon */}
                        <span>12</span> {/* 顯示讚數 */}
                      </span>
                      <span>
                        <i className="material-icons">star</i> {/* 收藏 icon */}
                        <span>8</span> {/* 顯示收藏數 */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="manageBtn">
                  <button className="editBtn">編輯</button>
                  <button className="deleteBtn">刪除</button>
                </div>
              </div>
              <hr />
            </TabPanel>
            <TabPanel hidden={selectedTab !== "company"}>Company</TabPanel>
            <TabPanel hidden={selectedTab !== "team"}>Team Members</TabPanel>
            <TabPanel hidden={selectedTab !== "billing"}>Billing</TabPanel>
          </div>
        </div>
      </article>
      <aside>
        {/* 側邊欄內容 */}
        <div className="userAside">
          <img className="userImg" src={user} alt="" />
          <h3>David.one</h3>
          <hr />
          <span>致力於打造美好生活</span>
          <p>創建時間:2023-08-01</p>
          <div className="postNumber">
            <span>03</span>
            <span>當前貼文數量</span>
          </div>
          <button className="creatPost">創建貼文</button>
        </div>
      </aside>
      <Footer />
    </div>
  );
}

export default Manage;
