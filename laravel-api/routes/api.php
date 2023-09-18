<?php

use App\Http\Controllers\API\V1\AdController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\ComtxtController;
use App\Http\Controllers\API\V1\PasswordResetController;
use App\Http\Controllers\API\V1\PostController;
use App\Http\Controllers\API\V1\ProfileController;
use App\Http\Controllers\API\V1\RuleController;
use App\Http\Controllers\API\V1\SavepostController;
use App\Http\Controllers\CustomEmailVerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::get('/api/email/verify', function () {
    return redirect('http://10.147.20.3:3000/Login');
})->middleware('auth:api')->name('verification.notice');

Route::get('/email/verify/{user_id}/{hash}', [CustomEmailVerificationController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');

Route::post('/api/email/verification-notification', function (Request $req) {
    $req->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::controller(PasswordResetController::class)->group(function () {
    Route::post('forgot-password', 'sendResetLinkEmail')->name('password.email');
});

Route::controller(ProfileController::class)->group(function () {
    Route::get('profile', 'profile');
    Route::post('emailchange', 'emailchange');
});

//api/v1
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comtxts', ComtxtController::class);
    Route::apiResource('ads', AdController::class);
    Route::apiResource('saveposts', SavepostController::class);
    Route::apiResource('rules', RuleController::class);
});
Route::get('/topPosts/1', [PostController::class, 'topposts1']);
Route::get('/topPosts/2', [PostController::class, 'topposts2']);
Route::get('/posts/search', [PostController::class, 'search']);
Route::post('/posts/click', [PostController::class, 'click']);
Route::post('/posts/thumb', [PostController::class, 'thumb']);
Route::post('/upload', [PostController::class, 'upload']);
Route::post('/posts/save', [SavepostController::class, 'savepost']);
Route::post('/posts/comments/{postId}', [ComtxtController::class, 'createcomtxt']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);
