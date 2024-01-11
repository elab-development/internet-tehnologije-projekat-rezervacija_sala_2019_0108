<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationCollection;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PDF;


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
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'reserved_date' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $reservation = Reservation::create([
            'user_id' => Auth::user()->id,
            'room_id' => $request->room_id,
            'reserved_date' => $request->reserved_date,
            'status' => $request->status
        ]);

        return response()->json(['Reservation is created successfully.', new ReservationResource($reservation)]);
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
    public function update(Request $request, $reservation)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'reserved_date' => 'required|date',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $reservation->room_id = $request->room_id;
        $reservation->reserved_date = $request->reserved_date;
        $reservation->status = $request->status;

        $reservation->save();

        return response()->json(['Post is updated successfully.', new ReservationResource($reservation)]);
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

    public function exportToPdf($reservationId)
    {
        $reservation = Reservation::findOrFail($reservationId);

        // Kreiranje HTML sadržaja direktno
        $html = "
        <html>
            <head>
                <title>Rezervacija</title>
            </head>
            <body>
                <h1>Detalji Rezervacije</h1>
                <p>ID Rezervacije: {$reservation->id}</p>
                <p>Korisnik: {$reservation->user_id}</p>
                <p>Soba: {$reservation->room_id}</p>
                <p>Datum Rezervacije: {$reservation->reserved_date}</p>
                <p>Status: {$reservation->status}</p>
            </body>
        </html>
        ";

        $pdf = PDF::loadHTML($html);
        return $pdf->download('reservation-' . $reservationId . '.pdf');
    }
}
