<div class="border-t border-gray-200 p-4">
    <a href="{{ route('profile.edit') }}" class="flex items-center gap-3 hover:bg-gray-100 rounded-md p-2">
        <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src="{{ Auth::user()->avatar_url }}" alt="{{ Auth::user()->name }}'s avatar" class="h-full w-full object-cover" />
        </div>

        <div class="flex-1">
            <div class="text-sm font-medium text-gray-900">{{ Auth::user()->name }}</div>
            <div class="text-xs text-gray-500">View profile</div>
        </div>
    </a>
</div>
