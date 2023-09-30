<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Superadmin;
use Illuminate\Support\Facades\Auth;

class SuperAdminController extends Controller
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

    public function promotion(Request $req)
    {
        if (Superadmin::where('user_id', $this->user->user_id)->exists()) {
            $admin = Admin::where('user_id', $req->user_id)->first();

            if (!$admin) {
                try {
                    Admin::create([
                        'user_id' => $req->user_id,
                        'type' => $req->type,
                    ]);
                } catch (\Exception $e) {
                    return response()->json(['error' => $e->getMessage()], 500);
                }
            } else {
                $admin->type = $req->type;
                $admin->save();
            }
            return response()->json(['message' => '管理提升更新/更新成功'], 200);
        } else {
            return response()->json(['message' => '你無權操作此功能'], 403);
        }
    }


    public function downgrade($user_id)
    {
        if (Superadmin::where('user_id', $this->user->user_id)->exists()) {
            $admin = Admin::where('user_id', $user_id)->first();
            if ($admin) {
                $admin->delete();
                return response()->json([], 200);
            } else {
                return response()->json(['message' => '查無此身分'], 404);
            }
        } else {
            return response()->json(['message' => '你無權操作此功能'], 403);
        }
    }
}
