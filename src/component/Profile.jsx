import React, { useState } from "react";
import "./Profile.css";

import Header from "./Block/Header";
import Footer from "./Block/Footer";

function Profile() {
  // 使用狀態來追蹤是否處於編輯模式
  const [isEditing, setIsEditing] = useState(false);

  // 處理點擊編輯按鈕的事件
  const handleEditClick = (event) => {
    const field = event.target.previousElementSibling;
    field.removeAttribute("readOnly");
    field.classList.add("editable");
    field.focus();
    setIsEditing(true);
  };

  // 處理點擊保存按鈕的事件
  const handleSaveClick = (event) => {
    event.preventDefault();

    const field = event.target.previousElementSibling.previousElementSibling;
    field.setAttribute("readOnly", true);
    field.classList.remove("editable");
    setIsEditing(false);

    // 在這裡可以添加保存表單數據的邏輯
  };

  return (
    <div id="container">
      <Header />
      <section></section>
      <article>
        <div className="ProfileContainer">
          <h2>用戶設置</h2>
          <div className="ProfileForm">
            <form>
              <div className="profilePic">
                <label htmlFor="profilePic">頭像:</label>
                <img src="./photo1.png" alt=" " />
                <input type="file" id="profilePic" accept="image/*" readOnly />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>

              <div className="profileuserName">
                <label htmlFor="username">用戶名稱:</label>
                <input type="text" id="username" value="David" readOnly />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>

              <div className="UserDeclaration">
                <label htmlFor="UserDeclaration">用戶聲明:</label>
                <input
                  type="text"
                  id="UserDeclaration"
                  value="致力於打造美好生活"
                  readOnly
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>

              <div proflieEmail>
                <label htmlFor="email">電子郵件:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="user@example.com"
                  readOnly
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>

              <div className="profileidNumber">
                <label htmlFor="idNumber">身份證字號:</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value="A247850405"
                  pattern="^[A-Z][0-9]{9}$"
                  title="請輸入有效的身份證字號，格式為一個英文字母後接九位數字。"
                  required
                  readOnly
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>

              <div className="profilephoneNumber">
                <label htmlFor="phoneNumber">手機號碼:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value="0916888888"
                  pattern="^0\d{1,2}-?\d{6,7}$"
                  required
                  readOnly
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  編輯
                </button>
                {isEditing && (
                  <button type="button" onClick={handleSaveClick}>
                    保存
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </article>
      <aside>
        <div className="aside">
          <img src="photo1.png" alt="" />
          <h3>David.one</h3>
          <hr />
          <span>致力於打造美好生活</span>
          <span>創建時間:2023-08-01</span>
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
