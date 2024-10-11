import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProductsView from '@/views/ProductsView.vue';

import SearchProductView from '@/views/SearchProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProductView from '@/views/ProductView.vue';
import ProductPrice from '@/views/ProductPrice.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/products',
    name: 'productList',
    component: ProductsView,
    meta: { title: 'Listado de Productos' },
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductView,
    meta: { title: 'Detalle del Producto' },
  },
  {
    path: '/product/:id/price',
    name: 'productPrice',
    component: ProductPrice,
    meta: { title: 'Detalle del Producto' },
  },
  {
    path: '/search',
    name: 'searchProduct',
    component: SearchProductView,
    meta: { title: 'Buscar Producto' },
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
router.beforeEach((to, from, next) => {
  let query = from.query;
  let fromName = from.name;

  // Si venimos de `productDetail` y vamos a `productList`, guardamos `searchProduct` como la ruta anterior.
  if (from.name === 'productDetail' && to.name === 'productList') {
    fromName = 'searchProduct';
  }

  // Guardar la ruta anterior solo si estamos en `productDetail` o `productList`.
  if (
    from.name === 'productList' ||
    from.name === 'searchProduct' ||
    (from.name === 'productDetail' && to.name === 'productList')
  ) {
    localStorage.setItem(
      'previousRoute',
      JSON.stringify({
        name: fromName,
        query: query,
      }),
    );
  }
  next();
});

export default router;
