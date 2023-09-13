<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comtxt extends Model
{
    // use HasFactory;
    public function posts()
    {
        return $this->belongsTo(Post::class);
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
