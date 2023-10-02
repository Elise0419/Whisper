import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import "./CSS/Home.css";
import { useUserContext } from "../store/UserContext";

import thumb from "./img/thumb.png";
import redArrow from "./img/redArrow.png";
import comment from "./img/comment.png";
import aroma from "./img/aroma.png";
import dress from "./img/dress.png";
import makeup from "./img/makeup.png";
import cake from "./img/cake.png";
import rose from "./img/rose.png";
import rabbit from "./img/rabbit.png";
import ice from "./img/ice.png";

function Home() {
  const m = useRouteMatch().params;
  const token = localStorage.getItem("token");

  let [loading, setLoading] = useState(true);
  let [totalPage, setTotalPage] = useState({});

  let [topic, setTopic] = useState([
    {
      img: makeup,
      list: "美妝保養",
      describe: "各種美妝技巧貼文",
      route: "/mkup/1",
    },
    { img: cake, list: "美食情報", describe: "好食物好味道", route: "/food/1" },
    {
      img: aroma,
      list: "健康生活",
      describe: "綠色出行綠色生活",
      route: "/life/1",
    },
    {
      img: dress,
      list: "時尚穿搭",
      describe: "fashion前言趨勢",
      route: "/fashion/1",
    },
    {
      img: rose,
      list: "感情生活",
      describe: "各種抱怨聚集地",
      route: "/love/1",
    },
  ]);
  let [card, setCard] = useState([]);
  let [pop, setPop] = useState([]);
  let [like, setLike] = useState([]);

  let [user, setUser, login, setLogin] = useUserContext();
  let [searchVal, setSearchVal] = useState(""); // search bar input value
  let [searchMsg, setSearchMsg] = useState({}); // 宜珊的 response;
  let [find, setFind] = useState(false); // 無搜尋結果
  const { page } = useParams();

  // 貼文渲染 & 主頁右側欄
  useEffect(() => {
    function fetchData() {
      // 所有貼文
      fetch(`http://127.0.0.1:8000/api/v1/posts/page/${m.page}`)
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData.post.data);
          setCard(jsonData.post.data);
          setTotalPage(jsonData.post.last_page);

          if (searchMsg.message) {
            // 沒有搜尋紀錄
            setFind(true);
            setCard([]);
            setTotalPage(0);
          }
          // else {
          // 有搜尋紀錄
          // 改變頁數目錄
          // setTotalPage(Math.ceil(jsonData.data.length / 16));

          // let s = (m.page - 1) * 16;
          // let e = s + 16;
          // jsonData.data = jsonData.data.slice(s, e);

          //   setFind(false);
          //   setCard(
          //     searchMsg.data === undefined ? jsonData.data : searchMsg.data
          //   );
          // }

          setLoading(false);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 流行貼文
      fetch("http://127.0.0.1:8000/api/topPosts/1", {})
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setPop(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 點讚貼文
      fetch("http://127.0.0.1:8000/api/topPosts/2", {})
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setLike(jsonData.data);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });

      // 主頁抓取個人資訊，放置Context
      // fetch("http://127.0.0.1:8000/api/profile", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then((res) => {
      //     if (res.status === 403) {
      //       // throw new Error("API request failed");
      //     } else if (res.status >= 200) {
      //       return res.json();
      //     }
      //   })
      //   .then((jsonData) => {
      //     if (jsonData.error) {

      //     } else {
      //       setLogin(true);
      //       setUser(jsonData.user);
      //     }
      //   })
      //   .catch((err) => {
      //     // console.log("Error:", err);
      //   });
    }
    fetchData();
  }, [m.type, page, login]);

  // 搜尋
  function searchInput() {
    setSearchVal("");
    setSearchVal(document.getElementById("searchBar").value);
  }

  function searchButton() {
    if (searchVal == "") {
    } else {
      fetch(`http://127.0.0.1:8000/api/posts/search?query=${searchVal}`)
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
          if (jsonData.message == "Post not found!") {
            setCard([]);
            setSearchMsg({ message: `無法搜尋到 ${searchVal} 相關貼文` });
            setTotalPage(0);
          } else {
            // setSearchMsg(jsonData);
            // setCard([]);
            setCard(jsonData.pages.data);
            setSearchMsg({});
            setTotalPage(jsonData.pages.last_page);
          }
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
  }

  // 重置 search bar
  function deleteSearch() {
    document.getElementById("searchBar").value = "";
  }

  // 點擊率
  const cardClick = async (postId) => {
    fetch(`http://127.0.0.1:8000/api/posts/click${postId}`, {
      method: "POST",
      postId: `${postId}`,
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  };

  let url;
  return (
    <div>
      {loading ? (
        <div className="load">資料載入中...</div>
      ) : (
        <div id="container">
          <section>
            <div className="topic">
              <p>主題個版</p>
              {topic.map((topic, index) => {
                return (
                  <Link
                    to={`${topic.route}`}
                    key={index}
                    onClick={deleteSearch}
                  >
                    <img className="topicImg" src={topic.img} />
                    <span className="topicList">
                      {topic.list}
                      <br />
                      <span>{topic.describe}</span>
                    </span>
                    <img className="topicArrow" src={redArrow} />
                  </Link>
                );
              })}
            </div>
          </section>
          <article>
            <div className="search">
              <img className="userHead" src={user?.headimg || rabbit} />
              <input
                id="searchBar"
                type="text"
                placeholder="熱門貼文搜尋"
                onChange={searchInput}
              />
              <a className="searchBtn" onClick={searchButton}>
                Search
              </a>
            </div>
            <div className="cardContainer">
              {/* 這邊是當 無搜尋結果 時 */}
              <div
                style={{ display: find ? "block" : "none" }}
                className="find"
              >
                <p>{searchMsg.message}</p>
              </div>

              {Array.isArray(card) ? (
                card.map((card) => {
                  // 將 MySQL 的 HTML 轉成 Text
                  const myContent = document.createElement("div");
                  const myTitle = document.createElement("div");
                  myContent.innerHTML = card.content;
                  myTitle.innerHTML = card.title;
                  // 檢查是否包含 base64 字串 且不得為 null 值
                  // 是則渲染 img 否則渲染 Text
                  const isStringValid =
                    card.content && card.content.includes("base64");

                  // HTML 篩選器 判斷是否含 img 標籤
                  // 是則抓出第一張照片
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(card.content, "text/html");
                  const imgElements = doc.querySelectorAll("img");
                  if (imgElements.length > 0) {
                    const firstImgElement = imgElements[0];
                    url = firstImgElement.getAttribute("src");
                  }

                  return (
                    <Link
                      className="card"
                      to={`/post/${card.post_id}/${card.type}`}
                      key={card.post_id}
                      onClick={() => cardClick(card.post_id)}
                    >
                      <span className="cardTop">
                        {card.imgurl || isStringValid ? (
                          <div>
                            {card.imgurl ? (
                              // 這邊是資料庫 imgUrl 預設貼文的照片處理
                              <img
                                src={card.imgurl}
                                key={`${card.post_id}`}
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              // 這邊是用戶上傳的照片處理
                              <img className="multipleImg" src={url} />
                            )}
                          </div>
                        ) : (
                          <span className="cardTxt">
                            <span className="paperTape">
                              paperTapepaperTape
                            </span>
                            <br />
                            {myContent.textContent}
                          </span>
                        )}
                      </span>
                      <span className="cardMid">
                        <img
                          src={card.users.headimg}
                          alt={`Image ${card.postId}`}
                        />
                        <span>{myTitle.textContent}</span>
                      </span>
                      <span className="cardBtm">
                        <span>#{card.tag}</span>
                        <span>
                          <img src={comment} />
                          {card?.comtxts_count}
                          <img src={thumb} />
                          {card.thumb}
                        </span>
                      </span>
                    </Link>
                  );
                })
              ) : (
                // 這邊是單篇 card 處理
                <></>
              )}
            </div>
          </article>
          <aside>
            <div className="aside">
              <p>
                流行貼文排行榜&nbsp;
                <img src={ice} className="sideImg" />
              </p>
              {pop.map((pop) => {
                return (
                  <Link to={`/post/${pop.postId}/${pop.type}`} key={pop.postId}>
                    <img className="rankImg" src={pop.headImg} />
                    <span className="rankList">{pop.title}</span>
                    <img className="rankArrow" src={redArrow} />
                  </Link>
                );
              })}
            </div>
            <div className="aside">
              <p>點讚貼文排行榜</p>
              {like.map((like) => {
                return (
                  <Link
                    to={`/post/${like.postId}/${like.type}`}
                    key={like.postId}
                  >
                    <img className="rankImg" src={like.headImg} />
                    <span className="rankList">{like.title}</span>
                    <img className="rankArrow" src={redArrow} />
                  </Link>
                );
              })}
            </div>
          </aside>
          <div className="page">
            <Link className="pre" to={`/home/${parseInt(m.page) - 1}`}>
              pre
            </Link>
            {Array.from({ length: totalPage }).map((_, index) => (
              <span key={index}>
                &nbsp;
                <Link className="pageNum" to={`/home/${parseInt(index) + 1}`}>
                  {index + 1}
                </Link>
                &nbsp;
              </span>
            ))}
            <Link className="next" to={`/home/${parseInt(m.page) + 1}`}>
              next
            </Link>
            <p>
              第 {m.page} 頁，共 {totalPage} 頁
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
