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
        $postId = $this->post_id;
        return [
            'isLike' => $this->isLiked,
            'isFavorite' => $this->isFavorite,
            'login' => $this->onLogin,
            'postId' => $this->post_id,
            'userId' => $this->user_id,
            'headImg' => $this->users->headimg,
            'memName' => $this->users->mem_name,
            'type' => $this->type,
            'title' => $this->title,
            'content' => $this->content,
            'imgUrl' => $this->imgurl,
            'thumb' => $this->thumb,
            'save' => $this->save,
            'comtxtCount' => $this->comtxts->count(),
            'tag' => $this->tag,
            'postTime' => $this->post_time,
            'updateTime' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
