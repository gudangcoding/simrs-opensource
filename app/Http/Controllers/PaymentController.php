<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('patient')->latest()->paginate(10);

        return Inertia::render('Payments/Index', [
            'payments' => $payments->items(),
            'pagination' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
                'from' => $payments->firstItem(),
                'to' => $payments->lastItem(),
                'links' => $payments->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Payments/Create', [
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'payment_type' => 'required|string|max:100',
            'reference_id' => 'nullable|integer',
            'reference_type' => 'nullable|string|max:100',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cash,card,transfer,insurance',
            'payment_status' => 'required|string|in:pending,paid,failed,refunded',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        Payment::create($validated);

        return redirect()->route('payments.index')->with('success', 'Payment recorded successfully.');
    }

    public function show(Payment $payment)
    {
        $payment->load('patient');
        return Inertia::render('Payments/Show', [
            'payment' => $payment,
        ]);
    }

    public function edit(Payment $payment)
    {
        $payment->load('patient');
        return Inertia::render('Payments/Edit', [
            'payment' => $payment,
            'patients' => Patient::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'payment_type' => 'required|string|max:100',
            'reference_id' => 'nullable|integer',
            'reference_type' => 'nullable|string|max:100',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cash,card,transfer,insurance',
            'payment_status' => 'required|string|in:pending,paid,failed,refunded',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $payment->update($validated);

        return redirect()->route('payments.index')->with('success', 'Payment updated successfully.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index')->with('success', 'Payment deleted successfully.');
    }
}
