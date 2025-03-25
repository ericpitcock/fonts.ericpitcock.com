<template>
  <ep-flex class="font-controls flex-col gap-20">
    <div class="font-controls__font-size">
      <h3 class="ui-heading">
        Font Size
      </h3>
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
      <h3 class="ui-heading">
        Font Weight
      </h3>
      <ep-select
        v-model="localWeight"
        :select-id="`font-weight-${id}`"
        :options="weightOptions"
        size="default"
      />
    </div>
    <div class="font-controls__line-height">
      <h3 class="ui-heading">
        Line Height
      </h3>
      <ep-range-input
        v-model="localLineHeight"
        :min="1"
        :max="2"
        :step="0.1"
        unit=""
      />
    </div>
    <div class="font-controls__letter-spacing">
      <h3 class="ui-heading">
        Letter Spacing
      </h3>
      <ep-range-input
        v-model="localLetterSpacing"
        :min="-1"
        :max="10"
        :step="0.1"
      />
    </div>
    <ep-divider direction="horizontal" />
    <ep-flex class="flex-col gap-10">
      <h3 class="ui-heading">
        Color
      </h3>
      <ep-button-group
        :items="colorOptions"
        :active="localColor.index"
        active-class="selected-font-color"
        @click="selectColor"
      />
    </ep-flex>
    <ep-divider direction="horizontal" />
    <ep-flex class="flex-col gap-10">
      <ep-checkbox
        v-if="hasItalics"
        :id="`FontStyle-${id}`"
        v-model="localFontStyle"
        label="Italic"
        :name="`checkboxes-${id}`"
        value="italic"
        @update:model-value="emitStyles"
      />
      <ep-checkbox
        v-if="font.category != 'handwriting'"
        :id="`TextTransform-${id}`"
        v-model="localTextTransform"
        label="Uppercase"
        :name="`checkboxes-${id}`"
        value="uppercase"
        @update:model-value="emitStyles"
      />
      <ep-checkbox
        :id="`TextWrap-${id}`"
        v-model="localTextWrap"
        label="Text Wrap Balance"
        :name="`checkboxes-${id}`"
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
    id: {
      type: String,
      required: true
    },
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
    maxSize: { type: Number, default: 128 },
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
  const localColor = ref({
    index: 1,
    item: { label: 'Normal', value: 'normal' }
  })

  const colorOptions = [
    { label: 'Quiet', value: 'quiet' },
    { label: 'Normal', value: 'normal' },
    { label: 'Loud', value: 'loud' }
  ]

  // find the index of localColor in colorOptions
  // const colorIndex = computed(() => colorOptions.findIndex(color => color.value === localColor.value))

  const selectColor = (color) => {
    localColor.value = color
    console.log(color)
  }

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
    color: `var(--text-color--${localColor.value.item.value})`,
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
    localColor,
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

    :deep(.ep-button.selected-font-color) {
      color: var(--primary-color);
    }
  }
</style>