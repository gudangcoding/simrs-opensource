<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'patient_id',
        'payment_type',
        'reference_id',
        'reference_type',
        'amount',
        'payment_method',
        'payment_status',
        'payment_date',
        'notes',
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
            'patient_id' => 'integer',
            'reference_id' => 'integer',
            'payment_date' => 'datetime',
            'created_at' => 'timestamp',
            'updated_at' => 'timestamp',
        ];
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function reference(): BelongsTo
    {
        return $this->belongsTo(Reference::class);
    }
}
