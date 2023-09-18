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
}
