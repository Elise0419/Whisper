<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $req)
    {
        $req->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if (!User::where('email', $req->email)->first()) {
            return response()->json([
                'acm_error' => '查無此帳號'
            ], 404);
        }

        $credentials = $req->only('email', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'pwd_error' => '密碼錯誤，請重新輸入',
            ], 401);
        }

        $user = Auth::user();
        $user->login_time = now();
        $user->save();

        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ],
        ], 200);
    }

    public function register(Request $req)
    {
        $req->validate([
            'mem_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'person_id' => 'required|onlyfemale'
        ]);

        if ($req->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $req->errors(),
            ], 422);
        }

        if (User::where('email', $req->email)->exists()) {
            return response()->json([
                'message' => '此信箱已註冊過',
            ], 200);
        }

        if (User::where('person_id', $req->person_id)->exists()) {
            return response()->json([
                'message' => '此身分證已註冊過',
            ], 200);
        }

        $user = User::create([
            'mem_name' => $req->mem_name,
            'person_id' => $req->person_id,
            'email' => $req->email,
            'phone' => $req->phone,
            'headimg' => $req->headimg,
            'password' => Hash::make($req->password),
            'email_verified_token' => Str::random(60),
        ]);

        $user->notify(new CustomVerifyEmail($user));

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 200);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->logout_time = now();
        $user->save();
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ],
        ]);
    }
};
