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
            :initial-styles="initialStyles"
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
    },
    initialStyles: {
      type: Object,
      default: () => ({})
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
  const specimenStyle = ref(props.initialStyles)

  const updateFontControls = (styles) => {
    specimenStyle.value = { ...styles }
  }
</script>

<style lang="scss" scoped>
  .type-block {
    .text-sample {
      flex: 0 0 75%;
      max-width: 70rem;
      // color: var(--text-color--loud);
    }

    .ep-dropdown {
      height: fit-content;
    }

    h3 {
      padding-bottom: 2rem;
      border-bottom: 0.1rem dashed var(--border-color);
    }

    blockquote {
      position: relative;
      left: -6rem;
      margin: 3rem 0;
      padding: 4rem;
      border-top: 1px dashed var(--border-color--lighter);
      border-bottom: 1px dashed var(--border-color--lighter);
      border-left: 1px dashed var(--border-color--lighter);
      text-align: center;
      text-box-trim: trim-both;
      text-box-edge: cap alphabetic;
    }
  }

  .sample-controls-container {
    background: var(--interface-foreground);
    padding: 3rem;
    border-radius: var(--border-radius--large);
  }
</style>