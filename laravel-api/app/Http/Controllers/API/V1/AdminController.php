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
    }
}
