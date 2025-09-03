<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('user')->latest()->paginate(10);

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications->items(),
            'pagination' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
                'from' => $notifications->firstItem(),
                'to' => $notifications->lastItem(),
                'links' => $notifications->linkCollection()->toArray(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Notifications/Create', [
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'nullable|string|max:50',
            'is_read' => 'boolean',
        ]);

        Notification::create($validated);

        return redirect()->route('notifications.index')->with('success', 'Notification created successfully.');
    }

    public function show(Notification $notification)
    {
        $notification->load('user');
        return Inertia::render('Notifications/Show', [
            'notification' => $notification,
        ]);
    }

    public function edit(Notification $notification)
    {
        $notification->load('user');
        return Inertia::render('Notifications/Edit', [
            'notification' => $notification,
            'users' => User::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'nullable|string|max:50',
            'is_read' => 'boolean',
        ]);

        $notification->update($validated);

        return redirect()->route('notifications.index')->with('success', 'Notification updated successfully.');
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();
        return redirect()->route('notifications.index')->with('success', 'Notification deleted successfully.');
    }
}
