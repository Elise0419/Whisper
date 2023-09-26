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
            $userId = Auth::user()->user_id;

            $existingLike = Like::where('user_id', $userId)
                ->where('post_id', $postId)
                ->first();

            if (!$existingLike) {
                Like::create([
                    'user_id' => $userId,
                    'post_id' => $postId,
                ]);

                $post = Post::find($postId);

                if ($post) {
                    $post->thumb += 1;
                    $post->save();
                    return response()->json(['message' => 'Liked successfully!']);
                } else {
                    return response()->json(['message' => 'Post not found!'], 404);
                }
            } else {

                $existingLike->delete();
                $post = Post::find($postId);
                if ($post) {
                    $post->thumb -= 1;
                    $post->save();
                    return response()->json(['message' => 'Unliked successfully!']);
                } else {
                    return response()->json(['message' => 'Post not found!'], 404);
                }
            }
        } else {
            return response()->json(['message' => 'Login required'], 401);
        }
    }
}
