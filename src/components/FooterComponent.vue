<script setup lang="ts">
import HomeIcon from './icons/HomeIcon.vue';
import InfoIcon from './icons/InfoIcon.vue';
import StaticIcon from './icons/StaticIcon.vue';
</script>

<template>
  <footer>
    <div class="btm-nav">
      <router-link to="/search">
        <button>
          <HomeIcon />
        </button>
      </router-link>
      <router-link to="/info">
        <button class="disabled" tabindex="-1" aria-disabled="true">
          <InfoIcon />
        </button>
      </router-link>
      <router-link to="/static">
        <button>
          <StaticIcon />
        </button>
      </router-link>
    </div>
  </footer>
</template>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
