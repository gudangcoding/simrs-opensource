<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Doctor::with('user')->latest()->paginate(10);

        return Inertia::render('Doctors/Index', [
            'doctors' => $doctors->items(),
            'pagination' => [
                'current_page' => $doctors->currentPage(),
                'last_page' => $doctors->lastPage(),
                'per_page' => $doctors->perPage(),
                'total' => $doctors->total(),
                'from' => $doctors->firstItem(),
                'to' => $doctors->lastItem(),
                'links' => $doctors->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Doctors/Create', [
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255|unique:doctors,license_number',
            'experience_years' => 'nullable|integer|min:0|max:80',
            'consultation_fee' => 'nullable|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        Doctor::create($validated);

        return redirect()->route('doctors.index')->with('success', 'Doctor created successfully.');
    }

    public function show(Doctor $doctor)
    {
        $doctor->load('user');
        return Inertia::render('Doctors/Show', [
            'doctor' => $doctor,
        ]);
    }

    public function edit(Doctor $doctor)
    {
        $doctor->load('user');
        return Inertia::render('Doctors/Edit', [
            'doctor' => $doctor,
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255|unique:doctors,license_number,' . $doctor->id,
            'experience_years' => 'nullable|integer|min:0|max:80',
            'consultation_fee' => 'nullable|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        $doctor->update($validated);

        return redirect()->route('doctors.index')->with('success', 'Doctor updated successfully.');
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return redirect()->route('doctors.index')->with('success', 'Doctor deleted successfully.');
    }
}
