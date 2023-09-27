<?php

namespace App\Models;

use App\Models\Comtxt;
use App\Models\Savepost;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // use HasFactory;
    protected $primaryKey = 'post_id';
    protected $table = 'posts';

    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'content',
        'imgurl',
        'tag',
        'post_time',
        'click',
        'thumb',
        'save',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comtxts()
    {
        return $this->hasMany(Comtxt::class, 'post_id');
    }

    public function saveposts()
    {
        return $this->belongsToMany(User::class, 'saveposts', 'post_id', 'user_id');
    }
    public function userSaveposts()
    {
        return $this->belongsToMany(Savepost::class);
    }

    public function tags()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }
}
