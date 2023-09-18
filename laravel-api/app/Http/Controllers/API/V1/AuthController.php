<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Notifications\CustomVerifyEmail;
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

        $credentials = $req->only('email', 'password');
        $token = Auth::attempt($credentials);


        if (!$token) {
            return response()->json([
                'message' => '使用者帳號密碼錯誤',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    // $token = auth()
    //     ->claims(['abc' => '123', 'def' => '456'])
    //     ->setTTL(6 * 31 * 24 * 60)
    //     ->attempt($credentials);
    // unix time  epoch time

    public function register(Request $req)
    {
        $req->validate([
            'mem_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

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
            'user' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
};