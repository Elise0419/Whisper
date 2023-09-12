function Validation(values){

    let error = {}
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}$/
    // 用於檢驗郵件地址的格式是否正確。
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // 要求密碼至少包含一個字母和一個數字，且總長度需達到 8 個字符以上。

    // 網頁不要看到fetch

  

    
    if(values.email === ""){
        error.email = "email不該為空,請輸入email"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "email輸入錯誤"
    }else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "密碼至少包含一個字母和一個數字，且總長度需達到 8 個字符以上"
    }else if (!password_pattern.test(values.password)){
        error.password = "密碼輸入錯誤"
    }else {
        error.password = ""
    }
    return error;

}

export default Validation;