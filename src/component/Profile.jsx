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
    username: " ",
    userDeclaration: " ",
    email: " ",
    idNumber: " ",
    phoneNumber: " ",
  });

  const [isEditing, setIsEditing] = useState({
    profilePic: false,
    username: false,
    userDeclaration: false,
    email: false,
    idNumber: false,
    phoneNumber: false,
  });

  const handleSaveClick = async (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    const dataToSend = { [field]: formData[field] };
    console.log("Data to send:", dataToSend);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://10.10.247.43:8000/api/profile", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
      } else {
        console.log("失敗上傳")
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //輸入框狀態
  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };

  // 編輯狀態
  const handleEditClick = (field) => {
    console.log(`Editing ${field}`);
    setIsEditing({ ...isEditing, [field]: true });
  };



  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("token");
      fetch("http://10.10.247.43:8000/api/profile", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData.user);
          setUser(jsonData.user);
          setFormData({
            username: jsonData.user.mem_name,
            userDeclaration: jsonData.user.promise,
            email: jsonData.user.email,
            idNumber: jsonData.user.person_id,
            phoneNumber: jsonData.user.phone,
          });
        })
        .catch((err) => {
          console.log("Error:", err);
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
                  value={formData.username}  // 使用formData中的值
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
