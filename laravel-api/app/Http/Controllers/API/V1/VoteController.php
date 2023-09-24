<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\VoteResource;
use App\Models\Vote;
use App\Models\Votesdata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function voteselect(Request $request, $type)
    {
        $votes = Vote::where('type', $type)->inRandomOrder()->take(1)->get();

        return VoteResource::collection($votes);

    }

    public function votesclick(Request $request, $voteId)
    {
        $userId = Auth::user()->user_id;
        if (!$userId) {
            return 'login';
        };
        $existingVoteRecord = Votesdata::where('user_id', $userId)
            ->where('vote_id', $voteId)
            ->first();

        if ($existingVoteRecord) {

            return response()->json(['message' => 'cannot vote again !'], 400);
        }
        Votesdata::create([
            'user_id' => $userId,
            'vote_id' => $voteId,
            'voted_at' => now(),
        ]);

        $selectedOption1 = $request->input('ansOne');
        $selectedOption2 = $request->input('ansTwo');
        $vote = Vote::find($voteId);
        // dd($vote);
        if (!$vote) {
            return response()->json(['message' => 'not found!'], 404);
        }

        $ans1Clicks = $vote->ans_one_point;
        $ans2Clicks = $vote->ans_two_point;

        if ($selectedOption1) {

            $vote->ans_one_point++;
            $vote->ans_two_point--;

        } elseif ($selectedOption2) {

            $vote->ans_two_point++;
            $vote->ans_one_point--;
        }

        $vote->save();

        if (($ans1Clicks + $ans2Clicks) === 100) {

            return response()->json(['message' => '投票成功！']);
        } else {

            return response()->json(['message' => '投票失败 !'], 400);
        }

    }
    // public function votesclick(Request $request, $voteId)
    // {
    //     try {
    //         dd('投票 ID:', $voteId);
    //         $vote = Vote::find($voteId);
    //         dd('投票记录:', $vote);
    //     } catch (\Exception $e) {
    //         dd('异常:', $e->getMessage());
    //     }
    // }

}
