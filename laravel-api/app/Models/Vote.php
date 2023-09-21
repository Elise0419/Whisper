<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $primaryKey = 'vote_id';
    protected $fillable = ['ans_one_point', 'ans_two_point'];
    public $timestamps = false;

}
