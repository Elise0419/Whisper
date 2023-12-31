<?php

use App\Http\Controllers\API\V1\AdController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\ComtxtController;
use App\Http\Controllers\API\V1\CustomEmailVerificationController;
use App\Http\Controllers\API\V1\GroupAdminController;
use App\Http\Controllers\API\V1\LikeController;
use App\Http\Controllers\API\V1\PasswordResetController;
use App\Http\Controllers\API\V1\PostController;
use App\Http\Controllers\API\V1\ProfileController;
use App\Http\Controllers\API\V1\RuleController;
use App\Http\Controllers\API\V1\SavepostController;
use App\Http\Controllers\API\V1\TagController;
use App\Http\Controllers\API\V1\VoteController;
use App\Http\Controllers\API\V1\SuperAdminController;

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
    Route::get('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('verify/change/email', 'verifyResend');
});

Route::get('/unAuth', function () {
    return response()->json(['error' => '尚未登入'], 401);
})->name('login');

Route::controller(CustomEmailVerificationController::class)->group(function () {
    Route::get('/email/verify/{user_id}/{hash}', 'verify')->middleware(['signed'])->name('verification.verify');
    Route::get('/email/verification-notification', 'verifysending')->middleware(['auth:api', 'throttle:5,1'])->name('verification.send');
    Route::get('/email/verify', 'verifynotice')->middleware('auth:api')->name('verification.notice');
    Route::post('verify/change/email', 'verifyResend')->middleware('auth:api');
});

Route::controller(PasswordResetController::class)->group(function () {
    Route::post('password/reset', 'pwdreset');
    Route::post('password/forgot/mail', 'pwdforgot');
    Route::post('password/forgot/reset/expires={expires}/signature={signature}', 'pwdforgetreset');
});

Route::controller(ProfileController::class)->group(function () {
    Route::get('profile', 'profile');
    Route::get('profile/read/only', 'profileOnlyRead');
    Route::put('profile/email/change', 'emailchange');
    Route::put('profile/phone/change', 'phonechange');
    Route::put('profile/head/change', 'headimgchange');
    Route::put('profile/person_id/change', 'idchange');
    Route::put('profile/mem_name/change', 'namechange');
    Route::put('profile/promise/change', 'promisechange');
    Route::get('emailcheck', 'emailcheck');
    Route::get('idcheck', 'idcheck');
});

Route::controller(GroupAdminController::class)->group(function () {
    Route::post('admin/management/articles/show/{page}', 'showarticles');
    Route::post('admin/management/comments/show/post_{id}/{page}', 'showcomments');
    Route::delete('admin/management/articles/delete/post_{id}', 'deletearticle');
    Route::delete('admin/management/comments/delete/comment_{coment_id}', 'deletecomment');
});

Route::controller(SuperAdminController::class)->group(function () {
    Route::post('superadmin/management/users/promotion', 'promotion');
    Route::delete('superadmin/management/user_{user_id}/downgrade', 'downgrade');
    Route::get('superadmin/management/users/show/{page}', 'usermanage');
});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comtxts', ComtxtController::class);
    Route::apiResource('ads', AdController::class);
    Route::apiResource('saveposts', SavepostController::class);
    Route::apiResource('rules', RuleController::class);
});

Route::get('/v1/posts/page/{page}', [PostController::class, 'page']);

Route::get('/v1/posts/{postId}/{type}', [PostController::class, 'poststype']);
Route::get('/topPosts/1', [PostController::class, 'topposts1']);
Route::get('/topPosts/2', [PostController::class, 'topposts2']);
Route::get('/posts/search', [PostController::class, 'search']);
Route::post('/posts/click{postId}', [PostController::class, 'click']);
Route::post('/posts/thumb{postId}', [LikeController::class, 'thumb']);
Route::get('/tags/{type}', [TagController::class, 'getTags']);
Route::get('/tags/all/{type}', [TagController::class, 'getAllTags']);
Route::get('/votes/{type}', [VoteController::class, 'voteselect']);
Route::middleware(['auth'])->get('/votes/click/{voteId}', [VoteController::class, 'votesclick']);

Route::middleware(['auth'])->post('/posts/{postId}/comments', [ComtxtController::class, 'createcomtxt']);
Route::middleware(['auth'])->put('/posts/comments/{id}', [ComtxtController::class, 'updatecomtxt']);
Route::middleware(['auth'])->post('/upload/{type}', [PostController::class, 'upload']);
Route::middleware(['auth'])->post('/editor/reupload/{postid}', [PostController::class, 'reupload']);
Route::middleware(['auth'])->post('/user/posts', [PostController::class, 'getUserPosts']);
Route::middleware(['auth'])->post('/posts/save/{postId}', [SavepostController::class, 'savepost']);
Route::middleware(['auth'])->post('/posts/usersave', [SavepostController::class, 'userSaveposts']);

Route::middleware(['auth'])->get('/posts/edit/post_{postID}', [PostController::class, 'edition']);

Route::middleware(['auth'])->put('/posts/edit/{postId}', [PostController::class, 'updatepost']);
Route::middleware(['auth'])->delete('/posts/delete/{postId}', [PostController::class, 'destroy']);
Route::middleware(['auth'])->delete('/saveposts/delete/{postId}', [SavepostController::class, 'delete']);
