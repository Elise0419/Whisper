<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['pwdfoget']]);
    }

    public function pwdreset(Request $req)
    {
        $user = Auth::user();
        $req->validate([
            'password' => 'required|string',
            'new_password' => 'required|string',
            'password_confirm' => 'required|string',
        ]);

        if (!Hash::check($req->new_password, $user->password)) {
            return response()->json(['message' => '密碼錯誤']);
        }

        if (Hash::check($req->new_password, $user->password)) {
            return response()->json(['message' => '新密碼不能與舊密碼相同']);
        }

        if ($req->new_password !== $req->password_confirm) {
            return response()->json(['message' => '新密碼與確認密碼有誤']);
        }

        $user->password = Hash::make($req->new_password);
        $user->save();
    }

    public function pwdfoget(Request $req)
    {
        $req->validate([
            'email' => 'required|string|email',
            'person_id' => 'required|string',
        ]);

        $credentials = $req->only('email', 'person_id');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => '查無用戶資料，請重新輸入',
            ]);
        }

        $user = User::where('email', $req->email)
            ->where('person_id', $req->person_id)
            ->first();
        $user->notify(new ForgotPasswordEmail($user, $token));


        return response()->json(['message' => '已將信件發送至信箱']);
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
    }
}
