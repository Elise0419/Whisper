<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comtxt extends Model
{
    // use HasFactory;

    public $timestamps = true;

    protected $table = 'comtxts';

    protected $fillable = [
        'post_id',
        'user_id',
        'comment',
    ];

    public function posts()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
