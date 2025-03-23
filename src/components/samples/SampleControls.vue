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
      <ep-checkbox
        v-if="hasItalics"
        id="FontStyle"
        v-model="localFontStyle"
        label="Italic"
        name="checkboxes"
        value="italic"
        @update:model-value="emitStyles"
      />
      <ep-checkbox
        id="TextTransform"
        v-model="localTextTransform"
        label="Uppercase"
        name="checkboxes"
        value="uppercase"
        @update:model-value="emitStyles"
      />
      <ep-checkbox
        id="TextWrap"
        v-model="localTextWrap"
        label="Text Wrap Balance"
        name="checkboxes"
        value="text-wrap-balance"
        @update:model-value="emitStyles"
      />
    </ep-flex>
  </ep-flex>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue'

  import EpRangeInput from '@/components/EpRangeInput.vue'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    },
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
  const localFontStyle = ref(false)
  const localTextTransform = ref(false)
  const localTextWrap = ref(false)

  const hasItalics = computed(() => props.font.variants.some(variant => variant.includes('italic')))

  const availableWeights = computed(() => {
    return props.font.variants.filter(weight => !weight.includes('italic')).map(variant => variant === 'regular' ? '400' : variant)
  })

  const weightOptions = computed(() =>
    availableWeights.value.map(weight => ({
      label: weight,
      value: weight
    }))
  )

  const computedStyles = computed(() => ({
    fontSize: `${localSize.value}px`,
    fontWeight: localWeight.value,
    fontStyle: localFontStyle.value ? 'italic' : 'normal',
    fontVariationSettings: `'wght' ${localWeight.value}`,
    letterSpacing: `${localLetterSpacing.value}px`,
    lineHeight: localLineHeight.value,
    textTransform: localTextTransform.value ? 'uppercase' : 'none',
    textWrap: localTextWrap.value ? 'balance' : 'auto',
  }))

  const emitStyles = () => {
    emit('update', computedStyles.value)
  }

  onMounted(() => {
    emitStyles()
  })

  watch([
    localSize,
    localWeight,
    localLetterSpacing,
    localLineHeight,
  ], () => {
    emitStyles()
  })
</script>

<style lang="scss" scoped>
  .font-controls {
    font-family: 'Calling Code', monospace;

    h3 {
      margin-bottom: 1rem;
    }
  }
</style>