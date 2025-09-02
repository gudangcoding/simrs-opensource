<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::latest()->paginate(10);
        
        return Inertia::render('Patients/Index', [
            'patients' => $patients->items(),
            'pagination' => [
                'current_page' => $patients->currentPage(),
                'last_page' => $patients->lastPage(),
                'per_page' => $patients->perPage(),
                'total' => $patients->total(),
                'from' => $patients->firstItem(),
                'to' => $patients->lastItem(),
                'links' => $patients->linkCollection()->toArray(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Patients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'medical_record_number' => 'required|string|unique:patients,medical_record_number',
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'blood_type' => 'nullable|in:A,B,AB,O',
            'allergies' => 'nullable|string',
            'medical_history' => 'nullable|string',
            'insurance_number' => 'nullable|string|max:255',
            'insurance_type' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        Patient::create($validated);

        return redirect()->route('patients.index')
            ->with('success', 'Patient created successfully.');
    }

    public function show(Patient $patient)
    {
        return Inertia::render('Patients/Show', [
            'patient' => $patient
        ]);
    }

    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/Edit', [
            'patient' => $patient
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'medical_record_number' => 'required|string|unique:patients,medical_record_number,' . $patient->id,
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'blood_type' => 'nullable|in:A,B,AB,O',
            'allergies' => 'nullable|string',
            'medical_history' => 'nullable|string',
            'insurance_number' => 'nullable|string|max:255',
            'insurance_type' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')
            ->with('success', 'Patient updated successfully.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient deleted successfully.');
    }
}
