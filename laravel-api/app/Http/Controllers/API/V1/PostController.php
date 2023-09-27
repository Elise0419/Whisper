<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\PostResource;
use App\Models\Post;
use App\Services\V1\PostQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostController extends Controller
{

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

    public function click(Request $request, $postId) //NEED POSTID
    {
        $post = Post::find($postId);

        if ($post) {
            $post->click += 1;
            $post->save();
            return response()->json(['message' => 'clicked !']);
        } else {
            return response()->json(['message' => 'not found!']);
        }
    }

    public function search(Request $request)
    {
        //  let apiUrl = `/search?query=${query}`;
        // if (type) {apiUrl += `&type=${type}`};

        $query = $request->input('query');
        $type = $request->input('type');

        $searchResults = Post::query();

        if ($type) {
            $searchResults->where('type', $type);
        }

        $searchResults = $searchResults->where(function ($queryBuilder) use ($query) {
            $queryBuilder->where('content', 'like', "%$query%")
                ->orWhere('title', 'like', "%$query%");
        })->get();

        if ($searchResults->count() === 0) {
            return response()->json(['message' => 'Post not found!']);
        }

        return PostResource::collection($searchResults);
    }

    public function upload(Request $request, $type)
    {

        $userId = Auth::user();
        if (!$userId) {
            return 'login';
        };
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
        $post->user_id = $userId->user_id;
        $post->type = $type;
        $post->title = $title;
        $post->content = $content;
        // $post->imgurl = $imagePath;
        $post->tag = $tag;
        $post->post_time = $postTime;
        $post->save();
        return new PostResource($post);
    }

    public function getUserPosts(Request $request)
    {
        $userId = Auth::user()->user_id;
        if (!$userId) {
            return 'login';
        };
        $posts = Post::where('user_id', $userId)->get();
        $postCount = $posts->count();

        return response()->json([
            'postCount' => $postCount,
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function poststype($postId, $type)
    {
        $post = Post::with('users', 'likes')->where('post_id', $postId)->where('type', $type)->first();

        if (!$post) {
            return response()->json(['message' => 'not found !'], 404);
        }

        $post->onLogin = false;
        $post->isLiked = false;
        $post->isFavorite = false;

        try {
            $user = JWTAuth::parseToken()->authenticate();
            if ($user) {
                $like = $post->likes->contains($user->user_id);
                $save = $post->saveposts->contains($user->user_id);
                $post->isFavorite = $save;
                $post->isLiked = $like;
                $post->onLogin = true;
            }
        } catch (\Exception $e) {
            return new PostResource($post);
        }

        return new PostResource($post);
    }

    public function updatepost(Request $request, $postId)
    {
        $userId = Auth::user();
        if (!$userId) {
            return 'login';
        };

        $post = Post::find($postId);

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $originalData = $post->toArray();
        $updatedData = array_merge($originalData, $request->all());
        $post->update($updatedData);

        return response()->json(['message' => 'Post updated successfully', 'data' => $post]);
    }

    public function show($id)
    {
        $post = Post::with('users')->find($id);

        return new PostResource($post);
    }

    public function destroy($postId)
    {
        $userId = Auth::user()->user_id;
        if (!$userId) {
            return 'login';
        };

        $post = Post::find($postId);
        if ($post) {
            $post->delete();

            return response()->json(['message' => 'deleted!']);
        } else {
            return response()->json(['message' => 'not found!']);
        }
    }
}
