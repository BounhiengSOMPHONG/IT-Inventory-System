<!-- Mobile sidebar toggle button -->
<div 
    x-data="{ open: false }"
    x-cloak
    @keydown.window.escape="open = false"
    class="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 lg:hidden"
>
    <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center">
            <button 
                @click="open = !open" 
                class="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <a href="{{ route('dashboard') }}" class="ml-4 flex items-center">
                <x-application-logo class="block h-8 w-auto fill-current text-gray-800" />
            </a>
        </div>

        <!-- Settings Dropdown (mobile header) -->
        <div class="flex items-center">
            @include('layouts.settings-dropdown')
        </div>
    </div>
</div>

<!-- Main sidebar -->
<div 
    x-data="{ open: false }"
    x-cloak
    @keydown.window.escape="open = false"
    class="fixed inset-y-0 left-0 z-20 w-64 bg-[#F8F9FA] border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="{'translate-x-0': open, '-translate-x-full': !open}"
>
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div class="flex items-center">
            <a href="{{ route('dashboard') }}">
                <x-application-logo class="h-8 w-auto fill-current text-gray-800" />
            </a>
        </div>
        <div class="absolute right-4 hidden lg:flex">
            @include('layouts.settings-dropdown')
        </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-2">
        <a 
            href="{{ route('dashboard') }}"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                {{ request()->routeIs('dashboard') 
                    ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' }}"
        >
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Dashboard
        </a>
        
        <a 
            href="{{ route('departments.index') }}"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                {{ request()->routeIs('departments.*') 
                    ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' }}"
        >
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Departments
        </a>
    </nav>
</div>
