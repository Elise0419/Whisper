import React, { useState } from "react";
import "./Profile.css";
// import Axios from "axios";

import Header from "./Block/Header";
import Footer from "./Block/Footer";

import user from "./Img/dog.jpeg";

function Profile() {
  const [isEditing, setIsEditing] = useState({
    profilePic: false, // 是否編輯頭像
    username: false, // 是否編輯用戶名稱
    userDeclaration: false, // 是否編輯用戶聲明
    email: false, // 是否編輯電子郵件
    idNumber: false, // 是否編輯身份證字號
    phoneNumber: false, // 是否編輯手機號碼
  });
  const [selectedImage, setSelectedImage] = useState(null); // 選擇的新頭像
  const [formData, setFormData] = useState({
    username: "David", // 用戶名稱
    userDeclaration: "致力于打造美好生活", // 用戶聲明
    email: "user@example.com", // 電子郵件
    idNumber: "A247850405", // 身份證字號
    phoneNumber: "0916888888", // 手機號碼
  });

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = async (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    // if (field === "profilePic" && selectedImage) {
    //   const formData = new FormData();
    //   formData.append("profilePic", selectedImage);

    //   try {
    //     const response = await Axios.post(
    //       "http://example.com/upload_profile_pic.php", // 替换成你的后端 API 地址
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );

    //     // 更新成功后进行一些操作
    //   } catch (error) {
    //     console.error("Error updating profile pic:", error);
    //   }
    // }
  };
  // 處理圖片更改的事件
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 從事件物件中獲取選擇的檔案
    setSelectedImage(file); // 將選擇的檔案設定為 selectedImage 的狀態
  };

  // 處理輸入變化的事件
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value }); // 根據使用者的輸入更新特定欄位的值
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="ProfileContainer">
          <h2>用戶設置</h2>
          <hr />
          <div className="ProfileForm">
            <form>
              <div className="profilePic">
                <label htmlFor="profilePic">頭像修改:</label>
                {/* 選擇新頭像會顯示在網頁上 */}
                <img
                  className="userImg"
                  src={
                    selectedImage ? URL.createObjectURL(selectedImage) : user
                  }
                  alt=""
                />

                {isEditing.profilePic && (
                  <div>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className={`editBtn ${isEditing.profilePic ? "saveBtn" : ""}`}
                  onClick={() => handleEditClick("profilePic")}
                >
                  {isEditing.profilePic ? "保存" : "編輯"}
                </button>
              </div>
              <hr />

              <div className="profileuserName">
                <label htmlFor="username">用戶名稱:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  readOnly={!isEditing.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
                {isEditing.username ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("username")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("username")}
                  >
                    編輯
                  </button>
                )}
              </div>
              <hr />

              <div className="UserDeclaration">
                <label htmlFor="UserDeclaration">用戶聲明:</label>
                <input
                  type="text"
                  id="UserDeclaration"
                  value={formData.userDeclaration}
                  readOnly={!isEditing.userDeclaration}
                  onChange={(e) =>
                    handleInputChange("userDeclaration", e.target.value)
                  }
                />
                {isEditing.userDeclaration ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("userDeclaration")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("userDeclaration")}
                  >
                    編輯
                  </button>
                )}
              </div>
              <hr />

              <div className="proflieEmail">
                <label htmlFor="email">電子郵件:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly={!isEditing.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {isEditing.email ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("email")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("email")}
                  >
                    編輯
                  </button>
                )}
              </div>
              <hr />

              <div className="profileidNumber">
                <label htmlFor="idNumber">身份證字號:</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  pattern="^[A-Z][0-9]{9}$"
                  title="請輸入有效的身份證字號，格式為一個英文字母後接九位數字。"
                  required
                  readOnly={!isEditing.idNumber}
                  onChange={(e) =>
                    handleInputChange("idNumber", e.target.value)
                  }
                />
                {isEditing.idNumber ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("idNumber")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("idNumber")}
                  >
                    編輯
                  </button>
                )}
              </div>
              <hr />

              <div className="profilephoneNumber">
                <label htmlFor="phoneNumber">手機號碼:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  pattern="^0\d{1,2}-?\d{6,7}$"
                  required
                  readOnly={!isEditing.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
                {isEditing.phoneNumber ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("phoneNumber")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("phoneNumber")}
                  >
                    編輯
                  </button>
                )}
              </div>
            </form>
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

export default Profile;
