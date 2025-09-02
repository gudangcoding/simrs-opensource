<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained();
            $table->foreignId('doctor_id')->constrained();
            $table->foreignId('room_id')->constrained();
            $table->dateTime('admission_date');
            $table->dateTime('discharge_date')->nullable();
            $table->string('status');
            $table->string('admission_type');
            $table->text('diagnosis');
            $table->text('treatment_plan');
            $table->string('total_cost')->default('0');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
