<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Departments') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="flex justify-between items-center mb-6">
                        <h1 class="text-2xl font-bold">Department Details</h1>
                        <div>
                            <a href="{{ route('departments.edit', $department->id) }}" 
                               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </a>
                            <a href="{{ route('departments.index') }}" 
                               class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Back to List
                            </a>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <p><strong>ID:</strong> {{ $department->id }}</p>
                        <p class="mt-2"><strong>Department Name:</strong> {{ $department->department_name }}</p>
                        <p class="mt-2"><strong>Created At:</strong> {{ $department->created_at->format('M d, Y H:i') }}</p>
                        <p class="mt-2"><strong>Updated At:</strong> {{ $department->updated_at->format('M d, Y H:i') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>