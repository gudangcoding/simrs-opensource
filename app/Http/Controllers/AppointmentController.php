<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor.user'])->latest()->paginate(10);

        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments->items(),
            'pagination' => [
                'current_page' => $appointments->currentPage(),
                'last_page' => $appointments->lastPage(),
                'per_page' => $appointments->perPage(),
                'total' => $appointments->total(),
                'from' => $appointments->firstItem(),
                'to' => $appointments->lastItem(),
                'links' => $appointments->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Appointments/Create', [
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'required|string|in:scheduled,completed,cancelled,no-show',
            'complaint' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        Appointment::create($validated);

        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['patient', 'doctor.user']);
        return Inertia::render('Appointments/Show', [
            'appointment' => $appointment,
        ]);
    }

    public function edit(Appointment $appointment)
    {
        $appointment->load(['patient', 'doctor.user']);
        return Inertia::render('Appointments/Edit', [
            'appointment' => $appointment,
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'required|string|in:scheduled,completed,cancelled,no-show',
            'complaint' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return redirect()->route('appointments.index')->with('success', 'Appointment updated successfully.');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully.');
    }
}
