<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Prescription;
use App\Models\LabResult;
use App\Models\Notification;
use App\Models\Schedule;
use App\Models\Doctor;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PatientApiController extends Controller
{
    /**
     * Patient Login
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = Patient::where('email', $request->email)->first();

        if (!$patient || !Hash::check($request->password, $patient->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate API token
        $token = Str::random(60);
        $patient->update(['api_token' => $token]);

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'patient' => [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'email' => $patient->email,
                    'phone' => $patient->phone,
                    'birth_date' => $patient->birth_date,
                    'gender' => $patient->gender,
                    'address' => $patient->address,
                    'blood_type' => $patient->blood_type,
                    'allergies' => $patient->allergies,
                    'medical_history' => $patient->medical_history,
                ],
                'token' => $token
            ]
        ]);
    }

    /**
     * Patient Registration
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = Patient::create([
            'medical_record_number' => 'MRN' . date('Ymd') . rand(1000, 9999),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'address' => $request->address,
            'is_active' => true,
        ]);

        // Generate API token
        $token = Str::random(60);
        $patient->update(['api_token' => $token]);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'patient' => [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'email' => $patient->email,
                    'phone' => $patient->phone,
                    'birth_date' => $patient->birth_date,
                    'gender' => $patient->gender,
                    'address' => $patient->address,
                ],
                'token' => $token
            ]
        ], 201);
    }

    /**
     * Patient Logout
     */
    public function logout(Request $request)
    {
        $patient = $request->user();
        $patient->update(['api_token' => null]);

        return response()->json([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    }

    /**
     * Get Patient Profile
     */
    public function profile(Request $request)
    {
        $patient = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $patient->id,
                'medical_record_number' => $patient->medical_record_number,
                'name' => $patient->name,
                'email' => $patient->email,
                'phone' => $patient->phone,
                'birth_date' => $patient->birth_date,
                'gender' => $patient->gender,
                'address' => $patient->address,
                'emergency_contact_name' => $patient->emergency_contact_name,
                'emergency_contact_phone' => $patient->emergency_contact_phone,
                'blood_type' => $patient->blood_type,
                'allergies' => $patient->allergies,
                'medical_history' => $patient->medical_history,
                'insurance_number' => $patient->insurance_number,
                'insurance_type' => $patient->insurance_type,
                'is_active' => $patient->is_active,
                'created_at' => $patient->created_at,
                'updated_at' => $patient->updated_at,
            ]
        ]);
    }

    /**
     * Update Patient Profile
     */
    public function updateProfile(Request $request)
    {
        $patient = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string',
            'emergency_contact_name' => 'sometimes|string|max:255',
            'emergency_contact_phone' => 'sometimes|string|max:20',
            'allergies' => 'sometimes|string',
            'medical_history' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient->update($request->only([
            'name', 'phone', 'address', 'emergency_contact_name',
            'emergency_contact_phone', 'allergies', 'medical_history'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $patient->fresh()
        ]);
    }

    /**
     * Change Password
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = $request->user();

        if (!Hash::check($request->current_password, $patient->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 400);
        }

        $patient->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }

    /**
     * Get Patient Appointments
     */
    public function appointments(Request $request)
    {
        $patient = $request->user();
        
        $appointments = Appointment::with(['doctor.user', 'patient'])
            ->where('patient_id', $patient->id)
            ->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'appointment_date' => $appointment->appointment_date,
                    'appointment_time' => $appointment->appointment_time,
                    'status' => $appointment->status,
                    'complaint' => $appointment->complaint,
                    'notes' => $appointment->notes,
                    'doctor' => [
                        'id' => $appointment->doctor->id,
                        'name' => $appointment->doctor->user->name,
                        'specialization' => $appointment->doctor->specialization,
                    ],
                    'created_at' => $appointment->created_at,
                ];
            }),
            'pagination' => [
                'current_page' => $appointments->currentPage(),
                'last_page' => $appointments->lastPage(),
                'per_page' => $appointments->perPage(),
                'total' => $appointments->total(),
            ]
        ]);
    }

    /**
     * Get Patient Medical Records
     */
    public function medicalRecords(Request $request)
    {
        $patient = $request->user();
        
        $medicalRecords = MedicalRecord::with(['doctor.user', 'patient'])
            ->where('patient_id', $patient->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $medicalRecords->map(function ($record) {
                return [
                    'id' => $record->id,
                    'visit_date' => $record->visit_date,
                    'symptoms' => $record->symptoms,
                    'diagnosis' => $record->diagnosis,
                    'treatment' => $record->treatment,
                    'notes' => $record->notes,
                    'doctor' => [
                        'id' => $record->doctor->id,
                        'name' => $record->doctor->user->name,
                        'specialization' => $record->doctor->specialization,
                    ],
                    'created_at' => $record->created_at,
                ];
            }),
            'pagination' => [
                'current_page' => $medicalRecords->currentPage(),
                'last_page' => $medicalRecords->lastPage(),
                'per_page' => $medicalRecords->perPage(),
                'total' => $medicalRecords->total(),
            ]
        ]);
    }

    /**
     * Get Patient Prescriptions
     */
    public function prescriptions(Request $request)
    {
        $patient = $request->user();
        
        $prescriptions = Prescription::with(['doctor.user', 'patient', 'items.medicine'])
            ->where('patient_id', $patient->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $prescriptions->map(function ($prescription) {
                return [
                    'id' => $prescription->id,
                    'prescription_date' => $prescription->prescription_date,
                    'diagnosis' => $prescription->diagnosis,
                    'notes' => $prescription->notes,
                    'status' => $prescription->status,
                    'doctor' => [
                        'id' => $prescription->doctor->id,
                        'name' => $prescription->doctor->user->name,
                        'specialization' => $prescription->doctor->specialization,
                    ],
                    'medicines' => $prescription->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'medicine_name' => $item->medicine->name,
                            'dosage' => $item->dosage,
                            'frequency' => $item->frequency,
                            'duration' => $item->duration,
                            'instructions' => $item->instructions,
                        ];
                    }),
                    'created_at' => $prescription->created_at,
                ];
            }),
            'pagination' => [
                'current_page' => $prescriptions->currentPage(),
                'last_page' => $prescriptions->lastPage(),
                'per_page' => $prescriptions->perPage(),
                'total' => $prescriptions->total(),
            ]
        ]);
    }

    /**
     * Get Patient Lab Results
     */
    public function labResults(Request $request)
    {
        $patient = $request->user();
        
        $labResults = LabResult::with(['labTest', 'patient'])
            ->where('patient_id', $patient->id)
            ->orderBy('test_date', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $labResults->map(function ($result) {
                return [
                    'id' => $result->id,
                    'test_date' => $result->test_date,
                    'test_name' => $result->labTest->name,
                    'result_value' => $result->result_value,
                    'normal_range' => $result->normal_range,
                    'unit' => $result->unit,
                    'interpretation' => $result->interpretation,
                    'notes' => $result->notes,
                    'status' => $result->status,
                    'created_at' => $result->created_at,
                ];
            }),
            'pagination' => [
                'current_page' => $labResults->currentPage(),
                'last_page' => $labResults->lastPage(),
                'per_page' => $labResults->perPage(),
                'total' => $labResults->total(),
            ]
        ]);
    }

    /**
     * Get Dashboard Stats
     */
    public function dashboard(Request $request)
    {
        $patient = $request->user();
        
        $stats = [
            'total_appointments' => Appointment::where('patient_id', $patient->id)->count(),
            'upcoming_appointments' => Appointment::where('patient_id', $patient->id)
                ->where('appointment_date', '>=', now()->toDateString())
                ->where('status', 'scheduled')
                ->count(),
            'total_medical_records' => MedicalRecord::where('patient_id', $patient->id)->count(),
            'total_prescriptions' => Prescription::where('patient_id', $patient->id)->count(),
            'total_lab_results' => LabResult::where('patient_id', $patient->id)->count(),
            'recent_appointments' => Appointment::with(['doctor.user'])
                ->where('patient_id', $patient->id)
                ->orderBy('appointment_date', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($appointment) {
                    return [
                        'id' => $appointment->id,
                        'date' => $appointment->appointment_date,
                        'time' => $appointment->appointment_time,
                        'status' => $appointment->status,
                        'doctor_name' => $appointment->doctor->user->name,
                    ];
                }),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get Patient Notifications
     */
    public function notifications(Request $request)
    {
        $patient = $request->user();
        
        $notifications = Notification::where('user_id', $patient->id)
            ->orWhere('recipient_type', 'patient')
            ->orWhere('recipient_id', $patient->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $notifications->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'type' => $notification->type,
                    'is_read' => $notification->is_read,
                    'created_at' => $notification->created_at,
                    'updated_at' => $notification->updated_at,
                ];
            }),
            'pagination' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ]
        ]);
    }

    /**
     * Mark Notification as Read
     */
    public function markNotificationRead(Request $request, $id)
    {
        $patient = $request->user();
        
        $notification = Notification::where('id', $id)
            ->where(function($query) use ($patient) {
                $query->where('user_id', $patient->id)
                      ->orWhere('recipient_type', 'patient')
                      ->orWhere('recipient_id', $patient->id);
            })
            ->first();

        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found'
            ], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    /**
     * Mark All Notifications as Read
     */
    public function markAllNotificationsRead(Request $request)
    {
        $patient = $request->user();
        
        Notification::where(function($query) use ($patient) {
            $query->where('user_id', $patient->id)
                  ->orWhere('recipient_type', 'patient')
                  ->orWhere('recipient_id', $patient->id);
        })->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read'
        ]);
    }

    /**
     * Get Available Doctors for Appointment
     */
    public function availableDoctors(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'department_id' => 'nullable|exists:departments,id',
            'date' => 'required|date|after:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $query = Doctor::with(['user', 'department'])
            ->where('is_available', true);

        if ($request->department_id) {
            $query->where('department_id', $request->department_id);
        }

        $doctors = $query->get();

        // Filter doctors based on availability for specific date
        $availableDoctors = $doctors->filter(function ($doctor) use ($request) {
            $date = $request->date;
            $dayOfWeek = date('l', strtotime($date));
            
            // Check if doctor has schedule for this day
            $schedule = Schedule::where('doctor_id', $doctor->id)
                ->where('day_of_week', strtolower($dayOfWeek))
                ->where('is_active', true)
                ->first();

            if (!$schedule) {
                return false;
            }

            // Check if doctor has available slots
            $existingAppointments = Appointment::where('doctor_id', $doctor->id)
                ->where('appointment_date', $date)
                ->count();

            return $existingAppointments < $schedule->max_patients;
        });

        return response()->json([
            'success' => true,
            'data' => $availableDoctors->map(function ($doctor) {
                return [
                    'id' => $doctor->id,
                    'name' => $doctor->user->name,
                    'specialization' => $doctor->specialization,
                    'department' => [
                        'id' => $doctor->department->id,
                        'name' => $doctor->department->name,
                    ],
                    'consultation_fee' => $doctor->consultation_fee,
                    'experience_years' => $doctor->experience_years,
                    'is_available' => $doctor->is_available,
                ];
            })
        ]);
    }

    /**
     * Get Doctor Schedules
     */
    public function doctorSchedules(Request $request, $doctorId)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $doctor = Doctor::with(['user', 'department'])->find($doctorId);
        
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found'
            ], 404);
        }

        $date = $request->date;
        $dayOfWeek = strtolower(date('l', strtotime($date)));
        
        $schedule = Schedule::where('doctor_id', $doctorId)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->first();

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not available on this date'
            ], 400);
        }

        // Generate time slots
        $startTime = strtotime($schedule->start_time);
        $endTime = strtotime($schedule->end_time);
        $slotDuration = 30; // 30 minutes per slot
        
        $timeSlots = [];
        $currentTime = $startTime;
        
        while ($currentTime < $endTime) {
            $timeSlot = date('H:i', $currentTime);
            
            // Check if slot is available
            $existingAppointment = Appointment::where('doctor_id', $doctorId)
                ->where('appointment_date', $date)
                ->where('appointment_time', $timeSlot)
                ->first();

            $timeSlots[] = [
                'time' => $timeSlot,
                'available' => !$existingAppointment,
                'formatted_time' => date('g:i A', $currentTime),
            ];
            
            $currentTime += ($slotDuration * 60);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'doctor' => [
                    'id' => $doctor->id,
                    'name' => $doctor->user->name,
                    'specialization' => $doctor->specialization,
                    'department' => [
                        'id' => $doctor->department->id,
                        'name' => $doctor->department->name,
                    ],
                ],
                'schedule' => [
                    'day_of_week' => $schedule->day_of_week,
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'max_patients' => $schedule->max_patients,
                ],
                'date' => $date,
                'time_slots' => $timeSlots,
            ]
        ]);
    }

    /**
     * Book New Appointment
     */
    public function bookAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after:today',
            'appointment_time' => 'required|date_format:H:i',
            'complaint' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = $request->user();
        
        // Check if time slot is available
        $existingAppointment = Appointment::where('doctor_id', $request->doctor_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('appointment_time', $request->appointment_time)
            ->first();

        if ($existingAppointment) {
            return response()->json([
                'success' => false,
                'message' => 'This time slot is already booked'
            ], 400);
        }

        // Check if patient already has appointment on same date
        $patientAppointment = Appointment::where('patient_id', $patient->id)
            ->where('appointment_date', $request->appointment_date)
            ->first();

        if ($patientAppointment) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an appointment on this date'
            ], 400);
        }

        $appointment = Appointment::create([
            'patient_id' => $patient->id,
            'doctor_id' => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'complaint' => $request->complaint,
            'notes' => $request->notes,
            'status' => 'scheduled',
        ]);

        // Create notification for patient
        Notification::create([
            'user_id' => $patient->id,
            'title' => 'Appointment Booked',
            'message' => 'Your appointment has been successfully booked for ' . 
                        date('d M Y', strtotime($request->appointment_date)) . 
                        ' at ' . date('g:i A', strtotime($request->appointment_time)),
            'type' => 'appointment',
            'is_read' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment booked successfully',
            'data' => [
                'id' => $appointment->id,
                'appointment_date' => $appointment->appointment_date,
                'appointment_time' => $appointment->appointment_time,
                'status' => $appointment->status,
                'complaint' => $appointment->complaint,
                'notes' => $appointment->notes,
            ]
        ], 201);
    }

    /**
     * Cancel Appointment
     */
    public function cancelAppointment(Request $request, $id)
    {
        $patient = $request->user();
        
        $appointment = Appointment::where('id', $id)
            ->where('patient_id', $patient->id)
            ->first();

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        if ($appointment->status === 'cancelled') {
            return response()->json([
                'success' => false,
                'message' => 'Appointment is already cancelled'
            ], 400);
        }

        if ($appointment->status === 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot cancel completed appointment'
            ], 400);
        }

        // Check if appointment is within 24 hours
        $appointmentDateTime = strtotime($appointment->appointment_date . ' ' . $appointment->appointment_time);
        $currentDateTime = time();
        $hoursDifference = ($appointmentDateTime - $currentDateTime) / 3600;

        if ($hoursDifference < 24) {
            return response()->json([
                'success' => false,
                'message' => 'Appointments can only be cancelled at least 24 hours in advance'
            ], 400);
        }

        $appointment->update(['status' => 'cancelled']);

        // Create notification
        Notification::create([
            'user_id' => $patient->id,
            'title' => 'Appointment Cancelled',
            'message' => 'Your appointment for ' . 
                        date('d M Y', strtotime($appointment->appointment_date)) . 
                        ' has been cancelled',
            'type' => 'appointment',
            'is_read' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully'
        ]);
    }

    /**
     * Get Departments
     */
    public function departments()
    {
        $departments = Department::where('is_active', true)
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $departments->map(function ($department) {
                return [
                    'id' => $department->id,
                    'name' => $department->name,
                    'description' => $department->description,
                    'is_active' => $department->is_active,
                ];
            })
        ]);
    }

    /**
     * Search Medical Records
     */
    public function searchMedicalRecords(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'keyword' => 'required|string|min:3',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = $request->user();
        
        $query = MedicalRecord::with(['doctor.user'])
            ->where('patient_id', $patient->id);

        // Search by keyword
        $keyword = $request->keyword;
        $query->where(function($q) use ($keyword) {
            $q->where('symptoms', 'like', "%{$keyword}%")
              ->orWhere('diagnosis', 'like', "%{$keyword}%")
              ->orWhere('treatment', 'like', "%{$keyword}%")
              ->orWhere('notes', 'like', "%{$keyword}%");
        });

        // Filter by date range
        if ($request->date_from) {
            $query->where('visit_date', '>=', $request->date_from);
        }
        
        if ($request->date_to) {
            $query->where('visit_date', '<=', $request->date_to);
        }

        $medicalRecords = $query->orderBy('visit_date', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $medicalRecords->map(function ($record) {
                return [
                    'id' => $record->id,
                    'visit_date' => $record->visit_date,
                    'symptoms' => $record->symptoms,
                    'diagnosis' => $record->diagnosis,
                    'treatment' => $record->treatment,
                    'notes' => $record->notes,
                    'doctor' => [
                        'id' => $record->doctor->id,
                        'name' => $record->doctor->user->name,
                        'specialization' => $record->doctor->specialization,
                    ],
                    'created_at' => $record->created_at,
                ];
            }),
            'pagination' => [
                'current_page' => $medicalRecords->currentPage(),
                'last_page' => $medicalRecords->lastPage(),
                'per_page' => $medicalRecords->perPage(),
                'total' => $medicalRecords->total(),
            ]
        ]);
    }

    /**
     * Get Patient Statistics
     */
    public function statistics(Request $request)
    {
        $patient = $request->user();
        
        $validator = Validator::make($request->all(), [
            'period' => 'nullable|in:week,month,year,all',
        ]);

        $period = $request->get('period', 'month');
        
        $query = Appointment::where('patient_id', $patient->id);
        
        switch ($period) {
            case 'week':
                $query->whereBetween('appointment_date', [
                    now()->startOfWeek(),
                    now()->endOfWeek()
                ]);
                break;
            case 'month':
                $query->whereBetween('appointment_date', [
                    now()->startOfMonth(),
                    now()->endOfMonth()
                ]);
                break;
            case 'year':
                $query->whereBetween('appointment_date', [
                    now()->startOfYear(),
                    now()->endOfYear()
                ]);
                break;
            default:
                // All time
                break;
        }

        $appointments = $query->get();
        
        $stats = [
            'total_appointments' => $appointments->count(),
            'completed_appointments' => $appointments->where('status', 'completed')->count(),
            'cancelled_appointments' => $appointments->where('status', 'cancelled')->count(),
            'scheduled_appointments' => $appointments->where('status', 'scheduled')->count(),
            'period' => $period,
        ];

        // Add monthly trend for the last 6 months
        $monthlyTrend = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $monthlyAppointments = Appointment::where('patient_id', $patient->id)
                ->whereBetween('appointment_date', [
                    $month->startOfMonth(),
                    $month->endOfMonth()
                ])
                ->count();
            
            $monthlyTrend[] = [
                'month' => $month->format('M Y'),
                'count' => $monthlyAppointments,
            ];
        }
        
        $stats['monthly_trend'] = $monthlyTrend;

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Update Patient Location (for emergency purposes)
     */
    public function updateLocation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $patient = $request->user();
        
        $patient->update([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'location_updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Location updated successfully'
        ]);
    }

    /**
     * Get Emergency Contacts
     */
    public function emergencyContacts(Request $request)
    {
        $patient = $request->user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'emergency_contact_name' => $patient->emergency_contact_name,
                'emergency_contact_phone' => $patient->emergency_contact_phone,
                'blood_type' => $patient->blood_type,
                'allergies' => $patient->allergies,
                'medical_history' => $patient->medical_history,
                'current_location' => [
                    'latitude' => $patient->latitude,
                    'longitude' => $patient->longitude,
                    'address' => $patient->address,
                    'updated_at' => $patient->location_updated_at,
                ],
            ]
        ]);
    }
}
