<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\VoteResource;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function voteselect(Request $request, $type)
    {
        $votes = Vote::where('type', $type)->inRandomOrder()->take(1)->get();

        return VoteResource::collection($votes);

    }

    public function votesclick(Request $request, $voteId)
    {
        $vote = Vote::find($voteId);

    }

}
