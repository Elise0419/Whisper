<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function showarticle(Request $req, $page)
    {
        $admin = Admin::find(Auth::user()->user_id)->first();
        if (!$admin) {
            abort(403, '查無此身分');
        };
        $articles = Post::where('type', $admin->type)->paginate(20, ['*'], 'page', $page);
        return response()->json($articles);
    }
}
