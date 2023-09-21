<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'voteId' => $this->vote_id,
            'title' => $this->title,
            'type' => $this->type,
            'ansOne' => $this->ans_one,
            'ansTwo' => $this->ans_two,
            'ansOnePoint' => $this->ans_one_point,
            'ansTwoPoint' => $this->ans_two_point,

        ];

    }
}
