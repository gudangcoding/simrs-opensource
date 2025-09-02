<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Patient;
use App\Models\Payment;
use App\Models\Reference;

class PaymentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Payment::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'payment_type' => fake()->word(),
            'reference_id' => Reference::factory(),
            'reference_type' => fake()->word(),
            'amount' => fake()->word(),
            'payment_method' => fake()->word(),
            'payment_status' => fake()->word(),
            'payment_date' => fake()->dateTime(),
            'notes' => fake()->text(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
