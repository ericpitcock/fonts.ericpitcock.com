<template>
  <ep-flex class="type-block gap-60">
    <component
      :is="element"
      class="text-sample"
      :style="specimenStyle"
      contenteditable
    >
      {{ text }}
    </component>
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
</template>

<script setup>
  import { faker } from '@faker-js/faker'
  import { computed, ref } from 'vue'

  import SampleControls from '@/components/samples/SampleControls.vue'

  const props = defineProps({
    element: {
      type: String,
      default: 'p'
    },
    font: {
      type: Object,
      default: () => ({})
    },
    text: {
      type: String,
      default: faker.lorem.word()
    }
  })

  const dropdownProps = {
    buttonProps: {
      label: props.element,
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

  const availableWeights = computed(() => {
    return props.font.variants.map(weight => weight === 'regular' ? '400' : weight)
  })

  const fontSize = ref(48) // default value in px
  const fontWeight = ref('400') // default weight
  // const letterSpacing = ref(0)
  // const lineHeight = ref(1.2)
  // const uppercase = ref(false)
  // const textWrapBalance = ref(false)

  const specimenStyle = ref({ fontFamily: props.font.family })

  const updateFontControls = (styles) => {
    console.log('updateFontControls', styles)
    specimenStyle.value = {
      ...specimenStyle.value,
      ...styles
    }
    // fontSize.value = Number(size)
    // fontWeight.value = weight
    // letterSpacing.value = Number(letterSpacing)
    // lineHeight.value = Number(lineHeight)
    // uppercase.value = uppercase
    // textWrapBalance.value = textWrapBalance
  }

  // const specimenStyle = computed(() => ({
  //   fontFamily: props.font.family,
  //   fontSize: `${fontSize.value}px`,
  //   fontWeight: fontWeight.value,
  //   fontVariationSettings: `'wght' ${fontWeight.value}`,
  //   letterSpacing: `${letterSpacing.value}em`,
  //   lineHeight: lineHeight.value,
  //   textTransform: uppercase.value ? 'uppercase' : 'none',
  //   textWrap: textWrapBalance.value ? 'balance' : 'normal'
  // }))
</script>

<style lang="scss" scoped>

  /* h1.headline-sample {
    line-height: 1;
    color: var(--text-color--loud);
    text-wrap: balance;
  } */
  .type-block {
    .text-sample {
      flex: 0 0 75%;
      max-width: 60rem;
      color: var(--text-color--loud);
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
