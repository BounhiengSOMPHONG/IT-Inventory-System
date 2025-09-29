<x-guest-layout>
    <form id="register-form" method="POST" action="{{ route('register') }}" enctype="multipart/form-data">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="mt-4">
            <div class="w-full mb-4">
                <x-input-label for="avatar" :value="__('Profile Photo')" />
                <div class="mt-1 flex items-center gap-4">
                    <div class="flex items-center justify-center w-20 h-20 rounded-md bg-gray-50 border border-gray-200 overflow-hidden">
                        <img id="avatar-preview" src="{{ old('avatar_preview') ?? '' }}" alt="Preview" class="object-cover w-full h-full hidden" />
                        <div id="avatar-placeholder" class="text-xs text-gray-400 text-center px-1">No file<br/>chosen</div>
                    </div>

                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <label for="avatar" class="inline-flex items-center px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                                Choose File
                                <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" class="sr-only" />
                            </label>
                            <div id="avatar-filename" class="text-sm text-gray-600">No file chosen</div>
                        </div>
                        <div id="avatar-hint" class="text-xs text-gray-500 mt-2">สูงสุด 10 MB, .png/.jpg/.jpeg</div>
                        <div id="avatar-error" class="text-xs text-red-600 mt-2 hidden"></div>
                        <x-input-error :messages="$errors->get('avatar')" class="mt-2" />
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between mt-4">
                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

                <x-primary-button>
                    {{ __('Register') }}
                </x-primary-button>
            </div>
        </div>
    </form>
</x-guest-layout>

    <script>
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    const input = document.getElementById('avatar');
    const preview = document.getElementById('avatar-preview');
    const placeholder = document.getElementById('avatar-placeholder');
    const filename = document.getElementById('avatar-filename');
    const errorBox = document.getElementById('avatar-error');
    const maxBytes = 10 * 1024 * 1024; // 10 MB
    const storageKeyPreview = 'register_avatar_preview';
    const storageKeyName = 'register_avatar_name';

    function resetPreview() {
        preview.src = '';
        preview.classList.add('hidden');
        placeholder.classList.remove('hidden');
        filename.textContent = 'No file chosen';
        errorBox.classList.add('hidden');
        errorBox.textContent = '';
        localStorage.removeItem(storageKeyPreview);
        localStorage.removeItem(storageKeyName);
    }

    // Restore preview from localStorage if available (helps after redirect back)
    const savedPreview = localStorage.getItem(storageKeyPreview);
    const savedName = localStorage.getItem(storageKeyName);
    if (savedPreview) {
        preview.src = savedPreview;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        filename.textContent = savedName || '';
    }

    input.addEventListener('change', function (e) {
        const file = input.files && input.files[0];
        if (!file) {
            resetPreview();
            return;
        }

        // Client-side validation
        const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowed.includes(file.type)) {
            errorBox.textContent = 'ไฟล์ต้องเป็น .png หรือ .jpg/.jpeg เท่านั้น';
            errorBox.classList.remove('hidden');
            input.value = '';
            resetPreview();
            return;
        }

        if (file.size > maxBytes) {
            errorBox.textContent = 'ไฟล์ใหญ่เกิน 10 MB';
            errorBox.classList.remove('hidden');
            input.value = '';
            resetPreview();
            return;
        }

        // Show filename and preview and save to localStorage so preview survives redirect
        filename.textContent = file.name;
        placeholder.classList.add('hidden');
        const reader = new FileReader();
        reader.onload = function (ev) {
            preview.src = ev.target.result;
            preview.classList.remove('hidden');
            try {
                localStorage.setItem(storageKeyPreview, ev.target.result);
                localStorage.setItem(storageKeyName, file.name);
            } catch (err) {
                // ignore storage errors
            }
        };
        reader.readAsDataURL(file);
    });

    // Basic client-side password checks to avoid server-side rejection which clears file input
    form.addEventListener('submit', function (e) {
        const password = document.getElementById('password');
        const passwordConfirmation = document.getElementById('password_confirmation');
        if (!password || !passwordConfirmation) return;

        const pw = password.value || '';
        const pwc = passwordConfirmation.value || '';
        if (pw.length < 8) {
            alert('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
            e.preventDefault();
            return;
        }
        if (pw !== pwc) {
            alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            e.preventDefault();
            return;
        }

        // Clear stored preview when actually submitting (so it doesn't persist)
        localStorage.removeItem(storageKeyPreview);
        localStorage.removeItem(storageKeyName);
    });
});
</script>

