import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './app.vue';
import router from './router';

import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount('#app');
