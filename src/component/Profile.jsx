import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/Profile.css";
import Header from "./Block/Header";
import Footer from "./Block/Footer";
import Asideuser from "./Block/Asideuser";
import { useHistory } from "react-router-dom";

import rabbit from "../component/img/rabbit.png";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // 添加一个状态用于保存侧边栏的用户信息
  const [asideUser, setAsideUser] = useState({});

  const [isEditing, setIsEditing] = useState({
    mem_name: false,
    promise: false,
    email: false,
    person_id: false,
    phone: false,
    headimg: false,
  });

  // 在 handleSaveClick 中调整传递的字段
  // 省略其他部分...

  // 輸入資料
  const handleInputChange = (id, value) => {
    console.log(`Updating ${id} with value: ${value}`);
    setUser({ ...user, [id]: value });
  };

   // 在保存用户信息后，更新侧边栏用户信息
  const handleSaveClick = async (field) => {
    setIsEditing({ ...isEditing, [field]: false });

    console.log(user[field]);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://118.233.222.23:8000/api/profile/${field}/change`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [field]: user[field] }),
        }
      );

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);

        // 保存成功后，更新侧边栏用户信息
        setAsideUser(jsonData.user);
      } else {
        console.log("更新失败");
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUpload = (e) => {
    // 取得檔案
    const file = e.target.files[0];
    const reader = new FileReader();
    // 上傳
    reader.onload = function (event) {
      setUser({ ...user, headimg: event.target.result });
    };
    // 讀取
    reader.readAsDataURL(file);
  };

  const handleImageSave = () => {
    const head = user.headimg;
    setIsEditing({ ...isEditing, headimg: false });
    const token = localStorage.getItem("token");
    fetch(`http://118.233.222.23:8000/api/profile/head/change`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        base64Image: head,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("上傳失敗，請重新上傳");
          throw new Error("API request failed");
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        if (jsonData.message === "上傳成功") {
          fetchData();
            // 更新侧边栏的用户信息
        setAsideUser(jsonData.user);
        }
      })

      .catch((err) => {
        console.log("Error:", err);
      });
  };
  
  // 編輯資料
  const handleEditClick = (field) => {
    console.log(`Editing ${field}`);
    setIsEditing({ ...isEditing, [field]: true });
  };
  const history = useHistory();
  
  function fetchData() {
    const token = localStorage.getItem("token");
    fetch("http://118.233.222.23:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 403) {
          history.push("/verify");
          throw new Error("API request failed");
        }
        if (res.status === 401) {
          history.push("/login")
        }
        if (res.status >= 200) {
          return res.json();
        }
      })
      .then((jsonData) => {
        console.log(jsonData)
        if (jsonData.error) {
          console.log("錯誤訊息:", jsonData.error);
        } else {
          setUser(jsonData.user);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>資料載入中...</div>
      ) : (
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
                    <img
                      src={user.headimg || rabbit}
                      alt="Profile Pic"
                      className="profilePic"
                    />
                    {isEditing.headimg ? (
                      <div>
                        <input
                          type="file"
                          id="headimg"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <button
                          type="button"
                          onClick={handleImageSave}
                          className="saveBtn"
                        >
                          保存
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="editBtn"
                        onClick={() =>
                          setIsEditing({ ...isEditing, headimg: true })
                        }
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
                  <hr />

                  <div className="profilephoneNumber">
                    <label htmlFor="password">用戶密碼:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value="************************"
                    />
                    <Link to="/restpwd" className="editBtn">
                      編輯
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </article>
          <aside>
          <Asideuser user={asideUser} /> {/* 将侧边栏的 user 属性传递给 Asideuser 组件 */}
          </aside>
          <Footer />
        </div>

      )}
    </div>

  );
}

export default Profile;
