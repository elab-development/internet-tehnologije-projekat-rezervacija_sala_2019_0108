<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationCollection;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservations = Reservation::all();
        return new ReservationCollection($reservations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'reserved_date' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($reservation)
    {
        $reservation1 = Reservation::findOrFail($reservation);
        return new ReservationResource($reservation1);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'reserved_date' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation = Reservation::findOrFail($id);
        $reservation->update($validated);

        return response()->json($reservation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }
    
    public function cancelReservation($id)
    {
        $reservation = Reservation::findOrFail($id);
        
        if ($reservation->status == 'cancelled') {
            return response()->json(['message' => 'Reservation is already cancelled'], 400);
        }

        $reservation->status = 'cancelled';
        $reservation->save();

        return response()->json(['message' => 'Reservation cancelled successfully']);
    }
}
