<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full justify-start items-center pt-10">
      <div class="relative w-full max-w-lg px-4">
        <!-- Ajusté los márgenes y los anchos -->
        <div class="flex items-center w-full">
          <!-- Contenedor del input y loader -->
          <label class="input input-bordered flex items-center gap-2 grow h-12 relative w-full">
            <input
              ref="searchInput"
              v-model="searchTerm"
              type="text"
              placeholder="Buscar"
              class="grow outline-none h-full pr-10 w-full"
              @input="debouncedFilterOptions"
              @keydown.down.prevent="navigateOptions('down')"
              @keydown.up.prevent="navigateOptions('up')"
              @keydown.enter.prevent="selectActiveOption"
              style="min-width: 0"
            />
            <div
              v-if="isLoading"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-full w-full opacity-70 animate-spin"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                ></circle>
                <path d="M8 2a6 6 0 0 1 6 6H8V2z" fill="currentColor"></path>
              </svg>
            </div>
          </label>
          <button @click="handleSearch" class="btn btn-primary ml-2 h-12">Buscar</button>
        </div>

        <!-- Lista de sugerencias -->
        <ul
          v-if="searchTerm.length >= 3 && !isLoading"
          class="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto z-20"
          style="top: 100%"
        >
          <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500">
            Producto o marca no encontrado
          </li>
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.CodProducto"
            @click="selectOption(option, option.CodProducto === 'Marca' ? 'marca' : null)"
            :class="{ 'bg-gray-200': index === activeIndex }"
            class="px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <span>
              <!-- Mostrar nombre del producto o marca -->
              <span>
                {{ option.Producto }}
              </span>
              - ({{ option.CodProducto }}) -
              <span class="font-semibold"
                >{{ option.Precio! > 0 ? formatPrice(option.Precio!) : '' }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProducts } from '@/modules/sqlserver/products/services/actions';
import { formatPrice } from '../common/helpers/formatPrice';
import { useMarcas } from '../modules/sqlserver/marcas/composable/useMarcas';
import { useSucursales } from '../modules/sqlserver/sucursales/composable/useSucursales';
import { useFormaPago } from '../modules/sqlserver/forma-pago/composable/useFormaPago';
import { parseJwt } from '../router/index';
import { abrilApiData } from '@/api/abrilApiData';
const { sucursales } = useSucursales();
const { tarjetas } = useFormaPago();
const { findMarcasById, marcas } = useMarcas();
const router = useRouter();
const searchTerm = ref('');
interface FilteredOption {
  Producto: string;
  CodProducto: string;
  Precio?: number; // El precio puede ser opcional o undefined en caso de marcas
}
const filteredOptions = ref<FilteredOption[]>([]); // Aquí se guardarán las opciones filtradas
const activeIndex = ref(-1); // Índice para la navegación
const isLoading = ref(false); // Indicador de carga
let debounceTimeout: ReturnType<typeof setTimeout> | undefined;
const searchInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  searchInput.value?.focus();
});

const fetchProducts = async (term: string) => {
  const token = localStorage.getItem('authToken');

  // Verificar si el token ha expirado
  if (token) {
    const decodedToken: any = parseJwt(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp <= currentTime) {
      try {
        // Intentar renovar el token con el refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          alert('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
          router.replace({ name: 'login' });
          return;
        }

        // Realiza una llamada a la API para obtener un nuevo access token
        const refreshResponse = await abrilApiData.post('/auth/refresh', { refreshToken });

        // Guardar el nuevo token
        const { accessToken } = refreshResponse.data;
        localStorage.setItem('authToken', accessToken);
      } catch (error) {
        console.error('Error al renovar el token:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        alert('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
        router.replace({ name: 'login' });
        return;
      }
    }
  } else {
    router.replace({ name: 'login' });
    return;
  }

  // Si llegamos aquí, el token es válido o fue renovado correctamente
  try {
    isLoading.value = true;
    filteredOptions.value = []; // Reiniciamos las opciones filtradas
    const encodedTerm = encodeURIComponent(term); // Codifica el término de búsqueda

    // Hacer la petición con el token renovado o válido
    const response = await abrilApiData.get(`/products?search=${encodedTerm}`);
    filteredOptions.value = response.data.slice(0, 5);
    activeIndex.value = -1;
  } catch (error) {
    console.error('Error fetching products:', error);
    filteredOptions.value = [];
  } finally {
    isLoading.value = false;
  }
};

const splitText = (text: string) => {
  const searchTermValue = searchTerm.value.trim();
  if (!searchTermValue) return [text];

  const regex = new RegExp(`(${searchTermValue})`, 'gi');
  return text.split(regex);
};

const isHighlighted = (part: string) => {
  return part.toLowerCase() === searchTerm.value.trim().toLowerCase();
};

const debouncedFilterOptions = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    if (searchTerm.value.length >= 3) {
      fetchProducts(searchTerm.value);
    } else {
      filteredOptions.value = [];
    }
  }, 500); // Espera de 500ms después de que el usuario deja de escribir
};

const navigateOptions = (direction: 'up' | 'down') => {
  if (direction === 'down') {
    if (activeIndex.value < filteredOptions.value.length - 1) {
      activeIndex.value++;
    }
  } else if (direction === 'up') {
    if (activeIndex.value > 0) {
      activeIndex.value--;
    }
  }
};

const selectActiveOption = () => {
  if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
    selectOption(filteredOptions.value[activeIndex.value]);
  }
};

const selectOption = (option: any, tipo?: string | null) => {
  console.log('seleccionado');
  searchTerm.value = option.Producto;
  filteredOptions.value = [];
  activeIndex.value = -1;

  // Si es un producto específico, redirigimos a la página del producto
  if (!tipo) {
    console.log('!tipo');
    router.replace(`/product/${option.CodProducto}`);
    return;
  }

  // Si es una marca, redirigimos a la lista de productos filtrados por la marca
  if (tipo === 'marca') {
    console.log('marca');
    router.replace({
      name: 'productList',
      query: { search: option.Producto, searchByMarcas: 'true' }, // Usamos el nombre del query y el valor de la marca
    });
  }
};

const handleSearch = async () => {
  const term = searchTerm.value.trim();
  if (!term) return;
  const isNumber = !isNaN(Number(term));

  if (isNumber) {
    router.replace(`/product/${term}`);
  } else {
    router.replace({ name: 'productList', query: { search: term } });
  }
};
</script>

<style scoped>
.highlight {
  background-color: #ffff00; /* Un amarillo claro para resaltar */
  color: #000; /* Cambia el color del texto a negro */
  font-weight: bold; /* Mantén el texto en negrita */
  padding: 0 2px; /* Un pequeño relleno alrededor del texto resaltado */
  border-radius: 3px; /* Bordes ligeramente redondeados */
}
</style>
