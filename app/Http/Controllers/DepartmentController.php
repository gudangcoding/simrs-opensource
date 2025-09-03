<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('headDoctor.user')->latest()->paginate(10);

        return Inertia::render('Departments/Index', [
            'departments' => $departments->items(),
            'pagination' => [
                'current_page' => $departments->currentPage(),
                'last_page' => $departments->lastPage(),
                'per_page' => $departments->perPage(),
                'total' => $departments->total(),
                'from' => $departments->firstItem(),
                'to' => $departments->lastItem(),
                'links' => $departments->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Departments/Create', [
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'head_doctor_id' => 'nullable|exists:doctors,id',
            'is_active' => 'boolean',
        ]);

        Department::create($validated);

        return redirect()->route('departments.index')->with('success', 'Department created successfully.');
    }

    public function show(Department $department)
    {
        $department->load('headDoctor.user');
        return Inertia::render('Departments/Show', [
            'department' => $department,
        ]);
    }

    public function edit(Department $department)
    {
        $department->load('headDoctor.user');
        return Inertia::render('Departments/Edit', [
            'department' => $department,
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'head_doctor_id' => 'nullable|exists:doctors,id',
            'is_active' => 'boolean',
        ]);

        $department->update($validated);

        return redirect()->route('departments.index')->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('success', 'Department deleted successfully.');
    }
}
