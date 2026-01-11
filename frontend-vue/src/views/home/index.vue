<script setup>

</script>

<template>
    <div class="flex items-center justify-center">

        <div class="p-10 text-center bg-blue-200 h-auto w-100 rounded-3xl shadow-sm">
            <p class="font-bold">Selamat Datang!, mo ngapain?</p>

        <div class="mt-10 flex justify-center gap-4">

            <router-link :to="{ name: 'login' }">
            <p class="bg-blue-500 rounded-3xl p-3 font-bold text-white">Login</p>
            </router-link>

            <p class="font-bold">or</p>

            <router-link :to="{ name: 'register' }">
            <p class="bg-blue-500 rounded-3xl p-3 font-bold text-white">Register</p>
            </router-link>

        </div>
        </div>
    </div>
</template>
