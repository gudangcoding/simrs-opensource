<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with('doctor.user')->latest()->paginate(10);

        return Inertia::render('Schedules/Index', [
            'schedules' => $schedules->items(),
            'pagination' => [
                'current_page' => $schedules->currentPage(),
                'last_page' => $schedules->lastPage(),
                'per_page' => $schedules->perPage(),
                'total' => $schedules->total(),
                'from' => $schedules->firstItem(),
                'to' => $schedules->lastItem(),
                'links' => $schedules->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Schedules/Create', [
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|string|in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            'start_time' => 'required',
            'end_time' => 'required',
            'max_patients' => 'nullable|integer|min:1|max:200',
            'is_active' => 'boolean',
        ]);

        Schedule::create($validated);

        return redirect()->route('schedules.index')->with('success', 'Schedule created successfully.');
    }

    public function show(Schedule $schedule)
    {
        $schedule->load('doctor.user');
        return Inertia::render('Schedules/Show', [
            'schedule' => $schedule,
        ]);
    }

    public function edit(Schedule $schedule)
    {
        $schedule->load('doctor.user');
        return Inertia::render('Schedules/Edit', [
            'schedule' => $schedule,
            'doctors' => Doctor::with('user:id,name')->get()->map(fn ($d) => [
                'id' => $d->id,
                'name' => $d->user->name,
            ]),
        ]);
    }

    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|string|in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            'start_time' => 'required',
            'end_time' => 'required',
            'max_patients' => 'nullable|integer|min:1|max:200',
            'is_active' => 'boolean',
        ]);

        $schedule->update($validated);

        return redirect()->route('schedules.index')->with('success', 'Schedule updated successfully.');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->route('schedules.index')->with('success', 'Schedule deleted successfully.');
    }
}
