<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Create Product') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form method="POST" action="{{ route('products.store') }}">
                        @csrf

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Product Name -->
                            <div>
                                <x-input-label for="ProductName" :value="__('Product Name')" />
                                <x-text-input id="ProductName" class="block mt-1 w-full" type="text" name="ProductName" :value="old('ProductName')" required autofocus />
                                <x-input-error :messages="$errors->get('ProductName')" class="mt-2" />
                            </div>

                            <!-- Product Model -->
                            <div>
                                <x-input-label for="ProductModel" :value="__('Product Model')" />
                                <x-text-input id="ProductModel" class="block mt-1 w-full" type="text" name="ProductModel" :value="old('ProductModel')" required />
                                <x-input-error :messages="$errors->get('ProductModel')" class="mt-2" />
                            </div>

                            <!-- Manufacturer -->
                            <div>
                                <x-input-label for="Manufacturer" :value="__('Manufacturer')" />
                                <x-text-input id="Manufacturer" class="block mt-1 w-full" type="text" name="Manufacturer" :value="old('Manufacturer')" required />
                                <x-input-error :messages="$errors->get('Manufacturer')" class="mt-2" />
                            </div>

                            <!-- Product Type -->
                            <div>
                                <x-input-label for="ProductTypeId" :value="__('Product Type')" />
                                <select name="ProductTypeId" id="ProductTypeId" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                    @foreach($productTypes as $type)
                                        <option value="{{ $type->id }}">{{ $type->product_type_name }}</option>
                                    @endforeach
                                </select>
                                <x-input-error :messages="$errors->get('ProductTypeId')" class="mt-2" />
                            </div>

                            <!-- Asset Code -->
                            <div>
                                <x-input-label for="AssetCode" :value="__('Asset Code')" />
                                <x-text-input id="AssetCode" class="block mt-1 w-full" type="text" name="AssetCode" :value="old('AssetCode')" required />
                                <x-input-error :messages="$errors->get('AssetCode')" class="mt-2" />
                            </div>

                            <!-- Serial Number -->
                            <div>
                                <x-input-label for="SerialNumber" :value="__('Serial Number')" />
                                <x-text-input id="SerialNumber" class="block mt-1 w-full" type="text" name="SerialNumber" :value="old('SerialNumber')" required />
                                <x-input-error :messages="$errors->get('SerialNumber')" class="mt-2" />
                            </div>

                            <!-- Service Tag -->
                            <div>
                                <x-input-label for="ServiceTag" :value="__('Service Tag')" />
                                <x-text-input id="ServiceTag" class="block mt-1 w-full" type="text" name="ServiceTag" :value="old('ServiceTag')" required />
                                <x-input-error :messages="$errors->get('ServiceTag')" class="mt-2" />
                            </div>

                            <!-- Status -->
                            <div>
                                <x-input-label for="Status" :value="__('Status')" />
                                <x-text-input id="Status" class="block mt-1 w-full" type="text" name="Status" :value="old('Status')" required />
                                <x-input-error :messages="$errors->get('Status')" class="mt-2" />
                            </div>

                            <!-- HD -->
                            <div>
                                <x-input-label for="HD" :value="__('Hard Drive (HD)')" />
                                <x-text-input id="HD" class="block mt-1 w-full" type="text" name="HD" :value="old('HD')" required />
                                <x-input-error :messages="$errors->get('HD')" class="mt-2" />
                            </div>

                            <!-- RAM -->
                            <div>
                                <x-input-label for="RAM" :value="__('RAM')" />
                                <x-text-input id="RAM" class="block mt-1 w-full" type="text" name="RAM" :value="old('RAM')" required />
                                <x-input-error :messages="$errors->get('RAM')" class="mt-2" />
                            </div>

                            <!-- CPU -->
                            <div>
                                <x-input-label for="CPU" :value="__('CPU')" />
                                <x-text-input id="CPU" class="block mt-1 w-full" type="text" name="CPU" :value="old('CPU')" required />
                                <x-input-error :messages="$errors->get('CPU')" class="mt-2" />
                            </div>

                            <!-- Year Bought -->
                            <div>
                                <x-input-label for="YearBought" :value="__('Year Bought')" />
                                <x-text-input id="YearBought" class="block mt-1 w-full" type="number" name="YearBought" :value="old('YearBought')" required />
                                <x-input-error :messages="$errors->get('YearBought')" class="mt-2" />
                            </div>
                        </div>

                        <div class="flex items-center justify-end mt-6">
                            <a href="{{ route('products.index') }}" class="text-sm text-gray-600 hover:text-gray-900 mr-4">
                                {{ __('Cancel') }}
                            </a>

                            <x-primary-button>
                                {{ __('Create Product') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
