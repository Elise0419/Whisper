<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Votesdata extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['user_id', 'vote_id', 'voted_at'];
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
