<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Definisanje tipova soba
        $roomTypes = ["Conference Room", "Auditorium", "Classroom", "Meeting Room"];

        // Generisanje nasumičnog seta opreme
        $equipment = collect(["Projector", "Sound System", "Video System", "Whiteboard"])
                        ->random(rand(1, 4)) // Nasumično odabira između 1 i 4 komada opreme
                        ->toArray();

        return [
            'name' => $this->faker->word,
            'type' => $this->faker->randomElement($roomTypes), // Nasumično odabiranje tipa sobe
            'capacity' => $this->faker->numberBetween(10, 100),
            'location' => $this->faker->city, // Pretpostavljam da će lokacija biti grad
            'equipment' => json_encode($equipment), // Čuvanje opreme kao JSON niza
            'squareFootage' => $this->faker->numberBetween(20, 200), // Pretpostavka za kvadraturu
            'price' => $this->faker->randomFloat(2, 100, 1000), // Generisanje cene sa 2 decimalna mesta
            'description' => $this->faker->paragraph, // Generisanje opisa
            'imageUrl' => $this->faker->imageUrl, // Generisanje URL-a slike
        ];
    }
}
