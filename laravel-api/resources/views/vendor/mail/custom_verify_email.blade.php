<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>验证邮箱地址</title>
</head>

<body>
    <table class="wrapper" width="100%" height="400px" style="background-color: #f3f3f3;">
        <tr>
            <td align="center">
                <table class="content" width="600px" style="background-color: #ffffff; border-radius: 10px; margin: 20px auto; padding: 20px; ">
                    <tr>
                        <td>
                            <h1 style="color: #333;">验证邮箱地址</h1>
                            <p>请点击下面的链接验证您的邮箱地址。</p>
                            <p><a href="{{ $actionUrl }}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">验证邮箱</a></p>
                            <p>如果您未请求此验证，请忽略此邮件。</p>
                            <p>感谢您使用我们的应用程序！</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>