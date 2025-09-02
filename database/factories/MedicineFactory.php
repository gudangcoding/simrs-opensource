<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Medicine;

class MedicineFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Medicine::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'generic_name' => fake()->word(),
            'category' => fake()->word(),
            'dosage_form' => fake()->word(),
            'strength' => fake()->word(),
            'unit' => fake()->word(),
            'stock_quantity' => fake()->numberBetween(-10000, 10000),
            'minimum_stock' => fake()->numberBetween(-10000, 10000),
            'price_per_unit' => fake()->word(),
            'expiry_date' => fake()->date(),
            'supplier' => fake()->word(),
            'is_active' => fake()->boolean(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
