<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserReservationController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('users', UserController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('reservations', ReservationController::class);
Route::post('reservations/cancel/{reservation}', [ReservationController::class, 'cancelReservation']);
Route::get('/users/{id}/reservations', [UserReservationController::class, 'index'])->name('users.reservations.index');
Route::get('/rooms/{id}/reservations', [RoomReservationController::class, 'index'])->name('rooms.reservations.index');
//Route::resource('users.reservations', UserReservationController::class)->only('index'); Drugi nacin

