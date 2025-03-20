<template>
  <ep-button
    v-if="isDev"
    class="json-button"
    label="Toggle JSON"
    @click="$store.commit('toggleJSON')"
  />
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation v-if="$route.name == 'index'" />
      <fonts-specimen-details v-if="$route.name == 'font'" />
    </template>
    <template #main>
      <router-view />
    </template>
  </fonts-layout>
</template>

<script setup>
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const isDev = import.meta.env.DEV
</script>

<style lang="scss">
  @font-face {
    font-family: 'CallingCode-Regular';
    src: url('./assets/fonts/390A5D_0_0.woff2') format('woff2');
  }

  body {
    display: flex;
    justify-content: center;
    background: var(--interface-bg);
  }

  body,
  input,
  select,
  textarea {
    font-family: 'CallingCode-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  #app {
    width: 100vw;
    height: 100vh;
    background: var(--interface-foreground);
  }

  .json-button {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 2;
  }
</style>
