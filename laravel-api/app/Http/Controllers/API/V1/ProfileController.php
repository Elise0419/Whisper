<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Admin;
use App\Models\Superadmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['emailcheck', 'idcheck']]);
        $this->middleware('verified', ['only' => ['profile']]);
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            return $next($request);
        });
    }

    public function profile()
    {
        if (!$this->user) {
            return response()->json(['message' => '未登入'], 401);
        }

        $admin = Admin::where('user_id', $this->user->user_id)->exists();
        if ($admin) {
            $this->user->admin = $admin;
        }
        $superadmin = Superadmin::where('user_id', $this->user->user_id)->exists();
        if ($superadmin) {
            $this->user->superadmin = $superadmin;
        }

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
        if (!$req->base64Image) {
            return response()->json(['message' => '上傳失敗'], 400);
        }
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $req->base64Image)); // 解码Base64数据
        $filename = 'user_' . $this->user->user_id . '.jpg';
        $head_Path = 'public/user_head/' . $filename;
        Storage::put($head_Path, $imageData);
        $this->user->headimg = 'http://118.233.222.23:8000/storage/user_head/' . $filename;
        $this->user->save();
        return response()->json(['message' => '上傳成功'], 200);
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
    public function namechange(Request $req)
    {
        $this->user->mem_name = $req->mem_name;
        $this->user->save();
        return response()->json(['message' => '已成功更改用戶名稱'], 201);
    }

    public function promisechange(Request $req)
    {
        $this->user->promise = $req->promise;
        $this->user->save();
        return response()->json(['message' => '已成功更改你的用戶聲明'], 201);
    }


    public function emailcheck(Request $req)
    {
        $email = $req->input('email');
        $result = User::where('email', $email)->exists();
        if ($result) {
            return response()->json([
                'message' => '此信箱已被使用',
                'result' => $result
            ], 401);
        } else {
            return response()->json([
                'message' => '你可以使用此信箱',
                'result' => false,
            ], 200);
        }
    }

    public function idcheck(Request $req)
    {

        $result = User::where('email', $req->input('pserson_id'))->exists();
        if ($result) {
            return response()->json([
                'message' => '此身分證字號已註冊過',
                'result' => $result
            ], 200);
        } else {
            return response()->json([
                'message' => '你可以使用此身分證字號',
                'result' => false,
            ], 200);
        }
    }
}
