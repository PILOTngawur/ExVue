<script setup>
import SidebarMenu from '../../../components/SidebarMenu.vue';

//import ref and onMounted
import { ref, onMounted } from 'vue';

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../../services/api';

//get token from cookies
const token = Cookies.get('token');

//define state
const users = ref([]);

//method fetchDataPosts
const fetchDataUsers = async () => {

    //fetch data 
    api.defaults.headers.common['Authorization'] = token;
    await api.get('/api/admin/users')

        .then(response => {

            //set response data to state "users"
            users.value = response.data.data

        });
}

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataUsers"
    fetchDataUsers();
});

const deleteUser = async (id) => {
    api.defaults.headers.common['Authorization'] = token;
    await api.delete(`/api/admin/users/${id}`)
        .then(() => {
            fetchDataUsers();
        });
}

</script>

<template>
    <div class="flex min-h-screen">
        <SidebarMenu />

        <div class="flex-1 sm:ml-64 p-6 bg-gray-50">

            <!-- Dashboard Cards -->
            <div class="">
                <div class="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
                    <h1 class="text-3xl font-bold">
                        USERS
                    </h1>

                    <router-link :to="{ name: 'admin.users.create' }">
                    <button class="bg-blue-600 text-white text-sm p-2 rounded hover:bg-blue-700 cursor-pointer">
                        ADD USER
                    </button>
                    </router-link>
                </div>

                <div class="mt-6 bg-white p-6 rounded-xl shadow-sm border">
                    <table class="w-full table-auto">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="px-4 py-2 text-left">ID</th>
                                <th class="px-4 py-2 text-left">Name</th>
                                <th class="px-4 py-2 text-left">Email</th>
                                <th class="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
                                <td class="px-4 py-2">{{ user.id }}</td>
                                <td class="px-4 py-2">{{ user.name }}</td>
                                <td class="px-4 py-2">{{ user.email }}</td>
                                <td class="text-center space-x-2">
                                    <router-link :to="{ name: 'admin.users.edit', params: { id: user.id } }"
                                        class="inline-block rounded-sm bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow hover:bg-blue-700">
                                        EDIT
                                    </router-link>

                                    <button
                                        @click="deleteUser(user.id)"
                                        class="rounded-sm bg-red-600 px-3 py-1 text-xs font-medium text-white shadow hover:bg-red-700">
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>