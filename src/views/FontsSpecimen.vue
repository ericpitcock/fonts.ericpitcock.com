<template>
  <fonts-layout>
    <template #sidebar>
      <!-- nav is in this component -->
      <fonts-specimen-details
        :font="font"
        @weight-hover="onWeightHover"
      />
    </template>
    <template #main>
      <div class="specimen">
        <!-- main content/router view -->
        <ep-flex class="type-block gap-60">
          <headline-sample :style="specimenStyle" />
          <ep-dropdown v-bind="dropdownProps">
            <template #content>
              <div class="sample-controls-container">
                <sample-controls
                  :initial-size="fontSize"
                  :initial-weight="fontWeight"
                  :available-weights="availableWeights"
                  @update="updateFontControls"
                />
              </div>
            </template>
          </ep-dropdown>
        </ep-flex>
        <component :is="componentName" />
        <alphabet-sample />
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
  } from 'vue'

  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import AlphabetSample from '@/components/samples/AlphabetSample.vue'
  import HeadlineSample from '@/components/samples/HeadlineSample.vue'
  import SampleControls from '@/components/samples/SampleControls.vue'
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

  const onWeightHover = (payload) => {
    console.log('payload', payload)
  }

  const { loadGoogleFonts } = useWebFont()

  onMounted(() => {
    const variants = props.font.variants.join(',')
    const fontString = `${props.font.family}:${variants}`
    console.log('fontString', fontString)
    loadGoogleFonts([fontString])
  })

  // reactive controls for font size and weight
  const fontSize = ref(48) // default value in px
  const fontWeight = ref('400') // default weight

  // available weights for should be font.variants with "regular" changed to 400
  const availableWeights = computed(() => {
    return props.font.variants.map(weight => weight === 'regular' ? '400' : weight)
  })

  const dropdownProps = {
    buttonProps: {
      label: 'h1',
      ariaLabel: 'Actions',
      // iconLeft: {
      //   name: 'dots-vertical',
      //   styles: { '--ep-icon-stroke-width': 3 },
      // },
      // iconRight: null,
      class: ['ep-button-var--ghost'],
      size: 'small',
    },
  }

  const updateFontControls = ({ size, weight }) => {
    fontSize.value = Number(size)
    fontWeight.value = weight
  }

  // computed style applied to the specimen container
  const specimenStyle = computed(() => ({
    fontFamily: props.font.family,
    fontSize: `${fontSize.value}px`,
    fontWeight: fontWeight.value,
    fontVariationSettings: `'wght' ${fontWeight.value}`,
  }))
</script>

<style lang="scss" scoped>
  .specimen {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    padding: 10rem;
    overflow: auto;
  }

  .type-block {
    h1 {
      flex: 0 0 75%;
      max-width: 60rem;
    }

    .ep-dropdown {
      height: fit-content;
    }
  }

  .sample-controls-container {
    background: var(--interface-surface--accent);
    padding: 3rem;
    border-radius: var(--border-radius--large);
  }
</style>