<!-- <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>验证邮箱地址</title>
</head>

<body>
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 100%;">
        <tr>
            <td align="center">
                <table align="center" class="content" width="600px" style="background-color: #ffffff; border-radius: 10px; margin: 20px auto; padding: 20px; ">
                    <tr align="center">
                        <td align="center">
                            <h1 align="center" style="color: #333;">驗證信箱地址</h1>
                            <p align="center">請點擊下方連結完成信箱驗證。</p>
                            <p align="center"><a align="center" href="{{ $actionUrl }}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">驗證信箱</a></p>
                            <p align="center">如果您未申請驗證，請忽略此郵件。</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html> -->


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Email Template</title>
    <style>
        body {
            text-align: center;
            margin: 0 auto;
            max-width: 600px;
        }
    </style>
</head>

<body>
    <header>
        <h1>WHISPER</h1>
    </header>

    <div style="align-items: center; width:100%">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 100%;">
            <tr>
                <td align="center">
                    <table align="center" class="content" width="600px" style="background-color: #ffffff; border-radius: 10px; margin: 20px auto; padding: 20px; ">
                        <tr align="center">
                            <td align="center">
                                <h1 align="center" style="color: #333;">驗證信箱地址</h1>
                                <p align="center">請點擊下方連結完成信箱驗證。</p>
                                <p align="center"><a align="center" href="{{ $actionUrl }}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">驗證信箱</a></p>
                                <p align="center">如果您未申請驗證，請忽略此郵件。</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <footer>
        <p>2023 Whipser,感謝您使用此網站</p>
    </footer>
</body>

</html>