<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\RuleCollection;
use App\Models\Rule;
use App\Services\V1\RuleQuery;
use Illuminate\Http\Request;

class RuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $filter = new RuleQuery();
        $queryItems = $filter->transform($request);

        Rule::where($queryItems);

        if (count($queryItems) == 0) {

            return new RuleCollection(Rule::all());

        } else {

            return new RuleCollection(Rule::where($queryItems)->get());

        }

    }

}
