<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsuranceController extends Controller
{
    public function index()
    {
        $insurances = Insurance::latest()->paginate(10);

        return Inertia::render('Insurances/Index', [
            'insurances' => $insurances->items(),
            'pagination' => [
                'current_page' => $insurances->currentPage(),
                'last_page' => $insurances->lastPage(),
                'per_page' => $insurances->perPage(),
                'total' => $insurances->total(),
                'from' => $insurances->firstItem(),
                'to' => $insurances->lastItem(),
                'links' => $insurances->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Insurances/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'coverage_percentage' => 'nullable|integer|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        Insurance::create($validated);

        return redirect()->route('insurances.index')->with('success', 'Insurance created successfully.');
    }

    public function show(Insurance $insurance)
    {
        return Inertia::render('Insurances/Show', [
            'insurance' => $insurance,
        ]);
    }

    public function edit(Insurance $insurance)
    {
        return Inertia::render('Insurances/Edit', [
            'insurance' => $insurance,
        ]);
    }

    public function update(Request $request, Insurance $insurance)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'coverage_percentage' => 'nullable|integer|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $insurance->update($validated);

        return redirect()->route('insurances.index')->with('success', 'Insurance updated successfully.');
    }

    public function destroy(Insurance $insurance)
    {
        $insurance->delete();
        return redirect()->route('insurances.index')->with('success', 'Insurance deleted successfully.');
    }
}
