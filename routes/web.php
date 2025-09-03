<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected Routes
Route::middleware('auth')->group(function () {
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

    // Doctor Routes
    Route::get('/doctors', [App\Http\Controllers\DoctorController::class, 'index'])->name('doctors.index');
    Route::get('/doctors/create', [App\Http\Controllers\DoctorController::class, 'create'])->name('doctors.create');
    Route::post('/doctors', [App\Http\Controllers\DoctorController::class, 'store'])->name('doctors.store');
    Route::get('/doctors/{doctor}', [App\Http\Controllers\DoctorController::class, 'show'])->name('doctors.show');
    Route::get('/doctors/{doctor}/edit', [App\Http\Controllers\DoctorController::class, 'edit'])->name('doctors.edit');
    Route::put('/doctors/{doctor}', [App\Http\Controllers\DoctorController::class, 'update'])->name('doctors.update');
    Route::delete('/doctors/{doctor}', [App\Http\Controllers\DoctorController::class, 'destroy'])->name('doctors.destroy');

    // Nurse Routes
    Route::get('/nurses', [App\Http\Controllers\NurseController::class, 'index'])->name('nurses.index');
    Route::get('/nurses/create', [App\Http\Controllers\NurseController::class, 'create'])->name('nurses.create');
    Route::post('/nurses', [App\Http\Controllers\NurseController::class, 'store'])->name('nurses.store');
    Route::get('/nurses/{nurse}', [App\Http\Controllers\NurseController::class, 'show'])->name('nurses.show');
    Route::get('/nurses/{nurse}/edit', [App\Http\Controllers\NurseController::class, 'edit'])->name('nurses.edit');
    Route::put('/nurses/{nurse}', [App\Http\Controllers\NurseController::class, 'update'])->name('nurses.update');
    Route::delete('/nurses/{nurse}', [App\Http\Controllers\NurseController::class, 'destroy'])->name('nurses.destroy');

    // Department Routes
    Route::get('/departments', [App\Http\Controllers\DepartmentController::class, 'index'])->name('departments.index');
    Route::get('/departments/create', [App\Http\Controllers\DepartmentController::class, 'create'])->name('departments.create');
    Route::post('/departments', [App\Http\Controllers\DepartmentController::class, 'store'])->name('departments.store');
    Route::get('/departments/{department}', [App\Http\Controllers\DepartmentController::class, 'show'])->name('departments.show');
    Route::get('/departments/{department}/edit', [App\Http\Controllers\DepartmentController::class, 'edit'])->name('departments.edit');
    Route::put('/departments/{department}', [App\Http\Controllers\DepartmentController::class, 'update'])->name('departments.update');
    Route::delete('/departments/{department}', [App\Http\Controllers\DepartmentController::class, 'destroy'])->name('departments.destroy');

    // Room Routes
    Route::get('/rooms', [App\Http\Controllers\RoomController::class, 'index'])->name('rooms.index');
    Route::get('/rooms/create', [App\Http\Controllers\RoomController::class, 'create'])->name('rooms.create');
    Route::post('/rooms', [App\Http\Controllers\RoomController::class, 'store'])->name('rooms.store');
    Route::get('/rooms/{room}', [App\Http\Controllers\RoomController::class, 'show'])->name('rooms.show');
    Route::get('/rooms/{room}/edit', [App\Http\Controllers\RoomController::class, 'edit'])->name('rooms.edit');
    Route::put('/rooms/{room}', [App\Http\Controllers\RoomController::class, 'update'])->name('rooms.update');
    Route::delete('/rooms/{room}', [App\Http\Controllers\RoomController::class, 'destroy'])->name('rooms.destroy');

    // Appointment Routes
    Route::get('/appointments', [App\Http\Controllers\AppointmentController::class, 'index'])->name('appointments.index');
    Route::get('/appointments/create', [App\Http\Controllers\AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('/appointments', [App\Http\Controllers\AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/appointments/{appointment}', [App\Http\Controllers\AppointmentController::class, 'show'])->name('appointments.show');
    Route::get('/appointments/{appointment}/edit', [App\Http\Controllers\AppointmentController::class, 'edit'])->name('appointments.edit');
    Route::put('/appointments/{appointment}', [App\Http\Controllers\AppointmentController::class, 'update'])->name('appointments.update');
    Route::delete('/appointments/{appointment}', [App\Http\Controllers\AppointmentController::class, 'destroy'])->name('appointments.destroy');

    // Medical Records Routes
    Route::get('/medical-records', [App\Http\Controllers\MedicalRecordController::class, 'index'])->name('medical-records.index');
    Route::get('/medical-records/create', [App\Http\Controllers\MedicalRecordController::class, 'create'])->name('medical-records.create');
    Route::post('/medical-records', [App\Http\Controllers\MedicalRecordController::class, 'store'])->name('medical-records.store');
    Route::get('/medical-records/{medicalRecord}', [App\Http\Controllers\MedicalRecordController::class, 'show'])->name('medical-records.show');
    Route::get('/medical-records/{medicalRecord}/edit', [App\Http\Controllers\MedicalRecordController::class, 'edit'])->name('medical-records.edit');
    Route::put('/medical-records/{medicalRecord}', [App\Http\Controllers\MedicalRecordController::class, 'update'])->name('medical-records.update');
    Route::delete('/medical-records/{medicalRecord}', [App\Http\Controllers\MedicalRecordController::class, 'destroy'])->name('medical-records.destroy');

    // Medicines Routes
    Route::get('/medicines', [App\Http\Controllers\MedicineController::class, 'index'])->name('medicines.index');
    Route::get('/medicines/create', [App\Http\Controllers\MedicineController::class, 'create'])->name('medicines.create');
    Route::post('/medicines', [App\Http\Controllers\MedicineController::class, 'store'])->name('medicines.store');
    Route::get('/medicines/{medicine}', [App\Http\Controllers\MedicineController::class, 'show'])->name('medicines.show');
    Route::get('/medicines/{medicine}/edit', [App\Http\Controllers\MedicineController::class, 'edit'])->name('medicines.edit');
    Route::put('/medicines/{medicine}', [App\Http\Controllers\MedicineController::class, 'update'])->name('medicines.update');
    Route::delete('/medicines/{medicine}', [App\Http\Controllers\MedicineController::class, 'destroy'])->name('medicines.destroy');

    // Prescriptions Routes
    Route::get('/prescriptions', [App\Http\Controllers\PrescriptionController::class, 'index'])->name('prescriptions.index');
    Route::get('/prescriptions/create', [App\Http\Controllers\PrescriptionController::class, 'create'])->name('prescriptions.create');
    Route::post('/prescriptions', [App\Http\Controllers\PrescriptionController::class, 'store'])->name('prescriptions.store');
    Route::get('/prescriptions/{prescription}', [App\Http\Controllers\PrescriptionController::class, 'show'])->name('prescriptions.show');
    Route::get('/prescriptions/{prescription}/edit', [App\Http\Controllers\PrescriptionController::class, 'edit'])->name('prescriptions.edit');
    Route::put('/prescriptions/{prescription}', [App\Http\Controllers\PrescriptionController::class, 'update'])->name('prescriptions.update');
    Route::delete('/prescriptions/{prescription}', [App\Http\Controllers\PrescriptionController::class, 'destroy'])->name('prescriptions.destroy');

    // Payments Routes
    Route::get('/payments', [App\Http\Controllers\PaymentController::class, 'index'])->name('payments.index');
    Route::get('/payments/create', [App\Http\Controllers\PaymentController::class, 'create'])->name('payments.create');
    Route::post('/payments', [App\Http\Controllers\PaymentController::class, 'store'])->name('payments.store');
    Route::get('/payments/{payment}', [App\Http\Controllers\PaymentController::class, 'show'])->name('payments.show');
    Route::get('/payments/{payment}/edit', [App\Http\Controllers\PaymentController::class, 'edit'])->name('payments.edit');
    Route::put('/payments/{payment}', [App\Http\Controllers\PaymentController::class, 'update'])->name('payments.update');
    Route::delete('/payments/{payment}', [App\Http\Controllers\PaymentController::class, 'destroy'])->name('payments.destroy');

    // Insurances Routes
    Route::get('/insurances', [App\Http\Controllers\InsuranceController::class, 'index'])->name('insurances.index');
    Route::get('/insurances/create', [App\Http\Controllers\InsuranceController::class, 'create'])->name('insurances.create');
    Route::post('/insurances', [App\Http\Controllers\InsuranceController::class, 'store'])->name('insurances.store');
    Route::get('/insurances/{insurance}', [App\Http\Controllers\InsuranceController::class, 'show'])->name('insurances.show');
    Route::get('/insurances/{insurance}/edit', [App\Http\Controllers\InsuranceController::class, 'edit'])->name('insurances.edit');
    Route::put('/insurances/{insurance}', [App\Http\Controllers\InsuranceController::class, 'update'])->name('insurances.update');
    Route::delete('/insurances/{insurance}', [App\Http\Controllers\InsuranceController::class, 'destroy'])->name('insurances.destroy');

    // Schedules Routes
    Route::get('/schedules', [App\Http\Controllers\ScheduleController::class, 'index'])->name('schedules.index');
    Route::get('/schedules/create', [App\Http\Controllers\ScheduleController::class, 'create'])->name('schedules.create');
    Route::post('/schedules', [App\Http\Controllers\ScheduleController::class, 'store'])->name('schedules.store');
    Route::get('/schedules/{schedule}', [App\Http\Controllers\ScheduleController::class, 'show'])->name('schedules.show');
    Route::get('/schedules/{schedule}/edit', [App\Http\Controllers\ScheduleController::class, 'edit'])->name('schedules.edit');
    Route::put('/schedules/{schedule}', [App\Http\Controllers\ScheduleController::class, 'update'])->name('schedules.update');
    Route::delete('/schedules/{schedule}', [App\Http\Controllers\ScheduleController::class, 'destroy'])->name('schedules.destroy');

    // Notifications Routes
    Route::get('/notifications', [App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/create', [App\Http\Controllers\NotificationController::class, 'create'])->name('notifications.create');
    Route::post('/notifications', [App\Http\Controllers\NotificationController::class, 'store'])->name('notifications.store');
    Route::get('/notifications/{notification}', [App\Http\Controllers\NotificationController::class, 'show'])->name('notifications.show');
    Route::get('/notifications/{notification}/edit', [App\Http\Controllers\NotificationController::class, 'edit'])->name('notifications.edit');
    Route::put('/notifications/{notification}', [App\Http\Controllers\NotificationController::class, 'update'])->name('notifications.update');
    Route::delete('/notifications/{notification}', [App\Http\Controllers\NotificationController::class, 'destroy'])->name('notifications.destroy');
});