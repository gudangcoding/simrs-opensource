<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Department;
use App\Models\Room;

class RoomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Room::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'room_number' => fake()->word(),
            'room_type' => fake()->word(),
            'department_id' => Department::factory(),
            'bed_capacity' => fake()->numberBetween(-10000, 10000),
            'current_occupancy' => fake()->numberBetween(-10000, 10000),
            'price_per_day' => fake()->word(),
            'is_available' => fake()->boolean(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
