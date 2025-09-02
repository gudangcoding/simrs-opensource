<?php

use Illuminate\Support\Facades\Route;

// SIMRS API Routes
Route::apiResource('users', App\Http\Controllers\UserController::class);
Route::apiResource('patients', App\Http\Controllers\PatientController::class);
Route::apiResource('doctors', App\Http\Controllers\DoctorController::class);
Route::apiResource('nurses', App\Http\Controllers\NurseController::class);
Route::apiResource('departments', App\Http\Controllers\DepartmentController::class);
Route::apiResource('rooms', App\Http\Controllers\RoomController::class);
Route::apiResource('appointments', App\Http\Controllers\AppointmentController::class);
Route::apiResource('medical-records', App\Http\Controllers\MedicalRecordController::class);
Route::apiResource('admissions', App\Http\Controllers\AdmissionController::class);
Route::apiResource('medicines', App\Http\Controllers\MedicineController::class);
Route::apiResource('prescriptions', App\Http\Controllers\PrescriptionController::class);
Route::apiResource('prescription-items', App\Http\Controllers\PrescriptionItemController::class);
Route::apiResource('lab-tests', App\Http\Controllers\LabTestController::class);
Route::apiResource('lab-results', App\Http\Controllers\LabResultController::class);
Route::apiResource('payments', App\Http\Controllers\PaymentController::class);
Route::apiResource('insurances', App\Http\Controllers\InsuranceController::class);
Route::apiResource('patient-insurances', App\Http\Controllers\PatientInsuranceController::class);
Route::apiResource('schedules', App\Http\Controllers\ScheduleController::class);
Route::apiResource('notifications', App\Http\Controllers\NotificationController::class);
