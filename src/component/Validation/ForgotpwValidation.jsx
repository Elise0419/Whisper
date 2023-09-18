function Validation(values){
    let error = {}
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}$/;
    const idNumber_pattern = /^[A-Z][12]\d{8}$/;

    if(values.email === ""){
        error.email = "email不該為空,請輸入email";
    }
    else if (!email_pattern.test(values.email)){
        error.email = "email輸入錯誤";
    } else {
        error.email = "";
    }

    if(values.idNumber === ""){
        error.idNumber = "身份證字號不該為空,請輸入身份證字號";
    } else if (!idNumber_pattern.test(values.idNumber)){
        error.idNumber = "身份證字號輸入錯誤";
    } else {
        error.idNumber = "";
    }

    return error; // 添加这一行来返回错误对象
}

export default Validation;
