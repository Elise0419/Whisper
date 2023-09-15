import React, { Component } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class MyEditor extends Component {
  componentDidMount() {
    ClassicEditor.create(document.querySelector("#editor"), {
      ckfinder: {
        // uploadUrl: "{{ route('ckeditor.upload', ['_token' => csrf_token()]) }}",
        uploadUrl: "http://10.10.247.43:8000/api/v1/createposts",
      },
    })
      .then((editor) => {
        console.log(editor);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/classic/ckeditor.js"></script>
        <div id="editor"></div>
      </div>
    );
  }
}

export default MyEditor;
