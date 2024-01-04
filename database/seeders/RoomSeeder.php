<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Room::create([
            'name' => 'Konferencijska Sala',
            'capacity' => 50,
            'amenities' => 'projektor, wi-fi'
        ]);

        // Dodajte još soba po želji
    }
}
