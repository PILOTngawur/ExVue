import {createRouter, createWebHistory} from 'vue-router';

import Cookies from 'js-cookie';

const getToken = () => Cookies.get('token');

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue'),
    },
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('../views/admin/dashboard/index.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/users',
        name: 'admin.users.index',
        component: () => import('../views/admin/users/index.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/users/create',
        name: 'admin.users.create',
        component: () => import('../views/admin/users/create.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/users/edit/:id',
        name: 'admin.users.edit',
        component: () => import('../views/admin/users/edit.vue'),
        meta: { requiresAuth: true },
    }

    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        // Alihkan pengguna ke halaman login
        next({ name: 'login' });
    } 
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'login' || to.name === 'register') && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: 'dashboard' });
    } 
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});

export default router;