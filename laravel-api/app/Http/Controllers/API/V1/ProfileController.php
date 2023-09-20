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
        $validator = Validator::make($req->email, [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $this->user->email = $req->email;
        $this->user->email_verified_at = null;
        $this->user->save();
        return response()->json(['message' => '信箱已成功更新！請重新驗證信箱'], 201);
    }

    public function headimgchange(Request $req)
    {
        if ($req->hasFile('head_img')) {
            $head_img = $req->file('head_img');
            $head_Path = $head_img->storeAs('public/user_head', 'user_' . $this->user->user_id . '.' . $head_img->getClientOriginalExtension());

            // 更新用戶的頭像路徑
            $this->user->headimg = $head_Path;
            $this->user->save();
            return response()->json(['message' => '已更換新的頭像'], 201);
        }

        return response()->json(['message' => '未上傳頭像文件'], 400);
    }

    public function phonechange(Request $req)
    {
        $this->user->phone = $req->phone;
        $this->user->save();
        return response()->json(['message' => '已成功更改手機號碼'], 201);
    }

    public function idchange(Request $req)
    {
        $this->user->person_id = $req->person_id;
        $this->user->save();
        return response()->json(['message' => '已成功更改身分證字號'], 201);
    }

}
