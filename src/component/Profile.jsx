import React, { useState, useEffect } from "react";
import "./CSS/Profile.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";
import { useHistory } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});

  const [isEditing, setIsEditing] = useState({
    mem_name: false,
    promise: false,
    email: false,
    person_id: false,
    phone: false,
  });

  // 在 handleSaveClick 中调整传递的字段
  // 省略其他部分...

  // 輸入資料
  const handleInputChange = (id, value) => {
    console.log(`Updating ${id} with value: ${value}`);
    setUser({ ...user, [id]: value });
  };

  const handleSaveClick = async (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    const dataToSend = { data: user[field] };
    console.log(dataToSend);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/profile/${field}/change`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

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

  const handleImageUpload = (e) => {
    // 取得檔案
    const file = e.target.files[0];
    const reader = new FileReader();
    // 上傳
    reader.onload = function (event) {
      // const fileContent = event.target.result;
      // 將user.headimg為fileContent
      setUser({ ...user, headimg: e.target.files[0] });
    };
    // 讀取
    reader.readAsDataURL(file);
  };

  const handleImageSave = () => {
    const head = user.headimg;

    console.log(head);

    const reader = new FileReader();

    reader.onload = function (event) {
      console.log("文件加载完成");

      const formdata = new FormData();

      formdata.append("File", head);

      console.log(...formdata);

      try {
        const token = localStorage.getItem("token");
        const response = fetch(
          `http://127.0.0.1:8000/api/profile/head/change`,
          {
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formdata,
          }
        );

        if (response.ok) {
          const jsonData = response.json();
          console.log(jsonData);
        } else {
          console.log("上傳失敗，請重新上傳");
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    reader.readAsDataURL(head);
  };

  // 編輯資料
  const handleEditClick = (field) => {
    console.log(`Editing ${field}`);
    setIsEditing({ ...isEditing, [field]: true });
  };
  const history = useHistory();

  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem("token");
      console.log("Token in Profile:", token);

      fetch("http://127.0.0.1:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 403) {
            history.push("/verify");
            throw new Error("API request failed");
          } else if (res.status >= 200) {
            return res.json();
          }
        })
        .then((jsonData) => {
          if (jsonData.error) {
            console.log("API 返回了一个错误:", jsonData.error);
          } else {
            console.log("API返回的数据:", jsonData);
            setUser(jsonData.user);
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
                <label htmlFor="headimg">頭像:</label>
                {isEditing.headimg ? (
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
                  onClick={() => setIsEditing({ ...isEditing, headimg: true })}
                >
                  編輯
                </button>
              </div>
              <hr />

              <div className="profileuserName">
                <label htmlFor="mem_name">用戶名稱:</label>
                <input
                  type="text"
                  id="mem_name"
                  value={user.mem_name}
                  readOnly={!isEditing.mem_name}
                  onChange={(e) =>
                    handleInputChange("mem_name", e.target.value)
                  }
                />
                {isEditing.mem_name ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("mem_name")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("mem_name")}
                  >
                    編輯
                  </button>
                )}
              </div>
              <hr />

              <div className="UserDeclaration">
                <label htmlFor="promise">用戶聲明:</label>
                <input
                  type="text"
                  id="promise"
                  value={user?.promise || ""}
                  readOnly={!isEditing.promise}
                  onChange={(e) => handleInputChange("promise", e.target.value)}
                />
                {isEditing.promise ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("promise")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("promise")}
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
                  value={user.email}
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
                <label htmlFor="person_id">身份證字號:</label>
                <input
                  type="text"
                  id="person_id"
                  name="person_id"
                  value={user.person_id}
                  pattern="^[A-Z][0-9]{9}$"
                  title="請輸入有效的身份證字號，格式為一個英文字母後接九位數字。"
                  required
                  readOnly={!isEditing.person_id}
                  onChange={(e) =>
                    handleInputChange("person_id", e.target.value)
                  }
                />
                {isEditing.person_id ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("person_id")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("person_id")}
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
                  value={user.phone}
                  pattern="^0\d{1,2}-?\d{6,7}$"
                  required
                  readOnly={!isEditing.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                {isEditing.phone ? (
                  <button
                    type="button"
                    className="saveBtn"
                    onClick={() => handleSaveClick("phone")}
                  >
                    保存
                  </button>
                ) : (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleEditClick("phone")}
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
