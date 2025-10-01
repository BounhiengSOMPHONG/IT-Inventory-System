<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Create Employee') }}</h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-6">
                    <form method="POST" action="{{ route('employees.store') }}">
                        @csrf

                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Employee Code</label>
                                <input type="text" name="employee_code" value="{{ old('employee_code') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required />
                                @error('employee_code') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" value="{{ old('name') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required />
                                @error('name') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Position</label>
                                <input type="text" name="position" value="{{ old('position') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required />
                                @error('position') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" value="{{ old('email') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required />
                                @error('email') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="text" name="phone" value="{{ old('phone') }}" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" />
                                @error('phone') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Status</label>
                                <select name="status" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required>
                                    <option value="active" {{ old('status') == 'active' ? 'selected' : '' }}>Active</option>
                                    <option value="inactive" {{ old('status') == 'inactive' ? 'selected' : '' }}>Inactive</option>
                                    <option value="resigned" {{ old('status') == 'resigned' ? 'selected' : '' }}>Resigned</option>
                                </select>
                                @error('status') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Department</label>
                                <select name="department_id" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" required>
                                    <option value="">Select department</option>
                                    @foreach($departments as $dept)
                                        <option value="{{ $dept->id }}" {{ old('department_id') == $dept->id ? 'selected' : '' }}>{{ $dept->department_name }}</option>
                                    @endforeach
                                </select>
                                @error('department_id') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700">Remark</label>
                                <textarea name="remark" class="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2">{{ old('remark') }}</textarea>
                                @error('remark') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
                            </div>

                            <div class="flex items-center justify-end gap-3">
                                <a href="{{ route('employees.index') }}" class="px-4 py-2 bg-gray-100 rounded-md">Cancel</a>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>


