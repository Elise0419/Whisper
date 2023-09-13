<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    // use HasFactory;
    protected $fillable = [
        'type',
        'imgurl',
        'weburl',
    ];
}
