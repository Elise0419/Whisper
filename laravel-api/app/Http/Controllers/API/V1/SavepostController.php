<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SavepostCollection;
use App\Http\Resources\V1\SavepostResource;
use App\Models\Post;
use App\Models\Savepost;
use App\Models\User;
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
        if (Auth::check()) {

            $user_id = Auth::user()->user_id;
            $post = Post::find($postId);
            $save = Savepost::where('user_id', $user_id)->where('post_id', $postId)->first();
            if ($request->isFavorite === true) {

                if (!$save) {

                    Savepost::create([
                        'user_id' => $user_id,
                        'post_id' => $postId,
                    ]);
                    $post->save += 1;
                    $post->save();

                    return response()->json(['save' => $post->save], 200);
                } else {

                    return response()->json([], 409);
                }
            } else if ($request->isFavorite === false) {

                if ($save) {
                    $save->delete();
                    $post->save -= 1;
                    $post->save();

                    return response()->json(['save' => $post->save], 200);
                } else {

                    return response()->json([], 404);
                }
            }
        } else {

            return response()->json([], 401);
        }

    }
    public function userSaveposts()
    {
        $user = Auth::user();

        if ($user) {
            $userposts = User::where('user_id', $user->user_id)->get();
            $userposts->saveposts();
        }

        if ($userposts->isEmpty()) {
            return response()->json(['message' => '没有蒐藏任何貼文', 'count' => 0]);
        }

        return response()->json(['data' => new SavepostResource($userposts), 'count' => $userposts->count()]);
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

// public function savepost(Request $request, $postId)
// {

//     $existingSave = Savepost::where('user_id', $userId)
//         ->where('post_id', $postId)
//         ->first();

//     if (!$existingSave) {

//         Savepost::create([
//             'user_id' => $userId,
//             'post_id' => $postId,
//         ]);

//         $save = Post::find($postId);
//         $save->save += 1;
//         $save->save();

//         return response()->json(['message' => '貼文已收藏']);
//     }

//     return response()->json(['message' => '貼文已經被收藏過']);
// }

}
