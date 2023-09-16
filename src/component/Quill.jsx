import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Quill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  // 存文字
  handleChange = (value) => {
    this.setState({ text: value });
  };

  // 存照片
  handleImageUpload = () => {
    const formData = new FormData();
    formData.append("text", this.state.text);

    // 取得Quill編輯器
    const quill = this.quillRef.getEditor();
    // 取得Quill編輯器裡的照片
    const images = quill.container.querySelectorAll("img");

    // 照片轉blob格式 並存進formData裡
    images.forEach((image, index) => {
      const dataURI = image.getAttribute("src");
      const blob = dataURItoBlob(dataURI);
      formData.append(`image${index}`, blob, `image${index}.png`);
    });

    // 轉blob的函式
    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    };

    // Laravel
    fetch("/api/createposts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // 上傳成功要幹嘛
        } else {
          // 上傳失敗要幹嘛
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => {
            this.quillRef = el;
          }}
          value={this.state.text}
          onChange={this.handleChange}
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
        <button onClick={this.handleImageUpload}>上傳文本和圖片</button>
      </div>
    );
  }
}

export default Quill;
