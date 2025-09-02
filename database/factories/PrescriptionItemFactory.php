<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Medicine;
use App\Models\Prescription;
use App\Models\PrescriptionItem;

class PrescriptionItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PrescriptionItem::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'prescription_id' => Prescription::factory(),
            'medicine_id' => Medicine::factory(),
            'quantity' => fake()->numberBetween(-10000, 10000),
            'dosage' => fake()->word(),
            'frequency' => fake()->word(),
            'duration' => fake()->word(),
            'notes' => fake()->text(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
