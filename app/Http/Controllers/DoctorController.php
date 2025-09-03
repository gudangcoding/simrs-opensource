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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255|unique:doctors,license_number',
        ]);

        // Create user first
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'role' => 'doctor',
            'password' => bcrypt('password'), // Default password
        ]);

        // Create doctor
        $doctor = Doctor::create([
            'user_id' => $user->id,
            'specialization' => $validated['specialization'],
            'license_number' => $validated['license_number'],
        ]);

        // If it's an AJAX request, return JSON
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Doctor created successfully.',
                'doctor' => $doctor->load('user')
            ]);
        }

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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $doctor->user_id,
            'phone' => 'nullable|string|max:20',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:255|unique:doctors,license_number,' . $doctor->id,
        ]);

        // Update user
        $doctor->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ]);

        // Update doctor
        $doctor->update([
            'specialization' => $validated['specialization'],
            'license_number' => $validated['license_number'],
        ]);

        // If it's an AJAX request, return JSON
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Doctor updated successfully.',
                'doctor' => $doctor->load('user')
            ]);
        }

        return redirect()->route('doctors.index')->with('success', 'Doctor updated successfully.');
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return redirect()->route('doctors.index')->with('success', 'Doctor deleted successfully.');
    }
}
