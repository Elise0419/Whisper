import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/Signup.css";
import logo from "./img/logo.png";

const USER_REGEX = /^[\u4e00-\u9fa5a-zA-Z]+$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const ID_REGX = /^[A-Z]2\d{8}$/;
// 身份證數字第一位為2
const EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGX = /^09\d{8}$/;

const REGISTER_URL = "http://127.0.0.1:8000/api/register";

function Signup() {
  const userRef = useRef();
  const errRef = useRef();
  const history = useHistory(); // Add this line to get the history object

  // 用戶名稱完成
  const [mem_name, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // 身份證字號
  const [person_id, setIdNumber] = useState("");
  const [validIdNumber, setValidIdNumber] = useState(false);
  const [idNumberFocus, setIdNumberFocus] = useState(false);

  // 電子郵箱
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // 電話號碼
  const [phone, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  // 密碼
  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // 再次輸入密碼
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // 報錯
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // 用戶名稱
  useEffect(() => {
    setValidName(USER_REGEX.test(mem_name));
  }, [mem_name]);

  // 身份證字號
  useEffect(() => {
    setValidIdNumber(ID_REGX.test(person_id));
  }, [person_id]);

  // 設定電子郵箱的狀態
  useEffect(() => {
    setValidEmail(EMAIL_REGX.test(email)); // Update validEmail instead of validIdNumber
  }, [email]);

  // 設定手機號碼的狀態
  useEffect(() => {
    setValidPhoneNumber(PHONE_REGX.test(phone)); // Update validEmail instead of validIdNumber
  }, [phone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [mem_name, password, matchPwd, person_id, phone]);

  async function checkAvailability(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return !(await data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async function checkEmailAvailability() {
    const url = `http://118.233.222.23:8000/api/emailcheck?email=${email}`;
    const isAvailable = await checkAvailability(url);
    if (!isAvailable) {
      setValidEmail(false);
    }
    return isAvailable;
  }

  async function checkIdAvailability() {
    const url = `http://118.233.222.23:8000/api/idcheck?person_id=${person_id}`;
    const isAvailable = await checkAvailability(url);
    if (!isAvailable) {
      setValidIdNumber(false);
    }
    return isAvailable;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const v1 = USER_REGEX.test(mem_name);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("輸入有誤");
      return;
    }
    const idAvailability = await checkIdAvailability();
    const emailAvailability = await checkEmailAvailability();

    if (emailAvailability && idAvailability) {
      try {
        const response = await fetch(REGISTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mem_name,
            person_id,
            email,
            phone,
            password,
          }),
        });

        if (!response.ok) {
          if (response.status >= 500) {
            alert("伺服器無法連線");
            throw new Error("API request failed");
          } else if (response.status >= 400) {
            alert("註冊失敗，請重新註冊");
            window.location.reload();
          }
        }

        const data = await response.json();
        setSuccess(true);

        setUser("");
        setPwd("");
        setMatchPwd("");

        // Redirect to login page
        history.push("/login");
      } catch (err) {
        console.error("Error:", err);
        setErrMsg("註冊失敗");
        errRef.current.focus();
      }
    } else {
      setErrMsg("郵箱或者用戶名稱已經被註冊");
    }
  }

  return (
    <div id="container">
      <section></section>
      <article>
        <div className="signupContainer">
          {/* 左邊部份 */}
          <div className="signupText">
            <h2>歡迎加入Whisper</h2>
            <img
              src={logo}
              alt=""
              width="100px"
              style={{ borderRadius: "50%" }}
            />
            <p>我已經有帳號,請直接登入～</p>
            <Link to="/login" className="btnDafaultborder">
              登入
            </Link>
          </div>
          {/* 右邊部分 */}
          <div className="signupMain">
            <div className="signupMainbox">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <form onSubmit={handleSubmit}>
                {/* 用戶名稱輸入框 */}
                <label htmlFor="username">
                  用戶名稱:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !mem_name ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={mem_name}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && mem_name && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  用戶名只能用中文和英文
                </p>
                {/* 身份證字號輸入框 */}
                <label htmlFor="idNumber">
                  身份證字號:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validIdNumber ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validIdNumber || !person_id ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="text"
                  id="idNumber"
                  autoComplete="off"
                  onChange={(e) => setIdNumber(e.target.value)}
                  value={person_id}
                  required
                  aria-invalid={validIdNumber ? "false" : "true"}
                  aria-describedby="idnumbernote"
                  onFocus={() => setIdNumberFocus(true)}
                  onBlur={() => {
                    setIdNumberFocus(false);
                    checkIdAvailability();
                  }}
                />
                <p
                  id="idnumbernote"
                  className={
                    person_id && !validIdNumber ? "instructions" : "offscreen"
                  }
                >
                  {/* 這裡放置有關身份證字號的說明 */}
                  <FontAwesomeIcon icon={faInfoCircle} />
                  已註冊或你是男生，只有女生可以註冊歐凸^-^凸
                </p>
                {/*電子郵箱輸入框 */}
                <label htmlFor="email">
                  電子郵箱:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="email" // 請使用 type="email" 來啟用瀏覽器的內建格式檢查
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => {
                    setEmailFocus(false);
                    checkEmailAvailability();
                  }}
                />
                <p
                  id="emailnote"
                  className={
                    email && !validEmail ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  請輸入有效的電子郵件地址。例如：example@email.com
                  {/* 這裡可以放置有關電子郵箱的說明 */}
                </p>

                <label htmlFor="phoneNumber">
                  電話號碼:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPhoneNumber ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPhoneNumber || !phone ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="text"
                  id="phoneNumber"
                  autoComplete="off"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phone}
                  required
                  aria-invalid={validPhoneNumber ? "false" : "true"}
                  aria-describedby="phonenumbernote"
                  onFocus={() => setPhoneNumberFocus(true)}
                  onBlur={() => setPhoneNumberFocus(false)}
                />
                <p
                  id="phonenumbernote"
                  className={
                    phoneNumberFocus && phone && !validPhoneNumber
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  {" "}
                  <FontAwesomeIcon icon={faInfoCircle} />
                  請輸入有效的電話號碼
                  {/* 這裡放置有關電話號碼的說明 */}
                </p>

                <label htmlFor="password">
                  輸入密碼:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !password ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  要求密碼至少包含一個字母和一個數字，且總長度需達到 8
                  個字符以上。
                </p>

                <label htmlFor="confirm_pwd">
                  再次輸入密碼:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="signupInput"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  必須與第一個密碼輸入欄相符。
                </p>

                <button
                  className="btnSuccesssignup"
                  disabled={
                    !validName ||
                    !validPwd ||
                    !validMatch ||
                    !validIdNumber ||
                    !validPhoneNumber
                  }
                >
                  註冊帳號
                </button>
              </form>
              <p></p>
            </div>
          </div>
        </div>
      </article>
      <aside></aside>
    </div>
  );
}

export default Signup;
