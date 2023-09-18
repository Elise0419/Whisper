<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomEmailVerificationController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
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
