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
            return response()->json(['message' => '未授權簽證'], 401);
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
        return response()->json(['message' => '已完成信箱驗證'], 200);
    }

    public function verifysending()
    {
        $user = Auth::user();
        Notification::send($user, new CustomVerifyEmail($user));
        return response()->json(['message' => '信件已發送，請至信箱確認']);
    }
}
