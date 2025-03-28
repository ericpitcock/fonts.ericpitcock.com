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
    <ep-flex class="flex-col">
      <h3 class="ui-heading">
        Color
      </h3>
      <ep-button-group
        :items="colorOptions"
        :active="colorIndex"
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
    initialStyles: {
      type: Object,
      default: () => ({})
    },
    // initialSize: { type: Number, default: 5 },
    // initialWeight: { type: String, default: '400' },
    availableWeights: {
      type: Array,
      default: () => []
    },
    minSize: { type: Number, default: 12 },
    maxSize: { type: Number, default: 128 },
    stepSize: { type: Number, default: 1 }
  })

  const emit = defineEmits(['update'])

  const localSize = ref(props.initialStyles.fontSize)
  const localWeight = ref(props.initialStyles.fontWeight)
  const localFontStyle = ref(props.initialStyles.fontStyle)
  const localLetterSpacing = ref(props.initialStyles.letterSpacing)
  const localLineHeight = ref(props.initialStyles.lineHeight)
  const localTextTransform = ref(props.initialStyles.textTransform)
  const localTextWrap = ref(props.initialStyles.textWrap)
  const localColor = ref(props.initialStyles.color)

  const colorOptions = [
    { label: 'Quiet', value: 'var(--text-color--quiet)' },
    { label: 'Normal', value: 'var(--text-color--normal)' },
    { label: 'Loud', value: 'var(--text-color--loud)' },
  ]

  // find the index of localColor in colorOptions
  // const colorIndex = computed(() => colorOptions.findIndex(color => color.value === localColor.value))
  // colorIndex find the index of localColor in colorOptions
  const colorIndex = ref(colorOptions.findIndex(color => color.value === localColor.value))

  const selectColor = (color) => {
    localColor.value = color.item.value
    colorIndex.value = color.index
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
    color: localColor.value,
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
      color: var(--primary-color-base);
    }
  }
</style>