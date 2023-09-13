<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // use HasFactory;
    protected $primaryKey = 'post_id';

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function comtxts()
    {
        return $this->hasMany(Comtxt::class);
    }
}
