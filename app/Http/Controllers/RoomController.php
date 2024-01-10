<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomCollection;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public static $wrap = 'Rooms';
    public function index(Request $request)
    {
        $query = Room::query();
    
        // Filtriranje po kapacitetu sobe
        if ($request->has('capacity')) {
            $capacity = $request->input('capacity');
            $query->where('capacity', '>=', $capacity);
        }
    
        // Filtriranje po sadržajima (amenities)
        if ($request->has('amenity')) {
            $amenity = $request->input('amenity');
            $query->where('amenities', 'like', '%' . $amenity . '%');
        }
    
        // Paginacija
        $perPage = $request->input('per_page', 3);
        $rooms = $query->paginate($perPage);

        //return response()->json($rooms);
        return new RoomCollection($rooms);
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
            'name' => 'required|max:255',
            'capacity' => 'required|integer',
            'amenities' => 'nullable|string'
        ]);

        $room = Room::create($validated);
        return response()->json($room, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($room)
    {
        $room1 = Room::findOrFail($room);
        return new RoomResource($room1);
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
            'name' => 'required|max:255',
            'capacity' => 'required|integer',
            'amenities' => 'nullable|string'
        ]);

        $room = Room::findOrFail($id);
        $room->update($validated);

        return response()->json($room);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json(['message' => 'Room deleted successfully']);
    }
}
