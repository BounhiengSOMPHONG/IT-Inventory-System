<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Product Activity Logs') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Product Logs</h1>
                    <p class="text-gray-600 mt-1">History of product updates and deletions.</p>
                </div>
                <a href="{{ route('products.index') }}" 
                   class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                    Back to Products
                </a>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-6">
                    @if($logs->count() > 0)
                        <div class="overflow-x-auto rounded-lg border border-gray-200">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    @foreach($logs as $log)
                                    <tr class="hover:bg-gray-50 transition-colors duration-150">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {{ $log->product->ProductName ?? 'N/A' }} (ID: {{ $log->product_id }})
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $log->user->name ?? 'N/A' }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                @switch($log->action)
                                                    @case('updated') bg-blue-100 text-blue-800 @break
                                                    @case('deleted') bg-red-100 text-red-800 @break
                                                    @case('restored') bg-green-100 text-green-800 @break
                                                    @default bg-gray-100 text-gray-800
                                                @endswitch">
                                                {{ $log->action }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ $log->created_at->format('Y-m-d H:i:s') }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-4">
                            {{ $logs->links() }}
                        </div>
                    @else
                        <div class="text-center py-12">
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
                            <p class="mt-1 text-sm text-gray-500">No actions have been recorded yet.</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
