<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SavepostCollection;
use App\Models\Post;
use App\Models\Savepost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavepostController extends Controller
{
    public function index()
    {
        return new SavepostCollection(Savepost::all());
    }

    public function savepost(Request $request, $postId)
    {

        $userId = Auth::user()->user_id;
        if (!$userId) {
            return 'login';
        };

        $existingSave = Savepost::where('user_id', $userId)
            ->where('post_id', $postId)
            ->first();

        if (!$existingSave) {

            Savepost::create([
                'user_id' => $userId,
                'post_id' => $postId,
            ]);

            $save = Post::find($postId);
            $save->save += 1;
            $save->save();

            return response()->json(['message' => '貼文已收藏']);
        }

        return response()->json(['message' => '貼文已經被收藏過']);
    }

    public function userSaveposts()
    {
        $userId = Auth::user();
        if (!$userId) {
            return 'login';
        };
        $savepost = Savepost::with(['users', 'posts'])->where('user_id', $userId->user_id)->get();

        if ($savepost->isEmpty()) {
            return response()->json(['message' => '没有蒐藏任何貼文', 'count' => 0]);
        }

        return response()->json(['data' => new SavepostCollection($savepost), 'count' => $savepost->count()]);
    }

    public function delete($postId)
    {
        $userId = Auth::user()->user_id;
        if (!$userId) {
            return 'login';
        }

        $savepost = Savepost::where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        if ($savepost) {
            $savepost->delete();
            return response()->json(['message' => 'Deleted!']);
        } else {
            return response()->json(['message' => 'Not found!'], 404);
        }
    }
    // public function show($id)
    // {
    //     $savepost = Savepost::with(['users', 'posts'])->findOrFail($id);

    //     return new SavepostResource($savepost);
    // }

}
