<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComtxtResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'postId' => $this->post_id,
            'memName' => $this->users->mem_name,
            'comment' => $this->comment,
            'createdTime' => $this->created_at,
            'updateTime' => $this->updated_at,

        ];

    }
}
