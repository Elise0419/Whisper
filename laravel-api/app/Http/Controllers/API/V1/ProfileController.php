<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('verified', ['only' => ['profile']]);
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            return $next($request);
        });
    }

    public function profile(Request $req)
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
        if (!$req->base64Image) {
            return response()->json(['message' => '上傳失敗'], 400);
        }
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $req->base64Image)); // 解码Base64数据
        $filename = 'user_' . $this->user->user_id . '.jpg';
        $head_Path = 'public/user_head/'  . $filename;
        Storage::put($head_Path, $imageData);
        $this->user->headimg = 'http://10.10.247.90:8000/storage/user_head/' . $filename;
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
}
