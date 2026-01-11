<script setup>
    import SidebarMenu from '../../../components/SidebarMenu.vue';

    import {ref, onMounted} from 'vue';

    import Cookies from 'js-cookie';

    const user = ref(null);

    onMounted(() => {
        const userData = Cookies.get('user');
        if (userData) {
            user.value = JSON.parse(userData);
        }
    });

</script>

<template>
    <div class="flex min-h-screen">
        <SidebarMenu />

        <!-- Main content - tambah margin left untuk kompensasi sidebar fixed -->
        <div class="flex-1 sm:ml-64 p-6 bg-gray-50">
            <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p class="text-gray-600">Selamat Datang <span class="font-bold">{{ user?.name }}</span></p>
            
            <!-- Dashboard Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-gray-500 text-sm">Total Users</h3>
                    <p class="text-3xl font-bold mt-2">1,234</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-gray-500 text-sm">Total Products</h3>
                    <p class="text-3xl font-bold mt-2">567</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-gray-500 text-sm">Total Orders</h3>
                    <p class="text-3xl font-bold mt-2">89</p>
                </div>
            </div>
        </div>
    </div>
</template>