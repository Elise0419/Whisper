<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SavepostCollection;
use App\Http\Resources\V1\SavepostResource;
use App\Models\Post;
use App\Models\Savepost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavepostController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new SavepostCollection(Savepost::all());
    }

    public function savepost(Request $request, $postId)
    {

        $userId = Auth::user()->user_id; //
        if (!$userId) {
            return response()->json(['message' => '你沒登入'], 403);
        }

        // 檢查用戶是否已經保存了這個貼文
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

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $savepost = Savepost::with(['users', 'posts'])->findOrFail($id);

        return new SavepostResource($savepost);
    }

}
