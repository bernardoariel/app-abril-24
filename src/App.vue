<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavHeader from './components/NavHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <NavHeader />
    <div class="max-w-custom mx-auto px-4 bg-gray-100">
      <RouterView />
    </div>
    <FooterComponent />
  </div>
</template>
