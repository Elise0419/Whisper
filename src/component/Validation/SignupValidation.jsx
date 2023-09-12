function Validation(values){

    let error = {}
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}$/
    // 用於檢驗郵件地址的格式是否正確。
    
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // 要求密碼至少包含一個字母和一個數字，且總長度需達到 8 個字符以上。

    const idNumber_pattern = /^[A-Z][12]\d{8}$/;
    // 身份證字號要求

    const phoneNumber_pattern = /^09\d{8}$/; 
    //台灣手機號碼的正則表達式

    const username_pattern = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    // 用戶名只能用中文和英文

    
    if(values.username === ""){
        error.username = "用戶名不該為空,請輸入用戶名";
    } else if (!username_pattern.test(values.username)){
        error.username = "用戶名只能用中文和英文";
    } else {
        error.username = "";
    }

    // 身分證字號
    if(values.idNumber === ""){
        error.idNumber = "身份證字號不該為空,請輸入身份證字號"
    }else if (!idNumber_pattern.test(values.idNumber)){
        error.idNumber = "身份證字號輸入錯誤"
    }else {
        error.idNumber = ""
    }

    // 手機號碼
    if(values.phoneNumber === ""){
        error.phoneNumber = "手機號碼不該為空,請輸入手機號碼";
    } else if (!phoneNumber_pattern.test(values.phoneNumber)){
        error.phoneNumber = "手機號碼輸入錯誤";
    } else {
        error.phoneNumber = "";
    }


    if(values.email === ""){
        error.email = "email不該為空,請輸入email"
    } else if (!email_pattern.test(values.email)){
        error.email = "email輸入錯誤"
    }else {
        error.email = ""
    }


    if(values.password === ""){
        error.password = "密碼不該為空,請輸入密碼"
    }else if (!password_pattern.test(values.password)){
        error.password = "要求密碼至少包含一個字母和一個數字，且總長度需達到 8 個字符以上"
    }else {
        error.password = ""
    }
    return error;

}

export default Validation;