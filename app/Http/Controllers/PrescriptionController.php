<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use App\Models\MedicalRecord;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    public function index()
    {
        $prescriptions = Prescription::with(['patient', 'doctor.user', 'medicalRecord'])->latest()->paginate(10);

        return Inertia::render('Prescriptions/Index', [
            'prescriptions' => $prescriptions->items(),
            'pagination' => [
                'current_page' => $prescriptions->currentPage(),
                'last_page' => $prescriptions->lastPage(),
                'per_page' => $prescriptions->perPage(),
                'total' => $prescriptions->total(),
                'from' => $prescriptions->firstItem(),
                'to' => $prescriptions->lastItem(),
                'links' => $prescriptions->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Prescriptions/Create', [
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'medicalRecords' => MedicalRecord::select('id', 'patient_id')->latest()->limit(100)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'nullable|exists:medical_records,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'prescription_date' => 'required|date',
            'status' => 'required|string|in:pending,dispensed,cancelled',
            'total_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        Prescription::create($validated);

        return redirect()->route('prescriptions.index')->with('success', 'Prescription created successfully.');
    }

    public function show(Prescription $prescription)
    {
        $prescription->load(['patient', 'doctor.user', 'medicalRecord']);
        return Inertia::render('Prescriptions/Show', [
            'prescription' => $prescription,
        ]);
    }

    public function edit(Prescription $prescription)
    {
        $prescription->load(['patient', 'doctor.user', 'medicalRecord']);
        return Inertia::render('Prescriptions/Edit', [
            'prescription' => $prescription,
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'medicalRecords' => MedicalRecord::select('id', 'patient_id')->latest()->limit(100)->get(),
        ]);
    }

    public function update(Request $request, Prescription $prescription)
    {
        $validated = $request->validate([
            'medical_record_id' => 'nullable|exists:medical_records,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'prescription_date' => 'required|date',
            'status' => 'required|string|in:pending,dispensed,cancelled',
            'total_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $prescription->update($validated);

        return redirect()->route('prescriptions.index')->with('success', 'Prescription updated successfully.');
    }

    public function destroy(Prescription $prescription)
    {
        $prescription->delete();
        return redirect()->route('prescriptions.index')->with('success', 'Prescription deleted successfully.');
    }
}
