<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\PostResource;
use App\Models\Post;
use App\Services\V1\PostQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new PostQuery();
        $queryItems = $filter->transform($request);
        //['column', 'operator', 'value']
        // User::where(['column', 'operator', 'value']);
        Post::where($queryItems);
        //check the input
        if ($queryItems == 0) {
            // return new PostCollection(Post::all());
            $posts = Post::orderBy('post_time', 'desc')->take(16)->get();
            return PostResource::collection($posts);
        } else {
            return new PostCollection(Post::where($queryItems)->orderBy('post_time', 'desc')->take(16)->get());
        }
    }

    public function topposts1(Request $request)
    {
        $topPosts1 = Post::orderby('click', 'desc')->take(5)->get();
        return PostResource::collection($topPosts1);

    }
    public function topposts2(Request $request)
    {
        $topPosts2 = Post::orderby('thumb', 'desc')->take(5)->get();
        return PostResource::collection($topPosts2);

    }

    public function click(Request $request) //NEED POSTID
    {
        $postId = $request->input('postId');
        $post = Post::find($postId);

        if ($post) {
            $post->click += 1;
            $post->save();
            return response()->json(['message' => 'clicked !']);
        } else {
            return response()->json(['message' => 'not found!']);
        }
    }

    public function thumb(Request $request) //NEED POSTID
    {
        $postId = $request->input('postId');
        $thumb = $request->input('thumb');
        $post = Post::find($postId);
        if ($post) {
            if ($thumb) {
                $post->thumb += 1;
            } else {
                $post->thumb -= 1;
            }
            $post->save();
            return response()->json(['message' => 'updated!']);
        } else {
            return response()->json(['message' => 'not found!']);

        }

    }

    public function search(Request $request) //need check
    {
        $query = $request->input('query');
        var_dump($query);

        $searchResults = Post::where('content', 'like', "%$query%")
            ->orWhere('title', 'like', "%$query%")
            ->get();

        if ($searchResults->count() === 0) {
            return response()->json(['message' => '查無此貼文']);
        }

        return response()->json($searchResults);
    }

    public function upload(Request $request)
    {
        $userId = Auth::user()->user_id;
        $type = $request->input('type');
        $title = $request->input('title');
        $content = $request->input('content');
        $tag = $request->input('tag');
        $image = $request->file('image');
        $postTime = now();

        if ($image) {
            $imageName = $image->getClientOriginalName();
            $image->storeAs('images', $imageName, 'public');
            $imagePath = 'storage/images/' . $imageName;
        } else {
            $imagePath = null;
        }

        $post = new Post();
        $post->user_id = $userId;
        $post->type = $type;
        $post->title = $title;
        $post->content = $content;
        $post->imgurl = $imagePath;
        $post->tag = $tag;
        $post->post_time = $postTime;
        $post->save();

        return response()->json(['message' => 'uploaded!']);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with('users')->find($id);
        return new PostResource($post);

    }

    public function edit(Post $post)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if ($post) {
            $post->delete();

            return response()->json(['message' => 'deleted!']);
        } else {
            return response()->json(['message' => 'not found!']);
        }
    }

}
