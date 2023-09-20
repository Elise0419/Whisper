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
    protected $fillable = ['click'];
    public $timestamps = false;

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
        return $this->hasMany(Savepost::class);
    }
    public function tags()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }

}
