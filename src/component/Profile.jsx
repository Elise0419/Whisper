import React, { useState, useEffect } from "react";
import "./CSS/Profile.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";

function Profile() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    email_change: "", // 新增 email_change 字段
    mem_name_change: "", // 新增 mem_name_change 字段
    phone_change: "", // 新增 phone_change 字段
    person_id_change: "", // 新增 person_id_change 字段
    userDeclaration: "",
  });

  const [isEditing, setIsEditing] = useState({
    profilePic: false,
    username: false,
    userDeclaration: false,
    email: false,
    idNumber: false,
    phoneNumber: false,
  });

  // 在 handleSaveClick 中调整传递的字段
// 省略其他部分...

const handleSaveClick = async (field) => {
  setIsEditing({ ...isEditing, [field]: false });

  const dataToSend = { [field]: formData[field] };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://10.10.247.43:8000/api/profile/mem-name/change`, {
      method: "post",
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
      console.log("更新失败");
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// 省略其他部分...


  
  

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageSave = async () => {
    const formData = new FormData();
    formData.append("head_img", selectedImage);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://10.10.247.43:8000/api/headimgchange`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
      } else {
        console.log("上传头像失败");
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 輸入資料
  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };
// 編輯資料
  const handleEditClick = (field) => {
    console.log(`Editing ${field}`);
    setIsEditing({ ...isEditing, [field]: true });
  };

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("token");
      console.log("Token in Profile:", token);
  
      fetch("http://10.10.247.43:8000/api/profile", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('API request failed');
          }
          return res.json();
        })
        .then((jsonData) => {
          if (jsonData.error) {
            console.log("API 返回了一个错误:", jsonData.error);
          } else {
            console.log("API返回的数据:", jsonData);
            setUser(jsonData.user);
            setFormData({
              mem_name_change: jsonData.user.mem_name, // 添加此行
                email_change: jsonData.user.email,
                phone_change: jsonData.user.phone,
                person_id_change: jsonData.user.person_id,
                userDeclaration: jsonData.user.userDeclaration,

              });
              

          }
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
              <div className="profilePic">
                <label htmlFor="profilePic">頭像:</label>
                {isEditing.profilePic ? (
                  <div>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <button type="button" onClick={handleImageSave}>
                      保存
                    </button>
                  </div>
                ) : (
                  <img
                    src={user?.headimg || "/default-avatar.jpg"}
                    alt="Profile Pic"
                    className="profilePic"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setIsEditing({ ...isEditing, profilePic: true })}
                >
                  編輯
                </button>
              </div>
              <hr />

              <div className="profileuserName">
                <label htmlFor="username">用戶名稱:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.mem_name_change}
                  readOnly={!isEditing.username}
                  onChange={(e) =>
                    handleInputChange("mem_name_change", e.target.value)
                  }
                />
                {isEditing.username ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("mem_name_change")}
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
                  value={formData.email_change}
                  readOnly={!isEditing.email}
                  onChange={(e) =>
                    handleInputChange("email_change", e.target.value)
                  }
                />
                {isEditing.email ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("email_change")}
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
                  value={formData.person_id_change}
                  pattern="^[A-Z][0-9]{9}$"
                  title="請輸入有效的身份證字號，格式為一個英文字母後接九位數字。"
                  required
                  readOnly={!isEditing.idNumber}
                  onChange={(e) =>
                    handleInputChange("person_id_change", e.target.value)
                  }
                />
                {isEditing.idNumber ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("person_id_change")}
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
                  value={formData.phone_change}
                  pattern="^0\d{1,2}-?\d{6,7}$"
                  required
                  readOnly={!isEditing.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phone_change", e.target.value)
                  }
                />
                {isEditing.phoneNumber ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("phone_change")}
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
        <Asideuser />
      </aside>
      <Footer />
    </div>
  );
}

export default Profile;