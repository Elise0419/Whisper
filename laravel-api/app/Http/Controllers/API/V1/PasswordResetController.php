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

class PasswordResetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['pwdfogot']]);
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

        $token = JWTAuth::fromUser($additionalUser);

        if (!$token) {
            return response()->json([
                'message' => '查無用戶資料，請重新輸入',
            ], 404);
        }

        $additionalUser->notify(new ForgotPasswordEmail($token));

        return response()->json(
            ['message' => '已將信件發送至信箱'],
            200
        );
    }

    public function pwdfogetreset(Request $req)
    {
        $req->validate([
            'new_password' => 'required|string',
            'password_confirm' => 'required|string',
        ]);

        if ($req->new_password !== $req->password_confirm) {
            return response()->json(['message' => '新密碼與確認密碼有誤']);
        }

        $user_pwd = Auth::user();
        $user_pwd->password = Hash::make($req->new_password);
        $user_pwd->save();
        Auth::logout();
        return response()->json(['message' => '已重新修改密碼，請重新登入'], 200);
    }
}
