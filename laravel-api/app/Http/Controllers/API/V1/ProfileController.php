<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function profile()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => '認證錯誤,請重新登入']);
        }
        return response()->json(['user' => $user], 200);
    }


    public function emailchange(Request $req)
    {
        $user = Auth::user();

        $validator = Validator::make($req->all(), [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user->email = $req->email;
        $user->email_verified_at = NULL;
        $user->save();
        return response()->json(['message' => 'Email 已成功更新！請重新驗證信箱']);
    }
}