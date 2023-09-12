import React, { Component, useState } from "react";
import axios from "axios";

import "./Upload.css";

import logo from "./img/logo.png";
import whiteArrow from "./img/whiteArrow.png";
import purpleArrow from "./img/purpleArrow.png";
import user from "./img/dog.jpeg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Upload() {
  var [article, setArticle] = useState("");
  async function send() {
    var url = "http://localhost:2407/create/post";
    var result = await axios.post(url, article);
    alert("Done");
  }
  return (
    <div>
      <div className="nav">nav</div>
      <header>
        <div>
          <a href="">
            <img className="logo" src={logo} />
          </a>
          <a href="">
            <span className="whisper">WHISPER</span>
          </a>
          <button className="ddBtn">
            切換論壇個版
            <img className="ddArrow" src={purpleArrow} />
            <span className="ddItem">
              <a href="">美妝保養</a>
              <a href="">時尚穿搭</a>
              <a href="">美食情報</a>
              <a href="">健康生活</a>
              <a href="">感情生活</a>
            </span>
          </button>
        </div>
        <div>
          <a href="">
            <img className="userImg" src={user} />
          </a>
          <a href="">
            <span className="userName">David.one</span>
          </a>
          <img className="userArrow" src={whiteArrow} />
        </div>
      </header>
      <CKEditor
        editor={ClassicEditor}
        data=""
        // onReady={(editor) => {
        //   // You can store the "editor" and use when it is needed.
        //   console.log("Editor is ready to use!", editor);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          setArticle({ article: data });
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
      <div>
        <input className="reBtn" type="reset" value="取消" />
        <input className="upBtn" type="button" value="送出" onClick={send} />
      </div>
      <footer>© 2023</footer>
    </div>
  );
}

export default Upload;
