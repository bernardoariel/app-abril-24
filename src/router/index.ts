import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProductListView from '@/views/ProductListView.vue';
import ProductDetailView from '@/views/ProductDetailView.vue';
import SearchProductView from '@/views/SearchProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/products',
    name: 'productList',
    component: ProductListView,
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: ProductDetailView,
  },
  {
    path: '/search',
    name: 'searchProduct',
    component: SearchProductView,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
