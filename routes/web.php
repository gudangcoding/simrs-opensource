<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'totalPatients' => \App\Models\Patient::count(),
            'totalDoctors' => \App\Models\Doctor::count(),
            'todayAppointments' => \App\Models\Appointment::whereDate('appointment_date', today())->count(),
            'pendingPrescriptions' => \App\Models\Prescription::where('status', 'pending')->count(),
            'monthlyRevenue' => \App\Models\Payment::whereMonth('created_at', now()->month)->sum('amount'),
            'labTestsToday' => \App\Models\LabResult::whereDate('test_date', today())->count(),
            'recentAppointments' => \App\Models\Appointment::with(['patient', 'doctor'])
                ->latest()
                ->limit(5)
                ->get()
                ->map(function ($appointment) {
                    return [
                        'id' => $appointment->id,
                        'patient_name' => $appointment->patient->name,
                        'doctor_name' => $appointment->doctor->user->name,
                        'time' => $appointment->appointment_time,
                        'status' => $appointment->status,
                    ];
                }),
        ]
    ]);
});

// Patient Routes
Route::get('/patients', [App\Http\Controllers\PatientController::class, 'index'])->name('patients.index');
Route::get('/patients/create', [App\Http\Controllers\PatientController::class, 'create'])->name('patients.create');
Route::post('/patients', [App\Http\Controllers\PatientController::class, 'store'])->name('patients.store');
Route::get('/patients/{patient}', [App\Http\Controllers\PatientController::class, 'show'])->name('patients.show');
Route::get('/patients/{patient}/edit', [App\Http\Controllers\PatientController::class, 'edit'])->name('patients.edit');
Route::put('/patients/{patient}', [App\Http\Controllers\PatientController::class, 'update'])->name('patients.update');
Route::delete('/patients/{patient}', [App\Http\Controllers\PatientController::class, 'destroy'])->name('patients.destroy');

// Lab Result Routes
Route::get('/lab-results', [App\Http\Controllers\LabResultController::class, 'index'])->name('lab-results.index');
Route::get('/lab-results/create', [App\Http\Controllers\LabResultController::class, 'create'])->name('lab-results.create');
Route::post('/lab-results', [App\Http\Controllers\LabResultController::class, 'store'])->name('lab-results.store');
Route::get('/lab-results/{labResult}', [App\Http\Controllers\LabResultController::class, 'show'])->name('lab-results.show');
Route::get('/lab-results/{labResult}/edit', [App\Http\Controllers\LabResultController::class, 'edit'])->name('lab-results.edit');
Route::put('/lab-results/{labResult}', [App\Http\Controllers\LabResultController::class, 'update'])->name('lab-results.update');
Route::delete('/lab-results/{labResult}', [App\Http\Controllers\LabResultController::class, 'destroy'])->name('lab-results.destroy');







































