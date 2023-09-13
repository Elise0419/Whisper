<?php

use App\Http\Controllers\API\V1\AdController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//api/v1
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comtxts', ComtxtController::class);
    Route::apiResource('ads', AdController::class);
});

// just read
// Route::apiResource('posts', PostController::class)->only(['index', 'show']);

// need to login
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::post('posts', [PostController::class, 'store']);
// });

//Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {
//     Route::get('/ads', [AdController::class, 'index']);
//     Route::post('/ads', [AdController::class, 'store']);
//     Route::get('/ads/{id}', [AdController::class, 'show']);
//     Route::put('/ads/{id}', [AdController::class, 'update']);
//     Route::delete('/ads/{id}', [AdController::class, 'destroy']);
// });
