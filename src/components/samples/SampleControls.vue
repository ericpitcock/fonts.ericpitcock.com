<template>
  <ep-flex class="font-controls flex-col gap-20">
    <div class="font-controls__font-size">
      <h3>Font Size</h3>
      <ep-range-input
        v-model="localSize"
        :min="minSize"
        :max="maxSize"
        :step="stepSize"
      />
    </div>
    <div class="font-controls__font-weight">
      <h3>Font Weight</h3>
      <ep-select
        v-model="localWeight"
        select-id="font-weight"
        :options="weightOptions"
        size="default"
      />
    </div>
    <div class="font-controls__line-height">
      <h3>Line Height</h3>
      <ep-range-input
        v-model="localLineHeight"
        :min="1"
        :max="2"
        :step="0.1"
        unit=""
      />
    </div>
    <div class="font-controls__letter-spacing">
      <h3>Letter Spacing</h3>
      <ep-range-input
        v-model="localLetterSpacing"
        :min="-0.5"
        :max="2"
        :step="0.1"
      />
    </div>
    <ep-divider direction="horizontal" />
    <ep-flex class="flex-col gap-10">
      <h3>Options</h3>
      <ep-checkbox
        v-for="option in options"
        :key="option.id"
        v-bind="option"
        v-model="option.checked"
      />
    </ep-flex>
  </ep-flex>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  import EpRangeInput from '@/components/EpRangeInput.vue'

  const props = defineProps({
    initialSize: { type: Number, default: 5 },
    initialWeight: { type: String, default: '400' },
    availableWeights: {
      type: Array,
      default: () => ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    },
    minSize: { type: Number, default: 12 },
    maxSize: { type: Number, default: 64 },
    stepSize: { type: Number, default: 1 }
  })

  const emit = defineEmits(['update'])

  const localSize = ref(props.initialSize)
  const localWeight = ref(props.initialWeight)

  const weightOptions = computed(() =>
    props.availableWeights.map(weight => ({
      label: weight,
      value: weight
    }))
  )

  watch([localWeight, localSize], () => {
    emit('update', { size: localSize.value, weight: localWeight.value })
  })

  // const updateControl = () => {
  //   emit('update', { size: localSize.value, weight: localWeight.value })
  // }

  const localLetterSpacing = ref(0)
  const localLineHeight = ref(1.2)

  const options = ref([
    {
      id: 'checkbox1',
      label: 'Uppercase',
      name: 'checkboxes',
      value: 'uppercase',
      checked: false,
    },
    {
      id: 'checkbox2',
      label: 'Text Wrap Balance',
      name: 'checkboxes',
      value: 'text-wrap-balance',
      checked: false,
    }
  ])
</script>

<style scoped>
  .font-controls {
    h3 {
      margin-bottom: 1rem;
    }
  }
</style>