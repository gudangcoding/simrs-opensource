<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Doctor;
use App\Models\MedicalRecord;
use App\Models\Patient;
use App\Models\Prescription;

class PrescriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Prescription::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'prescription_date' => fake()->dateTime(),
            'status' => fake()->word(),
            'total_amount' => fake()->word(),
            'notes' => fake()->text(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
