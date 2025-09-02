<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Insurance;
use App\Models\Patient;
use App\Models\PatientInsurance;

class PatientInsuranceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PatientInsurance::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'insurance_id' => Insurance::factory(),
            'policy_number' => fake()->word(),
            'expiry_date' => fake()->date(),
            'is_active' => fake()->boolean(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
