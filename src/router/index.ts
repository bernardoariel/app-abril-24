import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProductsView from '@/views/ProductsView.vue';

import SearchProductView from '@/views/SearchProductView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProductView from '@/views/ProductView.vue';
import ProductPrice from '@/views/ProductPrice.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

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
    path: '/dashboard',
    component: DefaultLayout,
    children: [
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
    ],
  },
  {
    path: '/',
    redirect: '/login',
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requiresAuth && !isAuthenticated()) {
    console.log('No autenticado: redirigiendo al login');
    return next({ name: 'login' });
  }
  let queryList = from.query || {};

  // Guardar la ruta anterior con su query
  const savePreviousRoute = (name: string) => {
    localStorage.setItem(
      'previousRoute',
      JSON.stringify({
        name, // Verificar que la query no esté vacía
      }),
    );
    // console.log('Guardando previousRoute:', name);
  };
  if (from.name === 'searchProduct' && to.name === 'productList') {
    savePreviousRoute('searchProduct');
  }
  if (from.name === 'searchProduct' && to.name === 'productDetail') {
    savePreviousRoute('searchProduct');
  }
  if (from.name === 'productList' && to.name === 'productDetail') {
    savePreviousRoute('productList');
  }

  // Cuando vienes de `productDetail` a `productPrice`
  if (from.name === 'productDetail' && to.name === 'productPrice') {
    savePreviousRoute('productDetail');
  }

  // Cuando vuelves de `productPrice` a `productDetail`
  if (from.name === 'productPrice' && to.name === 'productDetail') {
    const productListQuery = localStorage.getItem('productListQuery');

    if (productListQuery && Object.keys(JSON.parse(productListQuery)).length > 0) {
      // Si `productListQuery` tiene datos, guardamos la ruta anterior como `productList`
      savePreviousRoute('productList');
    } else {
      // Si `productListQuery` está vacío o es null, volvemos a `searchProduct`
      savePreviousRoute('searchProduct');
    }
  }
  if (from.name === 'productDetail' && to.name === 'productList') {
    savePreviousRoute('searchProduct');
  }

  if (to.name === 'productList' && Object.keys(to.query).length > 0) {
    localStorage.setItem('productListQuery', JSON.stringify(to.query));
    // console.log('productListQuery guardado:', to.query);
  }
  if (to.name === 'searchProduct') {
    const productListQuery = localStorage.getItem('productListQuery');
    // if (!productListQuery) return;
    localStorage.setItem('productListQuery', JSON.stringify({}));
    // console.log('productListQuery ha sido limpiado');
  }
  next();
});
export default router;
