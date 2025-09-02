<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Admission;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Room;

class AdmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Admission::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'room_id' => Room::factory(),
            'admission_date' => fake()->dateTime(),
            'discharge_date' => fake()->dateTime(),
            'status' => fake()->word(),
            'admission_type' => fake()->word(),
            'diagnosis' => fake()->text(),
            'treatment_plan' => fake()->text(),
            'total_cost' => fake()->word(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
