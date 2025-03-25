<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-specimen-details :font="font" />
    </template>
    <template #main>
      <div class="specimen">
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
    // computed,
    defineAsyncComponent,
    onMounted,
    shallowRef,
    watch,
  } from 'vue'
  import { useRoute } from 'vue-router'

  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import { useWebFont } from '@/composables/useWebFont'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const FontsSpecimenLanding = defineAsyncComponent(() => import('@/views/FontsSpecimenLanding.vue'))
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

  watch(() => route.query.tab, (tab) => {
    switch (tab) {
      case 'specimen': {
        componentName.value = FontsSpecimenLanding
        break
      }
      case 'playground': {
        componentName.value = FontsSpecimenPlayground
        break
      }
      case 'ui': {
        componentName.value = FontsSpecimenUi
        break
      }
      default: {
        componentName.value = FontsSpecimenLanding
      }
    }
  }, { immediate: true })

  const { loadGoogleFonts } = useWebFont()

  onMounted(() => {
    // change route.query.tab to 'specimen'
    if (!route.query.tab) {
      route.query.tab = 'specimen'
    }

    const variants = props.font.variants.join(',')
    const fontString = `${props.font.family}:${variants}`
    // console.log('fontString', fontString)
    loadGoogleFonts([fontString])
  })
</script>

<style lang="scss" scoped>
  .specimen {
    display: flex;
    flex-direction: column;
    // gap: 10rem;
    // padding: 10rem;
    overflow: auto;
    font-family: v-bind('font.family');
  }
</style>