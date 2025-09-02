<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Patient;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'medical_record_number' => fake()->word(),
            'name' => fake()->name(),
            'birth_date' => fake()->date(),
            'gender' => fake()->word(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'address' => fake()->text(),
            'emergency_contact_name' => fake()->word(),
            'emergency_contact_phone' => fake()->word(),
            'blood_type' => fake()->word(),
            'allergies' => fake()->text(),
            'medical_history' => fake()->text(),
            'insurance_number' => fake()->word(),
            'insurance_type' => fake()->word(),
            'is_active' => fake()->boolean(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
