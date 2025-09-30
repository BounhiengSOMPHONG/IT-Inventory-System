<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $productTypes = ProductType::when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))->paginate(10);

        return view('product-types.index', compact('productTypes', 'search'));
    }

    public function create()
    {
        return view('product-types.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProductType::create($data);

        return redirect()->route('product-types.index')->with('success', 'Product type created successfully');
    }

    public function edit(ProductType $productType)
    {
        return view('product-types.edit', compact('productType'));
    }

    public function update(Request $request, ProductType $productType)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $productType->update($data);

        return redirect()->route('product-types.index')->with('success', 'Product type updated successfully');
    }

    public function destroy(ProductType $productType)
    {
        $productType->delete();
        return redirect()->route('product-types.index')->with('success', 'Product type deleted successfully');
    }
}


