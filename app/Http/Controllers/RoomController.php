<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with('department')->latest()->paginate(10);

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms->items(),
            'pagination' => [
                'current_page' => $rooms->currentPage(),
                'last_page' => $rooms->lastPage(),
                'per_page' => $rooms->perPage(),
                'total' => $rooms->total(),
                'from' => $rooms->firstItem(),
                'to' => $rooms->lastItem(),
                'links' => $rooms->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Rooms/Create', [
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|max:50|unique:rooms,room_number',
            'room_type' => 'required|string|max:100',
            'department_id' => 'required|exists:departments,id',
            'bed_capacity' => 'required|integer|min:1|max:100',
            'current_occupancy' => 'nullable|integer|min:0',
            'price_per_day' => 'nullable|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        Room::create($validated);

        return redirect()->route('rooms.index')->with('success', 'Room created successfully.');
    }

    public function show(Room $room)
    {
        $room->load('department');
        return Inertia::render('Rooms/Show', [
            'room' => $room,
        ]);
    }

    public function edit(Room $room)
    {
        $room->load('department');
        return Inertia::render('Rooms/Edit', [
            'room' => $room,
            'departments' => Department::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|max:50|unique:rooms,room_number,' . $room->id,
            'room_type' => 'required|string|max:100',
            'department_id' => 'required|exists:departments,id',
            'bed_capacity' => 'required|integer|min:1|max:100',
            'current_occupancy' => 'nullable|integer|min:0',
            'price_per_day' => 'nullable|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        $room->update($validated);

        return redirect()->route('rooms.index')->with('success', 'Room updated successfully.');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('rooms.index')->with('success', 'Room deleted successfully.');
    }
}
