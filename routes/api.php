<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PatientApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::post('/patient/login', [PatientApiController::class, 'login']);
Route::post('/patient/register', [PatientApiController::class, 'register']);

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Patient API routes with custom authentication
Route::prefix('patient')->group(function () {
    // Public routes
    Route::post('/login', [PatientApiController::class, 'login']);
    Route::post('/register', [PatientApiController::class, 'register']);
    
    // Protected routes (require API token)
    Route::middleware('auth.patient')->group(function () {
        Route::post('/logout', [PatientApiController::class, 'logout']);
        Route::get('/profile', [PatientApiController::class, 'profile']);
        Route::put('/profile', [PatientApiController::class, 'updateProfile']);
        Route::put('/password', [PatientApiController::class, 'changePassword']);
        Route::get('/dashboard', [PatientApiController::class, 'dashboard']);
        Route::get('/appointments', [PatientApiController::class, 'appointments']);
        Route::get('/medical-records', [PatientApiController::class, 'medicalRecords']);
        Route::get('/prescriptions', [PatientApiController::class, 'prescriptions']);
        Route::get('/lab-results', [PatientApiController::class, 'labResults']);
        
        // New endpoints for mobile app
        Route::get('/notifications', [PatientApiController::class, 'notifications']);
        Route::put('/notifications/{id}/read', [PatientApiController::class, 'markNotificationRead']);
        Route::put('/notifications/read-all', [PatientApiController::class, 'markAllNotificationsRead']);
        Route::get('/available-doctors', [PatientApiController::class, 'availableDoctors']);
        Route::get('/doctors/{doctorId}/schedules', [PatientApiController::class, 'doctorSchedules']);
        Route::post('/appointments/book', [PatientApiController::class, 'bookAppointment']);
        Route::put('/appointments/{id}/cancel', [PatientApiController::class, 'cancelAppointment']);
        Route::get('/departments', [PatientApiController::class, 'departments']);
        Route::get('/medical-records/search', [PatientApiController::class, 'searchMedicalRecords']);
        Route::get('/statistics', [PatientApiController::class, 'statistics']);
        Route::put('/location', [PatientApiController::class, 'updateLocation']);
        Route::get('/emergency-contacts', [PatientApiController::class, 'emergencyContacts']);
    });
});
