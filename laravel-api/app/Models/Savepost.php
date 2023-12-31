<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Savepost extends Model
{
    // use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'post_id',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'saveposts', 'user_id', 'post_id');
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'saveposts', 'user_id', 'post_id');
    }

}
