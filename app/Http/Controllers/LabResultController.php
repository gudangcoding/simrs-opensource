<?php

namespace App\Http\Controllers;

use App\Models\LabResult;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\LabTest;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabResultController extends Controller
{
    public function index()
    {
        $results = LabResult::with(['patient', 'doctor', 'labTest'])
            ->latest()
            ->paginate(10);

        return Inertia::render('LabResults/Index', [
            'labResults' => $results->items(),
            'pagination' => [
                'current_page' => $results->currentPage(),
                'last_page' => $results->lastPage(),
                'per_page' => $results->perPage(),
                'total' => $results->total(),
                'from' => $results->firstItem(),
                'to' => $results->lastItem(),
                'links' => $results->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('LabResults/Create', [
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'labTests' => LabTest::select('id', 'name', 'unit', 'normal_range')->orderBy('name')->get(),
            'medicalRecords' => MedicalRecord::select('id', 'patient_id')->latest()->limit(100)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:medical_records,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'lab_test_id' => 'required|exists:lab_tests,id',
            'test_date' => 'required|date',
            'result_value' => 'required|string|max:255',
            'result_status' => 'required|string|in:pending,normal,abnormal,critical',
            'notes' => 'nullable|string',
        ]);

        LabResult::create($validated);

        return redirect()->route('lab-results.index')
            ->with('success', 'Lab result created successfully.');
    }

    public function show(LabResult $labResult)
    {
        $labResult->load(['patient', 'doctor.user', 'labTest', 'medicalRecord']);

        return Inertia::render('LabResults/Show', [
            'labResult' => $labResult,
        ]);
    }

    public function edit(LabResult $labResult)
    {
        $labResult->load(['patient', 'doctor.user', 'labTest', 'medicalRecord']);

        return Inertia::render('LabResults/Edit', [
            'labResult' => $labResult,
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
            'labTests' => LabTest::select('id', 'name', 'unit', 'normal_range')->orderBy('name')->get(),
            'medicalRecords' => MedicalRecord::select('id', 'patient_id')->latest()->limit(100)->get(),
        ]);
    }

    public function update(Request $request, LabResult $labResult)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:medical_records,id',
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'lab_test_id' => 'required|exists:lab_tests,id',
            'test_date' => 'required|date',
            'result_value' => 'required|string|max:255',
            'result_status' => 'required|string|in:pending,normal,abnormal,critical',
            'notes' => 'nullable|string',
        ]);

        $labResult->update($validated);

        return redirect()->route('lab-results.index')
            ->with('success', 'Lab result updated successfully.');
    }

    public function destroy(LabResult $labResult)
    {
        $labResult->delete();

        return redirect()->route('lab-results.index')
            ->with('success', 'Lab result deleted successfully.');
    }
}
