<script setup lang="ts">
import HomeIcon from './icons/HomeIcon.vue';
import ProductsIcon from './icons/ProductsIcon.vue';
import SearchIcon from './icons/SearchIcon.vue';
</script>

<template>
  <footer class="btm-nav">
    <router-link to="/home">
      <button>
        <HomeIcon />
      </button>
    </router-link>
    <router-link to="/search">
      <button class="disabled" tabindex="-1" aria-disabled="true">
        <SearchIcon />
      </button>
    </router-link>
    <router-link to="/home">
      <button>
        <ProductsIcon />
      </button>
    </router-link>
  </footer>
</template>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
