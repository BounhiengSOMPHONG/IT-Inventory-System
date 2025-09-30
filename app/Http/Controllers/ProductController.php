<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductLog;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['productType', 'addedBy']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('ProductName', 'like', "%{$search}%")
                  ->orWhere('ProductModel', 'like', "%{$search}%")
                  ->orWhere('AssetCode', 'like', "%{$search}%")
                  ->orWhere('SerialNumber', 'like', "%{$search}%")
                  ->orWhere('ServiceTag', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate(10);
        $deletedSearch = $request->get('deleted_search');
        $deletedProducts = Product::onlyTrashed()
            ->when($deletedSearch, function ($q) use ($deletedSearch) {
                $q->where(function ($q2) use ($deletedSearch) {
                    $q2->where('ProductName', 'like', "%{$deletedSearch}%")
                       ->orWhere('AssetCode', 'like', "%{$deletedSearch}%")
                       ->orWhere('SerialNumber', 'like', "%{$deletedSearch}%");
                });
            })
            ->get();

        return view('products.index', compact('products', 'deletedProducts'));
    }

    public function create()
    {
        $productTypes = ProductType::all();
        return view('products.create', compact('productTypes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'ProductName' => 'required|string|max:255',
            'ProductModel' => 'required|string|max:255',
            'Manufacturer' => 'required|string|max:255',
            'ProductTypeId' => 'required|exists:product_types,id',
            'AssetCode' => 'required|string|max:255|unique:products',
            'SerialNumber' => 'required|string|max:255|unique:products',
            'ServiceTag' => 'required|string|max:255|unique:products',
            'HD' => 'required|string|max:255',
            'RAM' => 'required|string|max:255',
            'CPU' => 'required|string|max:255',
            'Status' => 'required|string|max:255',
            'YearBought' => 'required|digits:4|integer|min:1900|max:'.(date('Y')+1),
        ]);

        Product::create($request->all() + [
            'AddedBy' => Auth::id(),
            'DateAdd' => now(),
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        $productTypes = ProductType::all();
        return view('products.edit', compact('product', 'productTypes'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'ProductName' => 'required|string|max:255',
            'ProductModel' => 'required|string|max:255',
            'Manufacturer' => 'required|string|max:255',
            'ProductTypeId' => 'required|exists:product_types,id',
            'AssetCode' => 'required|string|max:255|unique:products,AssetCode,'.$product->id,
            'SerialNumber' => 'required|string|max:255|unique:products,SerialNumber,'.$product->id,
            'ServiceTag' => 'required|string|max:255|unique:products,ServiceTag,'.$product->id,
            'HD' => 'required|string|max:255',
            'RAM' => 'required|string|max:255',
            'CPU' => 'required|string|max:255',
            'Status' => 'required|string|max:255',
            'YearBought' => 'required|digits:4|integer|min:1900|max:'.(date('Y')+1),
        ]);

        // capture the old data before updating
        $oldData = $product->getAttributes();

        $product->update($request->all());

        ProductLog::create([
            'product_id' => $product->id,
            'user_id' => Auth::id(),
            'action' => 'updated',
            'old_data' => $oldData,
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // capture the old data before soft deleting
        $oldData = $product->getAttributes();

        $product->delete();

        ProductLog::create([
            'product_id' => $product->id,
            'user_id' => Auth::id(),
            'action' => 'deleted',
            'old_data' => $oldData,
        ]);

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();

        ProductLog::create([
            'product_id' => $product->id,
            'user_id' => Auth::id(),
            'action' => 'restored',
        ]);

        return redirect()->route('products.index')->with('success', 'Product restored successfully.');
    }

    public function logs()
    {
        // Assuming only admins can see logs. Adjust the role name if necessary.
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
        
        $logs = ProductLog::with(['product', 'user'])->latest()->paginate(20);

        return view('products.logs', compact('logs'));
    }
}
