<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ComtxtCollection;
use App\Http\Resources\V1\ComtxtResource;
use App\Models\Comtxt;
use App\Services\V1\ComtxtQuery;
use Illuminate\Http\Request;

class ComtxtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ComtxtQuery();
        $queryItems = $filter->transform($request);

        Comtxt::where($queryItems);

        //check the input
        if (count($queryItems) == 0) {

            return new ComtxtCollection(Comtxt::all());

        } else {

            return new ComtxtCollection(Comtxt::where($queryItems)->orderby('created_at', 'desc')->get());

        }

        // $comtxts = Comtxt::orderBy('created_at', 'desc')->get();
        // return ComtxtResource::collection($comtxts);
        // return new ComtxtCollection(Comtxt::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createcomtxt(Request $request, $postId)
    {
        // var_dump($request);
        // $validatedData = $request->validate([
        //     'comment' => 'required|string|',
        //     'userId' => 'required|integer',
        // ]);

        $comment = new Comtxt();
        $comment->post_id = $postId;
        $comment->user_id = $request->input('userId');
        $comment->comment = $request->input('comment');
        $comment->save();

        return response()->json(['message' => '評論已新增！']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comtxt = Comtxt::with(['users', 'posts'])->findOrFail($id);

        return new ComtxtResource($comtxt);

        // return new ComtxtResource($comtxt);

    }

}
