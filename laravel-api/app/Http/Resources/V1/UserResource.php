<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "userId" => $this->user_id,
            "memName" => $this->mem_name,
            "personId" => $this->person_id,
            "gender" => $this->gender,
            "email" => $this->email,
            "password" => $this->pwd,
            "phone" => $this->phone,
            "headImg" => $this->headimg,
        ]; //if wanna fill down all datas like that, need to use resource/Collection
    }
}
