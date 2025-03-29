<template>
  <fonts-layout class="fonts-grid--no-sidebar fonts-grid--no-footer">
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

  const FontsSpecimenOverview = defineAsyncComponent(() => import('@/views/FontsSpecimenOverview.vue'))
  const FontsSpecimenPlayground = defineAsyncComponent(() => import('@/views/FontsSpecimenPlayground.vue'))
  const FontsSpecimenUi = defineAsyncComponent(() => import('@/views/FontsSpecimenUi.vue'))

  const props = defineProps({
    font: {
      type: Object,
      required: true
    },
  })

  const route = useRoute()
  const componentName = shallowRef(null)

  const initialTab = ref(0)

  watch(() => route.query.tab, (tab) => {
    // console.log('route.query.tab changed:', tab)
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

  const { loadGoogleFonts, loading } = useWebFont()

  onMounted(() => {
    if (!route.query.tab) {
      route.query.tab = 'overview'
    }

    const variants = props.font.variants.join(',')
    const fontString = `${props.font.family}:${variants}`

    loadGoogleFonts([fontString])
  })
</script>

<style lang="scss" scoped>

  // .fonts-grid {
  //   grid-template-rows: 6rem 1fr;
  //   grid-template-columns: 1fr;
  // }
  .specimen {
    display: flex;
    flex-direction: column;
    // overflow: auto;
    height: 100%;
  }
</style>