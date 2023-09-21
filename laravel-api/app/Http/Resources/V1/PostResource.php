<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'postId' => $this->post_id,
            'userId' => $this->user_id,
            // 'headImg' => $this->users->headimg,
            // 'memName' => $this->users->mem_name,
            'type' => $this->type,
            'title' => $this->title,
            'content' => $this->content,
            'imgUrl' => $this->imgurl,
            'thumb' => $this->thumb,
            'save' => $this->save,
            'click' => $this->click,
            'comtxtCount' => $this->comtxts->count(),
            'tag' => $this->tag,
            'postTime' => $this->post_time,
        ];

    }
}
