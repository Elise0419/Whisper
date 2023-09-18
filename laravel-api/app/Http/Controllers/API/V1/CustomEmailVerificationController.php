<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\User;


class CustomEmailVerificationController extends Controller
{
    /**
     * Handle the email verification request.
     *
     * @param  \Illuminate\Foundation\Auth\EmailVerificationRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verify(Request $req, $user_id, $hash)
    {
        if (!URL::hasValidSignature($req)) {
            return response()->json(['message' => '未授權簽證'], 400);
        }

        $user = User::find($user_id);

        if ($user->email_verified_at) {
            return response()->json(['message' => '信箱已驗證過'], 201);
        }


        if (!$user || !hash_equals($user->email_verified_token, $hash)) {
            return response()->json(['message' => '發生錯誤,請重新確認'], 400);
        }

        // 標記信箱為已驗證
        $user->email_verified_at = now();
        $user->save();
    }
}
