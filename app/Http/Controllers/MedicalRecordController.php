<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicalRecordController extends Controller
{
    public function index()
    {
        $records = MedicalRecord::with(['patient', 'doctor.user', 'appointment'])->latest()->paginate(10);

        return Inertia::render('MedicalRecords/Index', [
            'records' => $records->items(),
            'pagination' => [
                'current_page' => $records->currentPage(),
                'last_page' => $records->lastPage(),
                'per_page' => $records->perPage(),
                'total' => $records->total(),
                'from' => $records->firstItem(),
                'to' => $records->lastItem(),
                'links' => $records->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('MedicalRecords/Create', [
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'appointments' => Appointment::with(['patient:id,name','doctor.user:id,name'])->latest()->limit(100)->get()->map(fn ($a) => [
                'id' => $a->id,
                'label' => sprintf('#%d %s with %s', $a->id, $a->patient->name, $a->doctor->user->name),
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'chief_complaint' => 'required|string',
            'diagnosis' => 'required|string',
            'treatment' => 'nullable|string',
            'prescription' => 'nullable|string',
            'vital_signs' => 'nullable|array',
            'lab_results' => 'nullable|array',
            'follow_up_date' => 'nullable|date',
        ]);

        MedicalRecord::create($validated);

        return redirect()->route('medical-records.index')->with('success', 'Medical record created successfully.');
    }

    public function show(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load(['patient', 'doctor.user', 'appointment']);
        return Inertia::render('MedicalRecords/Show', [
            'record' => $medicalRecord,
        ]);
    }

    public function edit(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load(['patient', 'doctor.user', 'appointment']);
        return Inertia::render('MedicalRecords/Edit', [
            'record' => $medicalRecord,
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'appointments' => Appointment::with(['patient:id,name','doctor.user:id,name'])->latest()->limit(100)->get()->map(fn ($a) => [
                'id' => $a->id,
                'label' => sprintf('#%d %s with %s', $a->id, $a->patient->name, $a->doctor->user->name),
            ]),
        ]);
    }

    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'chief_complaint' => 'required|string',
            'diagnosis' => 'required|string',
            'treatment' => 'nullable|string',
            'prescription' => 'nullable|string',
            'vital_signs' => 'nullable|array',
            'lab_results' => 'nullable|array',
            'follow_up_date' => 'nullable|date',
        ]);

        $medicalRecord->update($validated);

        return redirect()->route('medical-records.index')->with('success', 'Medical record updated successfully.');
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return redirect()->route('medical-records.index')->with('success', 'Medical record deleted successfully.');
    }
}
