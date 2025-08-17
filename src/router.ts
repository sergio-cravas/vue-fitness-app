import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/dashboard.vue';
import Welcome from './pages/welcome.vue';
import Workout from './pages/workout.vue';

const routes = [
    { path: '/', component: Welcome },
    { path: '/dashboard', component: Dashboard },
    { path: '/workout/:id?', component: Workout },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;