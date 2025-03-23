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
            :font="font"
            :initial-size="fontSize"
            :initial-weight="fontWeight"
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
      ariaLabel: 'Sample controls',
      class: ['ep-button-var--ghost'],
      size: 'small',
    },
  }

  // const availableWeights = computed(() => {
  //   // return props.font.variants.map(weight => weight === 'regular' ? '400' : weight)

  //   // fitler out any variants with "italic" in the name
  //   return props.font.variants.filter(weight => !weight.includes('italic')).map(weight => weight === 'regular' ? '400' : weight)
  // })

  const fontSize = ref(48)
  const fontWeight = ref('400')

  const specimenStyle = ref({})

  const updateFontControls = (styles) => {
    // console.log('updateFontControls', styles)
    specimenStyle.value = { ...styles }
  }
</script>

<style lang="scss" scoped>
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
