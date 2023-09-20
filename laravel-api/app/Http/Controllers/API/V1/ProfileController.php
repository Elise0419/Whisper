<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            return $next($request);
        });
    }

    public function profile()
    {
        return response()->json(['user' => $this->user], 200);
    }

    public function emailchange(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $this->user->email = $req->email;
        $this->user->email_verified_at = null;
        $this->user->save();
        return response()->json(['message' => 'Email 已成功更新！請重新驗證信箱']);
    }

    public function headimgchange(Request $req)
    {
        $req->file('image')->store('headimg');

        $this->user->email = $req->email;
        $this->user->email_verified_at = null;
        $this->user->save();
        return response()->json(['message' => 'Email 已成功更新！請重新驗證信箱']);
    }

}
