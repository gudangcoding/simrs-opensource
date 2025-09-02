<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\MedicalRecord;
use App\Models\Patient;

class MedicalRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MedicalRecord::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'appointment_id' => Appointment::factory(),
            'chief_complaint' => fake()->text(),
            'diagnosis' => fake()->text(),
            'treatment' => fake()->text(),
            'prescription' => fake()->text(),
            'vital_signs' => '{}',
            'lab_results' => '{}',
            'follow_up_date' => fake()->date(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
