<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('IT Inventory Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Welcome Section -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p class="mt-2 text-gray-600">Welcome back, {{ Auth::user()->name }}. Here's what's happening with your IT inventory today.</p>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
                    <div class="flex items-center">
                        <div class="p-3 rounded-lg bg-blue-400 bg-opacity-30">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold">142</h3>
                            <p class="text-blue-100">Total Assets</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
                    <div class="flex items-center">
                        <div class="p-3 rounded-lg bg-green-400 bg-opacity-30">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold">128</h3>
                            <p class="text-green-100">Active Assets</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-md p-6 text-white">
                    <div class="flex items-center">
                        <div class="p-3 rounded-lg bg-amber-400 bg-opacity-30">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold">10</h3>
                            <p class="text-amber-100">Maintenance</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                    <div class="flex items-center">
                        <div class="p-3 rounded-lg bg-purple-400 bg-opacity-30">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold">42</h3>
                            <p class="text-purple-100">Assigned</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Assets Overview Card -->
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-900">Assets Overview</h3>
                        <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                            View All
                            <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">36</div>
                            <div class="text-xs text-gray-600">Laptops</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">28</div>
                            <div class="text-xs text-gray-600">Desktops</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">19</div>
                            <div class="text-xs text-gray-600">Tablets</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <div class="text-2xl font-bold text-gray-900">59</div>
                            <div class="text-xs text-gray-600">Accessories</div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="p-2 bg-blue-100 rounded-lg">
                                    <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div class="font-medium text-gray-900">Dell XPS 13</div>
                                    <div class="text-sm text-gray-600">Laptop • Asset #IT-001</div>
                                </div>
                            </div>
                            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="p-2 bg-green-100 rounded-lg">
                                    <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div class="font-medium text-gray-900">MacBook Pro</div>
                                    <div class="text-sm text-gray-600">Laptop • Asset #IT-002</div>
                                </div>
                            </div>
                            <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Assigned</span>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="p-2 bg-amber-100 rounded-lg">
                                    <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div class="font-medium text-gray-900">HP Printer</div>
                                    <div class="text-sm text-gray-600">Peripherals • Asset #IT-003</div>
                                </div>
                            </div>
                            <span class="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">Maintenance</span>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Add New Asset
                        </a>
                    </div>
                </div>

                <!-- Quick Actions & Recent Activity -->
                <div class="space-y-6">
                    <!-- Quick Actions -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <a href="#" class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="p-2 bg-blue-100 rounded-lg mb-2">
                                    <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-700">Add Asset</span>
                            </a>
                            <a href="#" class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="p-2 bg-green-100 rounded-lg mb-2">
                                    <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-700">Assign Asset</span>
                            </a>
                            <a href="#" class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="p-2 bg-purple-100 rounded-lg mb-2">
                                    <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-700">Generate Report</span>
                            </a>
                            <a href="#" class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="p-2 bg-amber-100 rounded-lg mb-2">
                                    <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-700">Settings</span>
                            </a>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div class="space-y-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-gray-900">New asset added</p>
                                    <p class="text-sm text-gray-600">Dell XPS 13 • John Smith</p>
                                    <p class="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-gray-900">Asset assigned</p>
                                    <p class="text-sm text-gray-600">MacBook Pro • Jane Doe</p>
                                    <p class="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-gray-900">Maintenance scheduled</p>
                                    <p class="text-sm text-gray-600">HP Printer • Q3 Review</p>
                                    <p class="text-xs text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Asset Distribution Chart Placeholder -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Asset Distribution by Department</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <p class="text-gray-500">Asset Distribution Chart</p>
                    </div>
                    <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <p class="text-gray-500">Asset Status Overview</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
