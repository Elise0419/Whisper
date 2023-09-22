<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SavepostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'userId' => $this->users->user_id,
            'userInfo' => $this->users->mem_name,
            'postId' => $this->posts->post_id,
            'postInfo' => new PostResource($this->posts),
        ];
    }
}
