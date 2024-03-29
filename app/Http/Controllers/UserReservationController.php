<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationCollection;
use App\Models\Reservation;
use Illuminate\Http\Request;

class UserReservationController extends Controller
{
    public function index($user_id){
        $reservations = Reservation::get()->where('user_id',$user_id);
        /*if(is_null($reservations)){
            return response()->json('Data not found',404);
        }
        return response()->json($reservations);*/
        return new ReservationCollection($reservations);

    }

}
