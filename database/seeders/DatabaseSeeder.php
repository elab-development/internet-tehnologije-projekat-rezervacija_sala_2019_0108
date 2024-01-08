<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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

       
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Reservation::truncate();
        User::truncate();
        Room::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        User::factory()->count(10)->create();
        Room::factory()->count(5)->create();
        Reservation::factory()->count(15)->create();
    }
}
