<template>
  <div class="fonts-grid">
    <div
      v-if="$slots.corner"
      class="fonts-grid__corner"
    >
      <slot name="corner" />
    </div>
    <div
      v-if="$slots.sidebar"
      class="fonts-grid__sidebar"
    >
      <slot name="sidebar" />
    </div>
    <div
      v-if="$slots.header"
      class="fonts-grid__header"
    >
      <slot name="header" />
    </div>
    <div
      v-if="$slots.main"
      ref="main"
      class="fonts-grid__main"
    >
      <slot name="main" />
    </div>
    <div
      v-if="$slots.footer"
      class="fonts-grid__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
  import { computed, useTemplateRef, watch } from 'vue'

  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()

  const main = useTemplateRef('main')

  const categoryFilter = computed(() => fontsStore.categoryFilter)

  watch(
    () => categoryFilter.value,
    () => {
      if (main.value) {
        main.value.scrollTop = 0
      }
    }
  )

  watch(
    [() => fontsStore.filters],
    () => {
      if (main.value) {
        main.value.scrollTop = 0
      }
    },
    { deep: true }
  )
</script>

<style lang="scss">
  .fonts-grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: 6.1rem 1fr 4rem;
    grid-template-columns: 20rem 1fr;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: var(--interface-bg);
  }

  .fonts-grid__corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 7.8rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
  }

  .fonts-grid__sidebar {
    grid-row: 1/4;
    grid-column: 1/2;
    display: grid;
  }

  .fonts-grid__header {
    grid-row: 1/2;
    grid-column: 2/3;
  }

  .fonts-grid__main {
    grid-row: 2/3;
    grid-column: 2/3;
    overflow: auto;
    // overscroll-behavior: contain;
  }

  .fonts-grid__footer {
    grid-row: 3/4;
    grid-column: 2/3;
  }

  .fonts-grid--no-sidebar {
    grid-template-columns: 1fr;

    .fonts-grid__header {
      grid-column: 1/3;
    }

    .fonts-grid__main {
      grid-column: 1/3;
    }
  }

  .fonts-grid--no-footer {
    grid-template-rows: 6.1rem 1fr;

    .fonts-grid__header {
      grid-row: 1/2;
    }

    .fonts-grid__main {
      grid-row: 2/3;
    }
  }

  .fonts-grid--no-header-footer {
    grid-template-rows: 1fr;

    .fonts-grid__main {
      grid-row: 1/2;
    }
  }
</style>