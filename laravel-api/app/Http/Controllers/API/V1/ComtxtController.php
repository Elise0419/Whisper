<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComtxtRequest;
use App\Http\Requests\UpdateComtxtRequest;
use App\Http\Resources\V1\ComtxtCollection;
use App\Http\Resources\V1\ComtxtResource;
use App\Models\Comtxt;

class ComtxtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ComtxtCollection(Comtxt::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComtxtRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comtxt = Comtxt::with('users')->find($id);

        return new ComtxtResource($comtxt);

        // return new ComtxtResource($comtxt);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comtxt $comtxt)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComtxtRequest $request, Comtxt $comtxt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comtxt $comtxt)
    {
        //
    }
}
