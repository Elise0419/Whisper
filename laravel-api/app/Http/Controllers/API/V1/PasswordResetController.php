<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ForgotPasswordEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['pwdforgot']]);
    }

    public function pwdreset(Request $req)
    {
        $user = Auth::user();
        $req->validate([
            'password' => 'required|string',
            'new_password' => 'required|string',
            'password_confirm' => 'required|string',
        ]);

        if (!Hash::check($req->password, $user->password)) {
            return response()->json(['message' => '密碼錯誤'], 400);
        }

        if (Hash::check($req->new_password, $user->password)) {
            return response()->json(['message' => '新密碼不能與舊密碼相同'], 400);
        }

        if ($req->new_password !== $req->password_confirm) {
            return response()->json(['message' => '新密碼與確認密碼有誤'], 400);
        }

        $user->password = Hash::make($req->new_password);
        $user->save();
        Auth::logout();
        return response()->json([
            'message' => '密碼已修改成功，請重新登入',
        ], 200);
    }

    public function pwdforgot(Request $req)
    {
        $req->validate([
            'email' => 'required|string|email',
            'person_id' => 'required|string',
        ]);

        $additionalUser = User::where('email', $req->email)
            ->where('person_id', $req->person_id)
            ->first();

        if (!$additionalUser) {
            return response()->json([
                'message' => '查無用戶資料，請重新輸入',
            ], 404);
        }

        $token = JWTAuth::fromUser($additionalUser);

        $additionalUser->notify(new ForgotPasswordEmail($token));
        // Notification::send($additionalUser, new ForgotPasswordEmail($token));

        return response()->json(
            ['message' => '已將信件發送至信箱'],
            200
        );
    }

    public function pwdforgetreset(Request $req, $expires, $signature)
    {
        $authorizationHeader = request()->header('Authorization');
        $token = Str::substr($authorizationHeader, 7);
        $dataToSign = implode('|', ['token' => $token]);
        $signaturecheck = hash('sha256', $dataToSign);

        if ($signaturecheck != $signature) {
            return response()->json(['message' => '链接签名无效'], 402);
        }

        if (strtotime($expires) > now()->timestamp) {
            return response()->json(['message' => '链接已过期'], 402);
        }


        $req->validate([
            'new_password' => 'required|string',
            'password_confirm' => 'required|string',
        ]);

        if ($req->new_password !== $req->password_confirm) {
            return response()->json(['message' => '新密碼與確認密碼有誤'], 400);
        }
        $user_pwd = Auth::user();
        $user_pwd->password = Hash::make($req->new_password);
        $user_pwd->save();
        Auth::logout();

        return response()->json(['message' => '已重新修改密碼，請重新登入'], 200);
    }
}
