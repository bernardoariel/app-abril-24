import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(VueQueryPlugin);
VueQueryPlugin.install(app, {
  queryClientOptions: {
    queries: {
      cacheTime: 1000 * 120, // 2 minutos
      refetchOnReconnect: 'always',
    },
  },
});
app.mount('#app');
