<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call([
        //     UserSeeder::class,
        //     RoomSeeder::class,
        //     ReservationSeeder::class,
        // ]);

        User::truncate();
        Room::truncate();
        Reservation::truncate();

        User::factory()->count(10)->create();
        Room::factory()->count(5)->create();      
        Reservation::factory()->count(15)->create();
    }
}
