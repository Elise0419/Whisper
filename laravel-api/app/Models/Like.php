<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'post_id',
        'user_id',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    }
}
