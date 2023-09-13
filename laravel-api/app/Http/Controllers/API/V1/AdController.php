<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;
use App\Http\Resources\V1\AdCollection;
use App\Http\Resources\V1\AdResource;
use App\Models\Ad;
use App\Services\V1\AdQuery;
use Illuminate\Http\Request;

class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new AdQuery();
        $queryItems = $filter->transform($request);
        Ad::where($queryItems);
        //check the input
        if (count($queryItems) == 0) {

            return new AdCollection(Ad::all());

        } else {

            return new AdCollection(Ad::where($queryItems)->take(3)->get());

        }
        // $posts = Post::all();
        // return response()->json($posts);
    }
    // return Ad::all();

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Ad $ad)
    {

        return new AdResource($ad);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ad $ad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdRequest $request, Ad $ad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        //
    }
}
