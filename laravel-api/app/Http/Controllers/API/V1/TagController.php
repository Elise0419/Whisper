<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;

class TagController extends Controller
{
    public function getTags($type)
    {

        $tags = Tag::where('type', $type)->distinct()->inRandomOrder()->take(6)->pluck('tag');
        // $tags = Tag::where('type', $type)->inRandomOrder()->take(6)->get();
        return response()->json(['tags' => $tags]);
    }
}
