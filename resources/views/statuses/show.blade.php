<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Statuses') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Status Details</h1>
                <p class="text-gray-600 mt-1">View and manage status information</p>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 class="text-lg font-medium text-gray-900">{{ $status->name }}</h3>
                    <div class="flex space-x-3">
                        <a href="{{ route('statuses.edit', $status->id) }}" 
                           class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Edit
                        </a>
                        <a href="{{ route('statuses.index') }}" 
                           class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Back to List
                        </a>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 gap-6">
                        <div class="border-b border-gray-200 pb-4">
                            <dt class="text-sm font-medium text-gray-500">ID</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $status->id }}</dd>
                        </div>
                        
                        <div class="border-b border-gray-200 pb-4">
                            <dt class="text-sm font-medium text-gray-500">Status Name</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $status->name }}</dd>
                        </div>
                        
                        <div class="border-b border-gray-200 pb-4">
                            <dt class="text-sm font-medium text-gray-500">Created At</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $status->created_at->format('M d, Y H:i') }}</dd>
                        </div>
                        
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Updated At</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $status->updated_at->format('M d, Y H:i') }}</dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>