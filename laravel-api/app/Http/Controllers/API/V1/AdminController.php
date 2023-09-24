<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function showarticle(Request $req, $page)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => '無權造訪',
            ], 403);
        };

        $posts = Post::paginate(20, ['*'], 'page', $page);

        foreach ($posts as $post) {
            echo $post->title; // 访问每个 Post 的属性，例如 title
        }
    }
}
