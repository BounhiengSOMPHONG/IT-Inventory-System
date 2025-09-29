<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('IT Inventory Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h1 class="text-2xl font-bold mb-6">Welcome to the IT Inventory System, {{ Auth::user()->name }}!</h1>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-blue-50 p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-blue-800">Assets Overview</h3>
                            <p class="mt-2 text-blue-600">Manage and track all IT assets</p>
                            <a href="#" class="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">View Assets</a>
                        </div>
                        
                        <div class="bg-green-50 p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-green-800">Employee Management</h3>
                            <p class="mt-2 text-green-600">Assign assets to employees</p>
                            <a href="#" class="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Manage Staff</a>
                        </div>
                        
                        <div class="bg-purple-50 p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold text-purple-800">Reports</h3>
                            <p class="mt-2 text-purple-600">Generate asset reports</p>
                            <a href="#" class="mt-4 inline-block bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">View Reports</a>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p>No recent activity yet. Log in to start managing your IT inventory.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
