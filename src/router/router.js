import { createRouter, createWebHistory } from 'vue-router';
import GuestLayout from '@/components/GuestLayout.vue';
import MainBoard from '@/components/MainBoard.vue';

const isAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.authenticated;
}

const routes = [
    {
        path: '/',
        component: GuestLayout,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next('/test');
            } else {
                next();
            }
        }
    },
    {
        path: '/test',
        component: MainBoard,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            } else {
                next('/');
            }
        }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;