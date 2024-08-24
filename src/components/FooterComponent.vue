<script setup lang="ts">
import HomeIcon from './icons/HomeIcon.vue';
import InfoIcon from './icons/InfoIcon.vue';
import StaticIcon from './icons/StaticIcon.vue';
</script>

<template>
  <footer class="btm-nav h-16">
      <router-link to="/home">
        <button>
          <HomeIcon />
        </button>
      </router-link>
      <router-link to="/search">
        <button class="disabled" tabindex="-1" aria-disabled="true">
          <InfoIcon />
        </button>
      </router-link>
      <router-link to="/home">
        <button>
          <StaticIcon />
        </button>
      </router-link>
  </footer>
</template>

