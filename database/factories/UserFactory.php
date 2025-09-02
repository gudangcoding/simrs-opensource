<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'email_verified_at' => fake()->dateTime(),
            'password' => fake()->password(),
            'role' => fake()->word(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->text(),
            'birth_date' => fake()->date(),
            'gender' => fake()->word(),
            'is_active' => fake()->boolean(),
            'remember_token' => fake()->uuid(),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
