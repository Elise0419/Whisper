<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
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

            return new AdCollection(Ad::where($queryItems)->inRandomOrder()->take(3)->get());

        }
    }

    public function show(Ad $ad)
    {

        return new AdResource($ad);
    }

}
