<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-specimen-details
        :font="font"
        @weight-hover="onWeightHover"
      />
    </template>
    <template #main>
      <div
        class="specimen"
        :style="{ fontFamily: font.family }"
      >
        <div class="headline-samples">
          <headline-sample />
        </div>
        <component :is="componentName" />
        <alphabet-sample />
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import { defineAsyncComponent, onMounted, shallowRef } from 'vue'

  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import AlphabetSample from '@/components/samples/AlphabetSample.vue'
  import HeadlineSample from '@/components/samples/HeadlineSample.vue'
  import { useWebFont } from '@/composables/useWebFont'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const SpecimenSansSerif = defineAsyncComponent(() => import('@/components/specimens/SpecimenSansSerif.vue'))
  const SpecimenDisplay = defineAsyncComponent(() => import('@/components/specimens/SpecimenDisplay.vue'))
  const SpecimenSerif = defineAsyncComponent(() => import('@/components/specimens/SpecimenSerif.vue'))
  const SpecimenHandwriting = defineAsyncComponent(() => import('@/components/specimens/SpecimenHandwriting.vue'))
  const SpecimenMonospace = defineAsyncComponent(() => import('@/components/specimens/SpecimenMonospace.vue'))

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const componentName = shallowRef(null)

  switch (props.font.category) {
    case 'sans-serif':
      componentName.value = SpecimenSansSerif
      break
    case 'display':
      componentName.value = SpecimenDisplay
      break
    case 'serif':
      componentName.value = SpecimenSerif
      break
    case 'handwriting':
      componentName.value = SpecimenHandwriting
      break
    case 'monospace':
      componentName.value = SpecimenMonospace
      break
    default:
      componentName.value = SpecimenSansSerif
  }

  const onWeightHover = () => {
    console.log('weight hovered')
  }

  const { loadGoogleFonts, loading, error } = useWebFont()

  onMounted(() => {
    const variants = props.font.variants.join(',')
    const fontString = `${props.font.family}:${variants}`
    console.log('fontString', fontString)
    loadGoogleFonts([fontString])
  })

</script>

<style lang="scss" scoped>
  .grid {
    overflow: hidden;
  }

  .specimen {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    padding: 6rem;
    overflow: auto;
  }
</style>