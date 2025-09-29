@php
    // allow including file with compact mode: @include('layouts.settings-dropdown', ['compact' => true])
    $compact = $compact ?? false;
    $user = Auth::user();
@endphp

<div class="flex items-center">
    <x-dropdown align="right" width="48">
        <x-slot name="trigger">
            @if($compact)
                <!-- compact trigger: small chevron button -->
                <button class="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none border border-gray-100">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            @else
                <!-- full trigger: show avatar + user name with caret -->
                <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                    <div class="flex items-center gap-2">
                        @if(!empty($user->profile_photo_url))
                            <img src="{{ $user->profile_photo_url }}" alt="{{ $user->name }}" class="h-6 w-6 rounded-full object-cover">
                        @else
                            <div class="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">{{ strtoupper(substr($user->name,0,1)) }}</div>
                        @endif
                        <div>{{ $user->name }}</div>

                        <div class="ms-1">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </button>
            @endif
        </x-slot>

        <x-slot name="content">
            <x-dropdown-link :href="route('profile.edit')">
                {{ __('Profile') }}
            </x-dropdown-link>

            <!-- Authentication -->
            <form method="POST" action="{{ route('logout') }}">
                @csrf

                <x-dropdown-link :href="route('logout')"
                        onclick="event.preventDefault();
                                    this.closest('form').submit();">
                    {{ __('Log Out') }}
                </x-dropdown-link>
            </form>
        </x-slot>
    </x-dropdown>
</div>
