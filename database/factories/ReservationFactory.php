<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $now = Carbon::now();

        // Prvi dan trenutnog meseca
        $startOfMonth = $now->startOfMonth()->format('Y-m-d');

        // Prvi dan sledećeg meseca
        $startOfNextMonth = $now->addMonth()->startOfMonth()->format('Y-m-d');

        return [
            'user_id' => User::inRandomOrder()->first()->id, // Dohvata ID nasumičnog korisnika
            'room_id' => Room::inRandomOrder()->first()->id, // Dohvata ID nasumične sobe
            // Generiše datum između početka trenutnog meseca i početka sledećeg meseca
            'reserved_date' => $this->faker->dateTimeBetween($startOfMonth, $startOfNextMonth)->format('Y-m-d')
        ];
    }
}
