import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "./CSS/Upload.css";
import "react-quill/dist/quill.snow.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

function Edition() {
  const m = useRouteMatch().params.type;
  const match = useRouteMatch();
  const history = useHistory();

  let [q, setQ] = useState({
    title: "",
    content: "",
    tag: "",
  });
  let [tags, setTags] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(match.params.postID)
    fetch(`http://118.233.222.23:8000/api/posts/edit/post_${match.params.postID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status >= 500) {
          alert('與伺服器中段斷連接')
        } else if (res.status === 401) {
          history.push('/login');
        } else if (res.status >= 400) {
          res.json().then((data) => {
            alert(data.message);
            history.push('/home');
          })
        }
        return res.json();
      })
      .then((jsonData) => {
        console.log(jsonData)
        setTags(jsonData.tags);
        setQ(jsonData.post);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
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

    if (q.title === "") {
      alert("請輸入標題");
    } else {
      fetch(`http://118.233.222.23:8000/api/upload/${m}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(q),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("上傳失敗");
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
        })
        .then((jsonData) => {
          window.location.href = "/";
          console.log(jsonData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function oldTag(e) {
    let ecl = e.currentTarget.classList;
    let hn = document.querySelector(".hashtagNew");
    let ho = document.querySelector(".hashtagOld");
    if (hn.getElementsByTagName("button").length < 1) {
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
    if (a[0] != undefined) {
      setQ({ ...q, tag: a[0].innerText });
    }
  }

  function newTag() {
    let hn = document.querySelector(".hashtagNew");
    let hi = document.querySelector(".hashtagInput");
    if ((hn.getElementsByTagName("button").length < 1) & (hi.value != "")) {
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
    setQ({ ...q, tag: a[0].innerText });
  }

  return (
    <div>
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
    </div>
  );
}

export default Edition;
