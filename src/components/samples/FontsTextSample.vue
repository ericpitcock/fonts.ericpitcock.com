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
            :id="instanceId"
            :font="font"
            :initial-size="initialSize"
            :initial-weight="initialWeight"
            @update="updateFontControls"
          />
        </div>
      </template>
    </ep-dropdown>
  </ep-flex>
</template>

<script setup>
  import { faker } from '@faker-js/faker'
  import { computed, ref, onMounted } from 'vue'

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
    },
    initialSize: {
      type: Number,
      default: 48
    },
    initialWeight: {
      type: String,
      default: '400'
    }
  })

  const instanceId = `text-sample-${Math.random().toString(36).substring(2, 9)}`

  const dropdownProps = computed(() => ({
    buttonProps: {
      label: props.element,
      ariaLabel: 'Sample controls',
      class: ['ep-button-var--ghost font-family--inter'],
      size: 'small',
    }
  }))

  // Initialize with the default styles
  const specimenStyle = ref({
    fontSize: `${props.initialSize}px`,
    fontWeight: props.initialWeight,
    fontFamily: props.font.family
  })

  const updateFontControls = (styles) => {
    specimenStyle.value = { ...styles }
  }
</script>

<style lang="scss" scoped>
  .type-block {
    .text-sample {
      flex: 0 0 75%;
      max-width: 60rem;
      // color: var(--text-color--loud);
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