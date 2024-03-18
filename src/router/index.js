import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import UserInfo from '@/components/UserInfo.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    component: Home,
                },
                {
                    path: '/Login',
                    component: Login,
                },
                {
                    path: '/UserInfo',
                    component: UserInfo,
                }
            ]
        }
    ]
});

export default router;
