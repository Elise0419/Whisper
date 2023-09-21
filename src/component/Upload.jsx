import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CSS/Upload.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import { useRouteMatch } from "react-router-dom";
import { useState, useRef } from "react";

function Quill() {
  const match = useRouteMatch();

  const [q, setQ] = useState({
    title: "hello",
    content: "",
    tag: match.params.type,
  });

  const c = (value) => {
    setQ({ ...q, content: value });
  };

  const re = () => {
    setQ({
      title: "hello",
      content: "",
      tag: "",
      imgurl: "",
    });
  };

  const up = () => {
    const token = localStorage.getItem("token");
    console.log("Token in Profile:", token);

    console.log(q);
    // 淳嫻：這邊測試要加埠號，不然會有cors跟404的問題
    fetch("http://127.0.0.1:8000/api/upload/love", {
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
  };

  // const handleImageUpload = async (file) => {
  //   // 创建一个 FormData 对象用于将图片文件上传到服务器
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     // 发送 POST 请求将图片上传到服务器，此处需要替换成你的服务器端上传逻辑
  //     const response = await fetch("YOUR_UPLOAD_URL", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       // 上传成功，获取服务器返回的图片 URL
  //       const imageUrl = await response.json();

  //       // 将图片 URL 插入到 Quill 编辑器中
  //       // const editor = quillRef.current.getEditor();
  //       // const range = editor.getSelection(true);
  //       // editor.insertEmbed(range.index, "image", imageUrl);
  //     } else {
  //       console.error(
  //         "Image upload failed:",
  //         response.status,
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Image upload error:", error);
  //   }
  // };

  return (
    <div>
      <Header />
      <ReactQuill
        // ref={quillRef}
        className="quill-editor"
        value={q.content}
        onChange={c}
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
      <button onClick={up} className="upBtn">
        送出
      </button>
      <input type="reset" value="重置" onClick={re} className="reBtn" />
      <Footer />
    </div>
  );
}

export default Quill;
