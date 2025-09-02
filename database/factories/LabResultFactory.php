<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Doctor;
use App\Models\LabResult;
use App\Models\LabTest;
use App\Models\MedicalRecord;
use App\Models\Patient;

class LabResultFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LabResult::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'lab_test_id' => LabTest::factory(),
            'test_date' => fake()->dateTime(),
            'result_value' => fake()->word(),
            'result_status' => fake()->word(),
            'notes' => fake()->text(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
