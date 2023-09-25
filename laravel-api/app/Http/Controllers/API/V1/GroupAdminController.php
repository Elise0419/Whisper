<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Post;
use App\Models\Comtxt;
use Illuminate\Support\Facades\Auth;

class GroupAdminController extends Controller
{
    protected $user_id;
    protected $admin;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user_id = Auth::user()->user_id;
            $this->admin = Admin::where('user_id', $this->user_id)->first();
            if (!$this->admin) {
                return response()->json(['message' => '查無此身分'], 404);
            };
            return $next($request);
        });
    }

    public function showarticles($page)
    {
        $articles = Post::with(['users:user_id,mem_name'])->where('type', $this->admin->type)->paginate(20, ['*'], 'page', $page);
        return response()->json(['articles' => $articles], 200);
    }

    public function showcomments($id, $page)
    {
        $Comments = Comtxt::with(['users:user_id,mem_name'])->where('post_id', $id)->paginate(20, ['*'], 'page',);
        return response()->json(['comments' => $Comments], 200);
    }

    public function deletearticle($id)
    {
        $post = Post::where('post_id', $id)->firstOrFail();
        if (!$post) {
            return response()->json(['message' => '查無此貼文'], 404);
        }
        $post->delete();
        return response()->json([], 204);
    }

    public function deletecomment($coment_id)
    {
        $Comment = Comtxt::where('id', $coment_id)->firstOrFail();
        if (!$Comment) {
            return response()->json(['message' => '查無此留言'], 404);
        }
        $Comment->delete();
        return response()->json([], 204);
    }
}
