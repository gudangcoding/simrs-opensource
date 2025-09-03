<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = Medicine::latest()->paginate(10);

        return Inertia::render('Medicines/Index', [
            'medicines' => $medicines->items(),
            'pagination' => [
                'current_page' => $medicines->currentPage(),
                'last_page' => $medicines->lastPage(),
                'per_page' => $medicines->perPage(),
                'total' => $medicines->total(),
                'from' => $medicines->firstItem(),
                'to' => $medicines->lastItem(),
                'links' => $medicines->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Medicines/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'generic_name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'dosage_form' => 'nullable|string|max:255',
            'strength' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:50',
            'stock_quantity' => 'required|integer|min:0',
            'minimum_stock' => 'nullable|integer|min:0',
            'price_per_unit' => 'nullable|numeric|min:0',
            'expiry_date' => 'nullable|date',
            'supplier' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        Medicine::create($validated);

        return redirect()->route('medicines.index')->with('success', 'Medicine created successfully.');
    }

    public function show(Medicine $medicine)
    {
        return Inertia::render('Medicines/Show', [
            'medicine' => $medicine,
        ]);
    }

    public function edit(Medicine $medicine)
    {
        return Inertia::render('Medicines/Edit', [
            'medicine' => $medicine,
        ]);
    }

    public function update(Request $request, Medicine $medicine)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'generic_name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'dosage_form' => 'nullable|string|max:255',
            'strength' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:50',
            'stock_quantity' => 'required|integer|min:0',
            'minimum_stock' => 'nullable|integer|min:0',
            'price_per_unit' => 'nullable|numeric|min:0',
            'expiry_date' => 'nullable|date',
            'supplier' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $medicine->update($validated);

        return redirect()->route('medicines.index')->with('success', 'Medicine updated successfully.');
    }

    public function destroy(Medicine $medicine)
    {
        $medicine->delete();
        return redirect()->route('medicines.index')->with('success', 'Medicine deleted successfully.');
    }
}
