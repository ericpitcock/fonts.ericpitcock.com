<template>
  <ep-loading-state v-if="loading && !font" />
  <fonts-layout
    v-else
    class="specimen-modal fonts-grid--no-sidebar fonts-grid--no-footer"
  >
    <template #header>
      <fonts-specimen-details
        :font="font"
        :initial-tab="initialTab"
      />
    </template>
    <template #main>
      <div
        v-show="!loading"
        class="specimen"
        :style="{ fontFamily: `'${font.family}'` }"
      >
        <component
          :is="componentName"
          :font="font"
        />
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import {
    computed,
    defineAsyncComponent,
    onMounted,
    ref,
    shallowRef,
    watch,
  } from 'vue'
  import { useRoute } from 'vue-router'

  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import { useWebFont } from '@/composables/useWebFont'
  import FontsLayout from '@/layouts/FontsLayout.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const FontsSpecimenOverview = defineAsyncComponent(() => import('@/views/FontsSpecimenOverview.vue'))
  const FontsSpecimenPlayground = defineAsyncComponent(() => import('@/views/FontsSpecimenPlayground.vue'))
  const FontsSpecimenUi = defineAsyncComponent(() => import('@/views/FontsSpecimenUi.vue'))

  const route = useRoute()
  const fontsStore = useFontsStore()

  const componentName = shallowRef(null)
  const initialTab = ref(0)

  const font = computed(() => {
    return fontsStore.getCurrentFont(route.query.font)
  })

  const { loadGoogleFonts, loading } = useWebFont()

  onMounted(() => {
    if (!route.query.tab) {
      route.query.tab = 'overview'
    }

    const variants = font.value.variants.join(',')
    const fontString = `${font.value.family}:${variants}`

    loadGoogleFonts([fontString])
  })

  watch(() => route.query.tab, (tab) => {
    switch (tab) {
      case 'overview': {
        componentName.value = FontsSpecimenOverview
        initialTab.value = 0
        break
      }
      case 'ui': {
        componentName.value = FontsSpecimenUi
        initialTab.value = 1
        break
      }
      case 'playground': {
        componentName.value = FontsSpecimenPlayground
        initialTab.value = 2
        break
      }
      default: {
        componentName.value = FontsSpecimenOverview
      }
    }
  }, { immediate: true })
</script>

<style lang="scss" scoped>
  .specimen-modal {
    z-index: var(--z-index--modal);
  }

  .specimen {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }
</style>