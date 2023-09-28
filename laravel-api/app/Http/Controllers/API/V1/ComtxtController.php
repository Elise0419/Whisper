<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ComtxtCollection;
use App\Http\Resources\V1\ComtxtResource;
use App\Models\Comtxt;
use App\Services\V1\ComtxtQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComtxtController extends Controller
{
    public function index(Request $request)
    {
        $filter = new ComtxtQuery();
        $queryItems = $filter->transform($request);

        Comtxt::where($queryItems);

        //check the input
        if (count($queryItems) == 0) {

            return new ComtxtCollection(Comtxt::all());
        } else {

            return new ComtxtCollection(Comtxt::where($queryItems)->orderby('created_at', 'desc')->get());
        }
    }

    public function createcomtxt(Request $request, $postId)
    {
        $userId = Auth::user();
        if (!$userId) {
            return 'login';
        };
        $comment = new Comtxt();
        $comment->post_id = $postId;
        $comment->user_id = Auth::user()->user_id;
        $comment->comment = $request->input('comment');
        $comment->created_at = now();
        $comment->updated_at = now();
        $comment->save();

        return response()->json(['message' => '評論已新增！']);
    }

    public function updatecomtxt(Request $request, $id)
    { //$request is json
        if (!Auth::check()) {
            return response()->json(['message' => 'You need to login !'], 401);
        }

        $comment = Comtxt::find($id);

        if (!$comment) {
            return response()->json(['message' => 'not found'], 404);
        }
        if ($comment->user_id !== Auth::user()->user_id) {
            return response()->json(['message' => 'You are not the original user'], 403);
        }
        $comment->comment = $request->input('comment');
        $comment->updated_at = now();
        $comment->save();

        return response()->json(['message' => 'comtxt updated !']);
    }

    public function show($id)
    {
        $comtxt = Comtxt::with(['users', 'posts'])->findOrFail($id);

        return new ComtxtResource($comtxt);
    }
}
