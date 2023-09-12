import React, { Component, useState } from "react";
import axios from "axios";

import "./Upload.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";

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
      <Header />
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
      <Footer />
    </div>
  );
}

export default Upload;
