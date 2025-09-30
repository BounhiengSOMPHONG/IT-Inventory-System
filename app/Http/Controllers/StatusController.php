<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');

        $query = Status::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

        $statuses = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return view('statuses.index', compact('statuses', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('statuses.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:statuses,name',
        ]);

        Status::create([
            'name' => $request->name,
        ]);

        return redirect()->route('statuses.index')
                         ->with('success', 'Status created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        return view('statuses.show', compact('status'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Status $status)
    {
        return view('statuses.edit', compact('status'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Status $status)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:statuses,name,' . $status->id,
        ]);

        $status->update([
            'name' => $request->name,
        ]);

        return redirect()->route('statuses.index')
                         ->with('success', 'Status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status)
    {
        $status->delete();

        return redirect()->route('statuses.index')
                         ->with('success', 'Status deleted successfully.');
    }
}
