<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'medical_record_number',
        'name',
        'birth_date',
        'gender',
        'phone',
        'email',
        'password',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'blood_type',
        'allergies',
        'medical_history',
        'insurance_number',
        'insurance_type',
        'is_active',
        'api_token',
        'latitude',
        'longitude',
        'location_updated_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'birth_date' => 'date',
            'is_active' => 'boolean',
            'password' => 'hashed',
            'created_at' => 'timestamp',
            'updated_at' => 'timestamp',
        ];
    }
}
