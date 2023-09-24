import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import ReactQuill from "react-quill";
import "./CSS/Upload.css";
import "react-quill/dist/quill.snow.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

function Quill() {
  const m = useRouteMatch().params.type;
  let [q, setQ] = useState({
    title: "",
    content: "",
    tag: "",
  });
  let [tags, setTags] = useState([]);

  useEffect(() => {
    function fetchData() {
      fetch(`http://127.0.0.1:8000/api/tags/all/${m}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          setTags(jsonData.tags);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);

  function changeTitle(value) {
    setQ({ ...q, title: value });
  }

  function changeContent(value) {
    setQ({ ...q, content: value });
  }

  function re() {
    setQ({
      title: "hello",
      content: "",
      tag: "",
      imgurl: "",
    });
  }

  const up = () => {
    console.log(q);

    if (q.title == "") {
      alert("請輸入標題");
    } else {
      const token = localStorage.getItem("token");
      console.log("Token in Profile:", token);

      // 淳嫻 這邊測試要加埠號 不然會有 cors 跟 404 的問題
      // 還有 照片檔案不能過大 不然會出現net::ERR_FAILED
      fetch(`http://127.0.0.1:8000/api/upload/${m}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(q),
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData);
        })
        .catch((error) => {
          console.log(error);
        });
      window.location.href = "/";
    }
  };

  function oldTag(e) {
    let ecl = e.currentTarget.classList;
    let hn = document.querySelector(".hashtagNew");
    let ho = document.querySelector(".hashtagOld");
    if (hn.getElementsByTagName("button").length < 6) {
      if (ecl.contains("grayTag")) {
        hn.appendChild(e.currentTarget);
        ecl.remove("grayTag");
        ecl.add("pinkTag");
      } else {
        ho.appendChild(e.currentTarget);
        ecl.add("grayTag");
        ecl.remove("pinkTag");
      }
    } else {
      if (ecl.contains("pinkTag")) {
        ho.appendChild(e.currentTarget);
        ecl.add("grayTag");
        ecl.remove("pinkTag");
      }
    }
    var a = Array.from(
      document.querySelector(".hashtagNew").getElementsByTagName("button")
    );
    var b = [];
    a.forEach((a) => {
      b.push(a.innerText);
    });
    setQ({ ...q, tag: b });
  }

  function newTag() {
    let hn = document.querySelector(".hashtagNew");
    let hi = document.querySelector(".hashtagInput");
    if ((hn.getElementsByTagName("button").length < 6) & (hi.value != "")) {
      var value = hi.value;
      var button = document.createElement("button");
      button.textContent = value;
      hn.appendChild(button);
      button.classList.add("yellowTag");
      button.onclick = function (e) {
        hn.removeChild(e.currentTarget);
      };
    } else if (
      (hn.getElementsByTagName("button").length > 6) &
      (hi.value != "")
    ) {
      var button = document.querySelector(".yellowTag");
      button.onclick = function (e) {
        hn.removeChild(e.currentTarget);
      };
    }
    var a = Array.from(
      document.querySelector(".hashtagNew").getElementsByTagName("button")
    );
    var b = [];
    a.forEach((a) => {
      b.push(a.innerText);
    });
    setQ({ ...q, tag: b });
  }

  return (
    <div>
      <Header />
      <div className="QuillEditor">
        <div>
          <ReactQuill
            placeholder="標題"
            className="quillTitle"
            value={q.title}
            onChange={changeTitle}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                ["link", "image"],
                ["color", "background"],
                ["clean"],
                ["code"],
              ],
            }}
          />
          <ReactQuill
            placeholder="今日心情..."
            className="quillContent"
            value={q.content}
            onChange={changeContent}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                ["link", "image"],
                ["color", "background"],
                ["clean"],
                ["code"],
              ],
            }}
          />
          <div>
            hashtag: <input className="hashtagInput" type="text" />
            <button className="hashtagBtn" onClick={newTag}>
              create
            </button>
            <span className="hashtagNew"></span>
            <hr />
            <span className="hashtagOld">
              {tags.map((tag, index) => (
                <button className="grayTag" key={index} onClick={oldTag}>
                  {tag.tag}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>
      <button role="reset" onClick={re} className="reBtn">
        重置貼文
      </button>
      <button role="button" onClick={up} className="upBtn">
        上傳貼文
      </button>
      <Footer />
    </div>
  );
}

export default Quill;
