<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserCollection;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use App\Services\V1\UserQuery;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
        // $posts = Post::all();
        // return response()->json($posts);

        // (before query)return new UserCollection(User::all());
        // $users = User::all();
        // return response()->json($users);
        //note the format should be change to camelcase
        //CHECK RESOURCE
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }
    public function show(User $user)
    {
        return new UserResource($user);
        //note use the url add /{id} could pick the specific data
    }

}
