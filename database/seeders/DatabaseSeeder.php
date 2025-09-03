<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@simrs.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'phone' => '081234567890',
            'address' => 'Jl. Admin No. 1',
            'birth_date' => '1990-01-01',
            'gender' => 'male',
            'is_active' => true,
        ]);

        // Create sample users for different roles
        User::factory()->create([
            'name' => 'Dr. John Doe',
            'email' => 'doctor@simrs.com',
            'password' => bcrypt('password'),
            'role' => 'doctor',
            'phone' => '081234567891',
            'address' => 'Jl. Doctor No. 1',
            'birth_date' => '1985-05-15',
            'gender' => 'male',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name' => 'Nurse Jane Smith',
            'email' => 'nurse@simrs.com',
            'password' => bcrypt('password'),
            'role' => 'nurse',
            'phone' => '081234567892',
            'address' => 'Jl. Nurse No. 1',
            'birth_date' => '1992-08-20',
            'gender' => 'female',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name' => 'Receptionist Bob',
            'email' => 'receptionist@simrs.com',
            'password' => bcrypt('password'),
            'role' => 'receptionist',
            'phone' => '081234567893',
            'address' => 'Jl. Receptionist No. 1',
            'birth_date' => '1995-12-10',
            'gender' => 'male',
            'is_active' => true,
        ]);
    }
}
