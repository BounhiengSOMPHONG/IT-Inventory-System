<form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6" enctype="multipart/form-data">
        @csrf
        @method('patch')

    <div>
        <x-input-label for="avatar" :value="__('Profile Photo')" />

        <!-- Preview + file input -->
        <div class="flex items-center gap-4">
            @php $previewUrl = old('avatar_preview') ?? $user->profile_photo_url; @endphp
            <div id="avatar-preview" class="h-16 w-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                @if(!empty($previewUrl))
                    <img id="avatar-preview-img" src="{{ $previewUrl }}" alt="{{ $user->name }}" class="h-full w-full object-cover">
                @else
                    <div id="avatar-preview-initial" class="text-sm font-medium text-gray-700">{{ strtoupper(substr($user->name,0,1)) }}</div>
                @endif
            </div>

            <div class="flex-1">
                <input id="avatar" type="file" name="avatar" accept="image/*" class="mt-1 block w-full" />
                <div id="avatar-hint" class="text-xs text-gray-500">สูงสุด 10 MB, .png/.jpg/.jpeg</div>
                <x-input-error :messages="$errors->get('avatar')" class="mt-2" />
            </div>
        </div>

    <script>
    document.getElementById('avatar')?.addEventListener('change', function(e){
        const f = e.target.files[0];
        if(!f) return;
        const mb = (f.size / 1024 / 1024).toFixed(2);
        document.getElementById('avatar-hint').textContent = `ขนาดไฟล์: ${mb} MB`;

        // preview
        const reader = new FileReader();
        reader.onload = function(ev){
            const src = ev.target.result;
            let img = document.getElementById('avatar-preview-img');
            const initial = document.getElementById('avatar-preview-initial');
            if(img){
                img.src = src;
            } else {
                if(initial) initial.remove();
                img = document.createElement('img');
                img.id = 'avatar-preview-img';
                img.className = 'h-full w-full object-cover';
                img.src = src;
                document.getElementById('avatar-preview').appendChild(img);
            }
        };
        reader.readAsDataURL(f);
    });
    </script>

        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
        </div>

        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                <div>
                    <p class="text-sm mt-2 text-gray-800">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-green-600">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('Save') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600"
                >{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
