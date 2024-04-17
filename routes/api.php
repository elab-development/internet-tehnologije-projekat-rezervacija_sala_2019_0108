<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserReservationController;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('firebase.auth')->group(function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::apiResource('rooms', RoomController::class)->only('store');

    Route::get('/users/{id}/reservations', [UserReservationController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/reservation/{reservation}/pdf', [ReservationController::class, 'exportToPdf']);
});

// Javne rute
Route::apiResource('reservations', ReservationController::class)->except(['index']);

Route::apiResource('rooms', RoomController::class);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::apiResource('users', UserController::class);
Route::apiResource('reservations', ReservationController::class)->only('index');
Route::get('/users/{id}/reservations', [UserReservationController::class, 'index']);
Route::get('/rooms/{id}/reservations', [RoomReservationController::class, 'index']);
//Route::post('/register',[AuthController::class,'register']);
//Route::post('/login',[AuthController::class,'login']);
