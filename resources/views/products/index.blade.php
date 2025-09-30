<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Products') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Products</h1>
                <p class="text-gray-600 mt-1">Manage all inventory products</p>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">Product List</h3>
                        <p class="text-sm text-gray-500 mt-1">All products in the system</p>
                    </div>
                    <div class="flex items-center gap-2">
                        @if(Auth::user()->role === 'admin')
                        <a href="{{ route('products.logs') }}"
                           class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            View Logs
                        </a>
                        @endif
                        <a href="{{ route('products.create') }}"
                           class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            Add New Product
                        </a>
                    </div>
                </div>
                <div class="p-6 border-b border-gray-100">
                    @if(session('success'))
                        <div class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                            {{ session('success') }}
                        </div>
                    @endif

                    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <form method="GET" action="{{ route('products.index') }}" class="flex items-center w-full sm:w-auto">
                            <label for="search" class="sr-only">Search products</label>
                            <div class="relative w-full sm:w-72">
                                <input id="search" name="search" value="{{ request('search') }}" type="text" placeholder="Search products..." class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
                                </div>
                            </div>
                            <button type="submit" class="ml-3 inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium">Search</button>
                            @if(request('search'))
                                <a href="{{ route('products.index') }}" class="ml-2 inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm">Clear</a>
                            @endif
                        </form>

                        <div class="text-sm text-gray-600">
                            <span class="font-medium">Showing</span>
                            <span class="ml-1">{{ $products->firstItem() ?? 0 }}-{{ $products->lastItem() ?? 0 }}</span>
                            <span class="mx-1">of</span>
                            <span class="font-medium">{{ $products->total() }}</span>
                        </div>
                    </div>

                    @if($products->count() > 0)
                        <div class="overflow-x-auto rounded-lg border border-gray-200">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Code</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    @foreach($products as $product)
                                    <tr class="hover:bg-gray-50 transition-colors duration-150">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $product->ProductName }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->AssetCode }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->SerialNumber }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->Status }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->addedBy->name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div class="flex items-center space-x-2">
                                                <button type="button" class="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 view-btn"
                                                        data-product-name="{{ $product->ProductName }}"
                                                        data-product-model="{{ $product->ProductModel }}"
                                                        data-product-manufacturer="{{ $product->Manufacturer }}"
                                                        data-product-typeid="{{ $product->ProductTypeId }}"
                                                        data-product-type-name="{{ $product->productType->name ?? '' }}"
                                                        data-product-assetcode="{{ $product->AssetCode }}"
                                                        data-product-serialnumber="{{ $product->SerialNumber }}"
                                                        data-product-servicetag="{{ $product->ServiceTag }}"
                                                        data-product-hd="{{ $product->HD }}"
                                                        data-product-ram="{{ $product->RAM }}"
                                                        data-product-cpu="{{ $product->CPU }}"
                                                        data-product-status="{{ $product->Status }}"
                                                        data-product-addedby="{{ $product->addedBy->name ?? '' }}"
                                                        data-product-dateadd="{{ $product->DateAdd ?? '' }}"
                                                        data-product-yearbought="{{ $product->YearBought }}">
                                                    View
                                                </button>

                                                <a href="{{ route('products.edit', $product->id) }}" class="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50">Edit</a>
                                                <form action="{{ route('products.destroy', $product->id) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this product?');">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-red-600 hover:bg-red-50">Delete</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <!-- Modal (hidden by default) -->
                        <div id="product-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50 px-4">
                            <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                                <div class="flex justify-between items-center px-6 py-4 border-b">
                                    <h3 class="text-lg font-medium text-gray-900">Product Details</h3>
                                    <button id="modal-close" class="text-gray-500 hover:text-gray-700">&times;</button>
                                </div>
                                <div class="p-6 space-y-3">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><strong>Product Name:</strong> <span id="m-ProductName" class="text-gray-700"></span></div>
                                        <div><strong>Product Model:</strong> <span id="m-ProductModel" class="text-gray-700"></span></div>
                                        <div><strong>Manufacturer:</strong> <span id="m-Manufacturer" class="text-gray-700"></span></div>
                                        <div><strong>Product Type:</strong> <span id="m-ProductTypeName" class="text-gray-700"></span></div>
                                        <div><strong>Asset Code:</strong> <span id="m-AssetCode" class="text-gray-700"></span></div>
                                        <div><strong>Serial Number:</strong> <span id="m-SerialNumber" class="text-gray-700"></span></div>
                                        <div><strong>Service Tag:</strong> <span id="m-ServiceTag" class="text-gray-700"></span></div>
                                        <div><strong>HD:</strong> <span id="m-HD" class="text-gray-700"></span></div>
                                        <div><strong>RAM:</strong> <span id="m-RAM" class="text-gray-700"></span></div>
                                        <div><strong>CPU:</strong> <span id="m-CPU" class="text-gray-700"></span></div>
                                        <div><strong>Status:</strong> <span id="m-Status" class="text-gray-700"></span></div>
                                        <div><strong>Added By:</strong> <span id="m-AddedBy" class="text-gray-700"></span></div>
                                        <div><strong>Date Added:</strong> <span id="m-DateAdd" class="text-gray-700"></span></div>
                                        <div><strong>Year Bought:</strong> <span id="m-YearBought" class="text-gray-700"></span></div>
                                    </div>
                                </div>
                                <div class="flex justify-end px-6 py-4 border-t">
                                    <button id="modal-close-2" class="px-4 py-2 bg-gray-100 rounded-md">Close</button>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            {{ $products->links() }}
                        </div>
                    
                        <script>
                            document.addEventListener('DOMContentLoaded', function () {
                                const modal = document.getElementById('product-modal');
                                const closeBtns = [document.getElementById('modal-close'), document.getElementById('modal-close-2')];

                                function openModal(data) {
                                    // populate fields
                                    document.getElementById('m-ProductName').textContent = data.ProductName || '';
                                    document.getElementById('m-ProductModel').textContent = data.ProductModel || '';
                                    document.getElementById('m-Manufacturer').textContent = data.Manufacturer || '';
                                    document.getElementById('m-ProductTypeName').textContent = data.ProductTypeName || data.ProductTypeId || '';
                                    document.getElementById('m-AssetCode').textContent = data.AssetCode || '';
                                    document.getElementById('m-SerialNumber').textContent = data.SerialNumber || '';
                                    document.getElementById('m-ServiceTag').textContent = data.ServiceTag || '';
                                    document.getElementById('m-HD').textContent = data.HD || '';
                                    document.getElementById('m-RAM').textContent = data.RAM || '';
                                    document.getElementById('m-CPU').textContent = data.CPU || '';
                                    document.getElementById('m-Status').textContent = data.Status || '';
                                    document.getElementById('m-AddedBy').textContent = data.AddedBy || '';
                                    document.getElementById('m-DateAdd').textContent = data.DateAdd || '';
                                    document.getElementById('m-YearBought').textContent = data.YearBought || '';

                                    modal.classList.remove('hidden');
                                    modal.classList.add('flex');
                                }

                                function closeModal() {
                                    modal.classList.add('hidden');
                                    modal.classList.remove('flex');
                                }

                                // attach to view buttons
                                document.querySelectorAll('.view-btn').forEach(btn => {
                                    btn.addEventListener('click', function () {
                                        const data = {
                                            ProductName: this.getAttribute('data-product-name'),
                                            ProductModel: this.getAttribute('data-product-model'),
                                            Manufacturer: this.getAttribute('data-product-manufacturer'),
                                            ProductTypeId: this.getAttribute('data-product-typeid'),
                                            AssetCode: this.getAttribute('data-product-assetcode'),
                                            SerialNumber: this.getAttribute('data-product-serialnumber'),
                                            ServiceTag: this.getAttribute('data-product-servicetag'),
                                            HD: this.getAttribute('data-product-hd'),
                                            RAM: this.getAttribute('data-product-ram'),
                                            CPU: this.getAttribute('data-product-cpu'),
                                            Status: this.getAttribute('data-product-status'),
                                            AddedBy: this.getAttribute('data-product-addedby'),
                                            DateAdd: this.getAttribute('data-product-dateadd'),
                                            YearBought: this.getAttribute('data-product-yearbought'),
                                            ProductTypeName: this.getAttribute('data-product-type-name'),
                                        };

                                        openModal(data);
                                    });
                                });

                                closeBtns.forEach(b => b?.addEventListener('click', closeModal));

                                // close on backdrop click
                                modal.addEventListener('click', function (e) {
                                    if (e.target === modal) closeModal();
                                });
                            });
                        </script>
                    @else
                        <div class="text-center py-12">
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                            <p class="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                            <div class="mt-6">
                                <a href="{{ route('products.create') }}" 
                                   class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                    Create Product
                                </a>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            @if($deletedProducts->count() > 0)
            <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100">
                    <h3 class="text-lg font-medium text-gray-900">Deleted Products</h3>
                    <p class="text-sm text-gray-500 mt-1">Recently deleted products that can be restored.</p>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto rounded-lg border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Code</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Deleted</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                @foreach($deletedProducts as $product)
                                <tr class="hover:bg-gray-50 transition-colors duration-150">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $product->ProductName }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->AssetCode }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $product->deleted_at->format('Y-m-d H:i:s') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="{{ route('products.restore', $product->id) }}" class="text-indigo-600 hover:text-indigo-900">Restore</a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</x-app-layout>
