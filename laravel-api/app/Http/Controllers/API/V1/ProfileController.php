<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use App\Services\V1\UserQuery;
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



    public function index(Request $request)
    {
        $filter = new UserQuery();
        $queryItems = $filter->transform($request);
        //['column', 'operator', 'value']
        // User::where(['column', 'operator', 'value']);
        User::where($queryItems);

        //check the input
        if (count($queryItems) == 0) {

            return new UserCollection(User::all());
        } else {

            return new UserCollection(User::where($queryItems)->get());
        }
    }
    public function show(User $user)
    {
        return new UserResource($user);
        //note use the url add /{id} could pick the specific data
    }
}
