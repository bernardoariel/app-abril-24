import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProductListView from '@/views/ProductListView.vue';

import SearchProductView from '@/views/SearchProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProductView from '@/views/ProductView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'productList',
    component: ProductListView,
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductView,
  },
  {
    path: '/search',
    name: 'searchProduct',
    component: SearchProductView,
  },
  {
    path: '/',
    redirect: '/search',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
