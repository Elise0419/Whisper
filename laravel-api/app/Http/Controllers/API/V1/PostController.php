<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\PostResource;
use App\Models\Post;
use App\Models\Tag;
use App\Services\V1\PostQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Pagination\Paginator;

class PostController extends Controller
{

    public function index(Request $request)
    {
        $filter = new PostQuery();
        $queryItems = $filter->transform($request);
        // $page = $request->query('page', 1);
        //['column', 'operator', 'value']
        // User::where(['column', 'operator', 'value']);
        Post::where($queryItems);
        //check the input
        if ($queryItems == 0) {
            // return new PostCollection(Post::all());
            $posts = Post::orderBy('post_time', 'desc')->get();
            return PostResource::collection($posts);
        } else {
            return new PostCollection(Post::where($queryItems)->orderBy('post_time', 'desc')->get());
        }
    }

    public function page($page)
    {
        if ($page < 1) {
            $page = 1;
        }
        $posts = Post::with('users:user_id,headimg')->withCount('comtxts')->orderBy('post_time', 'desc')->paginate(16, ['*'], 'page', $page);
        if ($page > $posts->lastPage()) {
            $page = $posts->lastPage();
            $posts = Post::with('users:user_id,headimg')->withCount('comtxts')->orderBy('post_time', 'desc')->paginate(16, ['*'], 'page', $page);
        }

        return response()->json(['post' => $posts]);
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

        $searchResults = Post::query()->with('users:user_id,headimg')->withCount('comtxts');

        if ($type) {
            $searchResults->where('type', $type);
        }

        $searchResults = $searchResults->where(function ($queryBuilder) use ($query) {
            $queryBuilder->where('content', 'like', "%$query%")
                ->orWhere('title', 'like', "%$query%");
        })->paginate(16);

        if ($searchResults->isEmpty()) {
            return response()->json(['message' => 'Post not found!']);
        }

        // return PostResource::collection($searchResults);
        return response()->json(['pages' => $searchResults]);
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
            //     $imagePath = 'storage/images/' . $imageName;
            // } else {
            //     $imagePath = null;
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

    public function reupload(Request $request, $postid)
    {
        $user = Auth::user();
        if (!$user) {
            return 'login';
        };
        $post = Post::where('post_id', $postid)->where('user_id', $user->user_id)->first();
        if (!$post) {
            return response()->json([], 404);
        }

        $title = $request->input('title');
        $content = $request->input('content');
        $tag = $request->input('tag');
        $image = $request->file('image');
        $postTime = now();
        if ($image) {
            $imageName = $image->getClientOriginalName();
            $image->storeAs('images', $imageName, 'public');
        }
        $post->title = $title;
        $post->content = $content;
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

    public function edition($postID)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user()->user_id;

        $post = Post::where('post_id', $postID)->where('user_id', $user)->first();
        // return ($post);

        if ($post->user_id === $user) {
            $tags = Tag::where('type', $post->type)->inRandomOrder()->take(6)->get();
            return response()->json(['post' => $post, 'tags' => $tags]);
        } else {
            return response()->json(['message' => 'not found!']);
        }
    }
}
