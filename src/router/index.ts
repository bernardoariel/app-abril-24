import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProductsView from '@/views/ProductsView.vue';

import SearchProductView from '@/views/SearchProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProductView from '@/views/ProductView.vue';
import ProductPrice from '@/views/ProductPrice.vue';
// Función para decodificar el token JWT manualmente
export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el JWT:', error);
    return null;
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false; // No hay token, por lo tanto no está autenticado
  }

  try {
    const decodedToken: any = parseJwt(token); // Usar la función manual para decodificar el token
    const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos
    return decodedToken && decodedToken.exp > currentTime; // Verificar que el token no haya expirado
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return false; // El token es inválido o está corrupto
  }
}
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/products',
    name: 'productList',
    component: ProductsView,
    meta: { title: 'Listado de Productos', requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductView,
    meta: { title: 'Detalle del Producto', requiresAuth: true },
  },
  {
    path: '/product/:id/price',
    name: 'productPrice',
    component: ProductPrice,
    meta: { title: 'Detalle del Producto', requiresAuth: true },
  },
  {
    path: '/search',
    name: 'searchProduct',
    component: SearchProductView,
    meta: { title: 'Buscar Producto', requiresAuth: true },
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      localStorage.removeItem('authToken'); // Eliminar el token si ha expirado
      return next({ name: 'login' }); // Redirigir al login si no está autenticado
    }
  }
  if (to.name === 'login' && isAuthenticated()) {
    return next({ name: 'searchProduct' }); // Si está autenticado, redirigir al home
  }

  next();
});
/* router.beforeEach((to, from, next) => {
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
}); */

export default router;
