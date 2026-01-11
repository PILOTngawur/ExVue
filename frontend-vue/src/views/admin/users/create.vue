<script setup>
import SidebarMenu from '../../../components/SidebarMenu.vue';

//import reactive and ref from vue
import { reactive, ref } from 'vue';

//import useRouter from vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../../services/api';

//get token from cookies
const token = Cookies.get('token');

//state user
const user = reactive({
    name: '',
    email: '',
    password: '',
});

//state validation
const validation = ref([]);

//method storeUser
const addUser = async () => {

    //call api store user
    api.defaults.headers.common['Authorization'] = token;
    await api.post('/api/admin/users', {
        name: user.name,
        email: user.email,
        password: user.password,
    })
        .then(() => {
            //redirect ke halaman users index
            router.push({
                name: 'admin.users.index'
            })
        })
        .catch(error => {
            //assign validation value with error
            validation.value = error.response.data
        })

}

</script>

<template>
    <div class="flex min-h-screen">
        <SidebarMenu />

        <div class="flex-1 sm:ml-64 p-6 bg-gray-50">

            <div class="bg-white p-6 rounded-xl shadow-sm border">
                <h1 class="text-3xl font-bold">
                    ADD USER
                </h1>

                <div v-if="validation.errors" class="mt-5 text-left bg-red-100 p-3 rounded-lg">
                    <div v-for="(error, index) in validation.errors" :key="index">
                        {{ `${error.path} : ${error.msg}` }}
                    </div>
                </div>

                <form @submit.prevent="addUser" autocomplete="on" class="mt-6">
                    <div class="mt-5">
                        <input class="p-3 w-full bg-white rounded-3xl shadow-sm" type="text" placeholder="Name"
                            v-model="user.name" name="name" autocomplete="name">
                    </div>
                    <div class="mt-5">
                        <input class="p-3 w-full bg-white rounded-3xl shadow-sm" type="email" placeholder="Email"
                            v-model="user.email" name="email" autocomplete="email">
                    </div>
                    <div class="mt-5">
                        <input class="p-3 w-full bg-white rounded-3xl shadow-sm" type="password" placeholder="Password"
                            v-model="user.password" name="password" autocomplete="new-password">
                    </div>
                    
                    <div class="mt-10">
                        <button type="submit"
                            class="bg-blue-600 text-white text-sm p-2 rounded hover:bg-blue-700 cursor-pointer">
                            SAVE USER
                        </button>
                    </div>
                </form>
            </div>
        </div>



    </div>
</template>