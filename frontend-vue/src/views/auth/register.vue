<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../../services/api.js';

    const router = useRouter();
    
    const user = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const validation = ref([]);
    const showPassword = ref(false);
    const showPasswordConfirm = ref(false);

    const register = async () => {
        await api.post('/api/register', {
            name: user.name,
            email: user.email,
            password: user.password,
        })
        .then(() => {
            router.push({name: 'login'})
        })
        .catch(error => {
            validation.value = error.response.data;
        })
    }
</script>

<template>
    <div class="flex items-center justify-center">

        <div class="p-10 text-center bg-blue-200 h-auto w-100 rounded-3xl shadow-sm">
            <p class="font-bold">Mo register?, isi nih 👇🏼</p>

            <div v-if="validation.errors" class="mt-5 text-left bg-red-100 p-3 rounded-lg">
                <div v-for="(error, index) in validation.errors" :key="index">
                    {{ `${error.path} : ${error.msg}`  }}

                </div>
            </div>

            <form @submit.prevent="register" autocomplete="on">
            <div class="mt-10">
                <input class="p-3 w-full bg-white rounded-3xl shadow-sm" type="text" placeholder="Nama" v-model="user.name" name="name" autocomplete="name">
            </div>
            <div class="mt-5">
                <input class="p-3 w-full bg-white rounded-3xl shadow-sm" type="email" placeholder="Email" v-model="user.email" name="email" autocomplete="email">
            </div>
            <div class="mt-5 relative">
                <input class="p-3 w-full bg-white rounded-3xl shadow-sm pr-12" :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="user.password" name="password" autocomplete="new-password">
                <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <!-- Eye icon (show) -->
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <!-- Eye-off icon (hide) -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </button>
            </div>
            <div class="mt-5 relative">
                <input class="p-3 w-full bg-white rounded-3xl shadow-sm pr-12" :type="showPasswordConfirm ? 'text' : 'password'" placeholder="Konfirmasi Password" v-model="user.password_confirmation" name="password_confirmation" autocomplete="new-password">
                <button type="button" @click="showPasswordConfirm = !showPasswordConfirm" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <!-- Eye icon (show) -->
                    <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <!-- Eye-off icon (hide) -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </button>
            </div>
            <div class="mt-5">
                <button class="bg-blue-500 rounded-3xl p-3 font-bold text-white w-full" type="submit">Register</button>
            </div>
            </form>

            <div class="mt-7">
                <p>Dah punya akun? <router-link to="/login" class="font-bold">Login</router-link> gih.</p>
            </div>
        </div>
    </div>
</template>