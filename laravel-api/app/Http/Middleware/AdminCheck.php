<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $req, Closure $next)
    {
        $user = Auth::user();
        if (!Admin::where('user_id', $user->user_id)) {
            return response()->json(['message' => '權限不足，無法使用該功能'], 403);
        }
        if (!Hash::check($req->new_password, $user->password)) {
            return response()->json(['message' => '密碼錯誤'], 401);
        }
        if ($user && Admin::where('user_id', $user->user_id)->exists()) {
            return $next($req);
        }
    }
}
