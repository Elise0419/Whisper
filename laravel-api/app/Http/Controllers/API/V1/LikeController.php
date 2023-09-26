<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function thumb(Request $request, $postId)
    {

        if (Auth::check()) {
            $user_id = Auth::user()->user_id;
            $like = Like::where('user_id', $user_id)->where('post_id', $postId)->first();
            if ($request->isLiked) {
                if ($like) {
                    $like->delete();
                    return response()->json(['message' => '取消点赞成功'], 200);
                } else {
                    return response()->json(['message' => '点赞不存在'], 404);
                }
            } else {
                if (!$like) {
                    Like::create([
                        'user_id' => $user_id,
                        'post_id' => $postId,
                    ]);
                }
                return response()->json(['message' => '点赞成功'], 200);
            }
        } else {
            return response()->json([], 401);
        }

        // if (Auth::check()) {
        //     $userId = Auth::user()->user_id;

        //     $existingLike = Like::where('user_id', $userId)
        //         ->where('post_id', $postId)
        //         ->first();

        //     if (!$existingLike) {
        //         Like::create([
        //             'user_id' => $userId,
        //             'post_id' => $postId,
        //         ]);

        //         $post = Post::find($postId);

        //         if ($post) {
        //             $post->thumb += 1;
        //             $post->save();
        //             return response()->json(['message' => 'Liked successfully!']);
        //         } else {
        //             return response()->json(['message' => 'Post not found!'], 404);
        //         }
        //     } else {

        //         $existingLike->delete();
        //         $post = Post::find($postId);
        //         if ($post) {
        //             $post->thumb -= 1;
        //             $post->save();
        //             return response()->json(['message' => 'Unliked successfully!']);
        //         } else {
        //             return response()->json(['message' => 'Post not found!'], 404);
        //         }
        //     }
        // } else {
        //     return response()->json(['message' => 'Login required'], 401);
        // }
    }
}
