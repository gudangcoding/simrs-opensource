<?php

namespace App\Http\Controllers;

use App\Models\Nurse;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NurseController extends Controller
{
    public function index()
    {
        $nurses = Nurse::with('user')->latest()->paginate(10);

        return Inertia::render('Nurses/Index', [
            'nurses' => $nurses->items(),
            'pagination' => [
                'current_page' => $nurses->currentPage(),
                'last_page' => $nurses->lastPage(),
                'per_page' => $nurses->perPage(),
                'total' => $nurses->total(),
                'from' => $nurses->firstItem(),
                'to' => $nurses->lastItem(),
                'links' => $nurses->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Nurses/Create', [
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'license_number' => 'required|string|max:255|unique:nurses,license_number',
            'department' => 'required|string|max:255',
            'shift' => 'nullable|string|max:50',
            'is_available' => 'boolean',
        ]);

        Nurse::create($validated);

        return redirect()->route('nurses.index')->with('success', 'Nurse created successfully.');
    }

    public function show(Nurse $nurse)
    {
        $nurse->load('user');
        return Inertia::render('Nurses/Show', [
            'nurse' => $nurse,
        ]);
    }

    public function edit(Nurse $nurse)
    {
        $nurse->load('user');
        return Inertia::render('Nurses/Edit', [
            'nurse' => $nurse,
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Nurse $nurse)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'license_number' => 'required|string|max:255|unique:nurses,license_number,' . $nurse->id,
            'department' => 'required|string|max:255',
            'shift' => 'nullable|string|max:50',
            'is_available' => 'boolean',
        ]);

        $nurse->update($validated);

        return redirect()->route('nurses.index')->with('success', 'Nurse updated successfully.');
    }

    public function destroy(Nurse $nurse)
    {
        $nurse->delete();
        return redirect()->route('nurses.index')->with('success', 'Nurse deleted successfully.');
    }
}
