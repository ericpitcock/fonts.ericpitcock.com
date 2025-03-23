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
    <div
      v-if="availableWeights.length > 1"
      class="font-controls__font-weight"
    >
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
        :min="-1"
        :max="10"
        :step="0.1"
      />
    </div>
    <ep-divider direction="horizontal" />
    <ep-flex class="flex-col gap-10">
      <h3>Options</h3>
      <ep-checkbox
        id="TextTransform"
        v-model="localTextTransform"
        label="Uppercase"
        name="checkboxes"
        value="uppercase"
        @update:model-value="updateChecked($event, 'Uppercase', 'TextTransform')"
      />
      <ep-checkbox
        id="TextWrap"
        v-model="localTextWrap"
        label="Text Wrap Balance"
        name="checkboxes"
        value="text-wrap-balance"
        @update:model-value="updateChecked($event, 'Text Wrap Balance', 'TextWrap')"
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
      default: () => []
    },
    minSize: { type: Number, default: 12 },
    maxSize: { type: Number, default: 64 },
    stepSize: { type: Number, default: 1 }
  })

  const emit = defineEmits(['update'])

  const localSize = ref(props.initialSize)
  const localWeight = ref(props.initialWeight)
  const localLetterSpacing = ref(0)
  const localLineHeight = ref(1.2)
  const localTextTransform = ref(false)
  const localTextWrap = ref(false)

  const weightOptions = computed(() =>
    props.availableWeights.map(weight => ({
      label: weight,
      value: weight
    }))
  )

  // const updateControl = () => {
  //   emit('update', { size: localSize.value, weight: localWeight.value })
  // }

  // const options = ref([
  //   {
  //     id: 'TextTransform',
  //     label: 'Uppercase',
  //     name: 'checkboxes',
  //     value: 'uppercase',
  //     checked: false,
  //   },
  //   {
  //     id: 'TextWrap',
  //     label: 'Text Wrap Balance',
  //     name: 'checkboxes',
  //     value: 'text-wrap-balance',
  //     checked: false,
  //   }
  // ])

  const emitStyles = () => {
    emit('update', {
      fontSize: `${localSize.value}px`,
      fontWeight: localWeight.value,
      fontVariationSettings: `'wght' ${localWeight.value}`,
      letterSpacing: `${localLetterSpacing.value}px`,
      lineHeight: localLineHeight.value,
      textTransform: localTextTransform.value ? 'uppercase' : 'none',
      textWrap: localTextWrap.value ? 'balance' : 'auto',
    })
  }

  const updateChecked = (event, label, id) => {
    // console.log(`${label}:`, event, id)
    // // find the checkbox by id and update its checked property
    // const checkbox = options.value.find(checkbox => checkbox.id === id)
    // checkbox.checked = event
    // checkbox.indeterminate = false
    emitStyles()
  }

  watch([
    localSize,
    localWeight,
    localLetterSpacing,
    localLineHeight,
    // localUppercase,
    // localTextWrapBalance
  ], () => {
    emitStyles()
    // emit('update', {
    //   fontSize: localSize.value,
    //   fontWeight: localWeight.value,
    //   fontVariationSettings: `'wght' ${localWeight.value}`,
    //   letterSpacing: localLetterSpacing.value,
    //   lineHeight: localLineHeight.value,
    //   textTransform: localUppercase.value ? 'uppercase' : 'none',
    //   textWrap: localTextWrapBalance.value ? 'balance' : 'normal',
    //   // textTransform: options.value.find(option => option.value === 'uppercase').checked ? 'uppercase' : 'none',
    //   // textWrap: options.value.find(option => option.value === 'text-wrap-balance').checked ? 'balance' : 'normal',
    // })
  })
</script>

<style scoped>
  .font-controls {
    h3 {
      margin-bottom: 1rem;
    }
  }
</style>