import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "./CSS/Upload.css";
import "./CSS/quill.snow.css";

function Edition() {
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
    fetch(`http://118.233.222.23:8000/api/posts/edit/post_${match.params.postID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status >= 500) {
          alert("與伺服器中段斷連接");
        } else if (res.status === 401) {
          history.push("/login");
        } else if (res.status >= 400) {
          res.json().then((data) => {
            alert(data.message);
            history.push("/home/1");
          });
        }
        return res.json();
      })
      .then((jsonData) => {
        setTags(jsonData.tags);
        setQ(jsonData.post);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  }, []);

  let cake = false;
  setTimeout(function () {
    cake = true;
  }, 1500);

  function changeTitle(value) {
    if (cake) {
      setQ({ ...q, title: value });
    }
  }

  function changeContent(value) {
    if (cake) {
      setQ({ ...q, content: value });
    }
  }

  function re() {
    setQ({
      title: "",
      content: "",
      tag: "",
    });
  }

  const up = () => {
    if (q.title === "") {
      alert("請輸入標題");
    } else {
      fetch(
        `http://118.233.222.23:8000/api/editor/reupload/${match.params.postID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(q),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("上傳失敗");
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
        })
        .then((jsonData) => {
          history.push("/home/1");
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

    // var a = Array.from(
    //   document.querySelector(".hashtagNew").getElementsByTagName("button")
    // );
    // const firstButton = a[0];
    // if (firstButton && hn.contains(firstButton)) {
    //   setQ({ ...q, tag: firstButton.innerText });
    // } else {
    //   setQ({ ...q, tag: "" });
    // }
  }

  function newTag(e) {
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
      (hn.getElementsByTagName("button").length > 7) &
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
    setQ({ ...q, tag: a[0]?.innerText });
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
          {console.log(q)}
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
            <span className="hashtagNew">
              {q.tag ? (
                <button className="pinkTag" onClick={oldTag}>
                  {q.tag}
                </button>
              ) : null}
            </span>
            <hr />
            <span className="hashtagOld">
              {tags.map((tag, index) => {
                if (tag.tag === q.tag) {
                  return null;
                } else {
                  return (
                    <button className="grayTag" key={index} onClick={oldTag}>
                      {tag.tag}
                    </button>
                  );
                }
              })}
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
