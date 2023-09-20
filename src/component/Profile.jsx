import React, { useState, useEffect } from "react";
import "./CSS/Profile.css";
// import Axios from "axios";

import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";

function Profile() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "David",
    userDeclaration: "致力于打造美好生活",
    email: "user@example.com",
    idNumber: "A247850405",
    phoneNumber: "0916888888",
  });
  
  const [isEditing, setIsEditing] = useState({
    profilePic: false,
    username: false,
    userDeclaration: false,
    email: false,
    idNumber: false,
    phoneNumber: false,
  });

  

  const handleEditClick = (field) => {
    setUser({ ...user, [field]: true });
  };

  const handleSaveClick = async (field) => {
    setUser({ ...user, [field]: false });

    
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

  localStorage.setItem(
    "token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMjQ3LjQzOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjk1MTc1MzEyLCJleHAiOjE2OTUxNzg5MTIsIm5iZiI6MTY5NTE3NTMxMiwianRpIjoiUjFLdmJHM0dmYXNhc1NzZyIsInN1YiI6IjI4IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.hXfc_CeJLx0fyOve1HdWkn235zRVdx1X4RdZ-B-bCm4");
  var token = localStorage.getItem("token");

  useEffect(() => {
    function fetchData() {
      fetch("http://10.10.247.43:8000/api/profile", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonData) => {
          console.log(jsonData.user);
          setUser(jsonData.user);
          console.log(user);
        })
        .catch((err) => {
          console.log("錯誤:", err);
        });
    }
    fetchData();
  }, []);

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
              <div className="profileuserName">
                <label htmlFor="username">用戶名稱:</label>
                <input
                  type="text"
                  id="username"
                  value={user?.mem_name || ""} // 使用 optional chaining 和空字符串作为默认值
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
                  value={user?.promise || ""}
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
                  value={user?.email || ""}
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
                  value={user?.person_id || ""}
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
                  value={user?.phone || ""}
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
        <Asideuser />
      </aside>
      <Footer />
    </div>
  );
}

export default Profile;
