function Validation(values) {
    let error = {}
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // 要求密碼至少包含一個字母和一個數字，且總長度需達到 8 個字符以上。

    if (values.password === "") {
        error.password = "新密码不能为空";
    } else if (!password_pattern.test(values.password)) {
        error.password = "新密码至少包含一个字母和一个数字，且总长度需达到 8 个字符以上";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "两次输入的密码不一致";
    } else {
        error.password = "";
        error.confirmPassword = "";
    }
    return error;
}


export default Validation;