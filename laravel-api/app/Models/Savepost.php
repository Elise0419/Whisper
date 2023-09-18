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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function posts()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

}