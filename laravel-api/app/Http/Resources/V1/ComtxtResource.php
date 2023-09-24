<?php

namespace App\Http\Resources\V1;

use App\Http\Resources\V1\PostResource;
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
            'postInfo' => new PostResource($this->posts),
            'headImg' => $this->users->headimg,
            'comtxtName' => $this->users->mem_name,
            'comment' => $this->comment,
            'createdTime' => $this->created_at->format('Y-m-d H:i:s'),
            'updateTime' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,

        ];

    }
}
