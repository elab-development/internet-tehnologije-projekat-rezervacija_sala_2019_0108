<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationCollection;
use App\Models\Reservation;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class RoomReservationController extends Controller
{
    public function index($room_id){
        $reservations = Reservation::get()->where('room_id',$room_id);
        /*if($reservations->isEmpty()){
            return response()->json('Data not found',404);
        }*/
        return new ReservationCollection($reservations);
    }

}
