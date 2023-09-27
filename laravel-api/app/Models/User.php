<?php

namespace App\Models;

use App\Models\Comtxt;
use App\Models\Post;
use App\Models\Savepost;
use App\Models\Votesdata;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;
    // use HasApiTokens, HasFactory, Notifiable;
    protected $primaryKey = 'user_id';

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function comtxts()
    {
        return $this->hasMany(Comtxt::class);
    }
    public function saveposts()
    {
        return $this->belongsToMany(Savepost::class);
    }
    // public function userSaveposts()
    // {
    //     return $this->belongsToMany(Savepost::class);
    // }
    public function votesdatas()
    {
        return $this->hasMany(Votesdata::class);
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mem_name',
        'person_id',
        'email',
        'password',
        'phone',
        'headimg',
        'email_verified_token',
        'promise',
        'updated_at',
        'created_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'email_verified_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime',
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
