<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Create Product Type') }}</h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100">
                    <h3 class="text-lg font-medium text-gray-900">Create Product Type</h3>
                    <p class="text-sm text-gray-500 mt-1">Add a new product type to the system</p>
                </div>
                <div class="p-6">
                    <form method="POST" action="{{ route('product-types.store') }}">
                        @csrf

                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" value="{{ old('name') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required />
                                @error('name') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div class="flex items-center justify-end gap-3">
                                <a href="{{ route('product-types.index') }}" class="px-4 py-2 bg-gray-100 rounded-md">Cancel</a>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>


