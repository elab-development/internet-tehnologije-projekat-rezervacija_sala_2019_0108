<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
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
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Dohvata ID nasumičnog korisnika
            'room_id' => Room::inRandomOrder()->first()->id, // Dohvata ID nasumične sobe
            'reserved_date' => $this->faker->date(),
            'status' => 'pending'
        ];
    }
}
