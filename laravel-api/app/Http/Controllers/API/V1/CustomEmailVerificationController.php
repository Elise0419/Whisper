<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Notification;

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
            return response("<h1>未授權簽名</h1>");
        }

        $user = User::find($user_id);

        if ($user->email_verified_at) {
            return  response("<h1>此信箱已驗證完成</h1>");
        }

        if (!$user || !hash_equals($user->email_verified_token, $hash)) {
            return response("<h1>信箱驗證失敗，請重新確認</h1>");
        }

        // 標記信箱為已驗證
        $user->email_verified_at = now();
        $user->save();
        return response("<h1>已完成信箱驗證</h1>;<a href='http://localhost:3000/login'>點我回登入頁面</a>");
    }

    public function verifysending()
    {
        $user = Auth::user();
        Notification::send($user, new CustomVerifyEmail($user));
        return response()->json(['message' => '信件已發送，請至信箱確認']);
    }
    public function verifynotice()
    {
        return response()->json(['mseeage' => '請先完成信箱驗證'], 403);
    }
}
