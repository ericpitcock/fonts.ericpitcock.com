<template>
  <div
    ref="fontCardRef"
    class="font-card"
  >
    <div class="font">
      <div class="font__sample">
        <div
          v-if="loading"
          class="loading"
        >
          <img
            src="/img/loading.svg"
            alt="loading"
          >
        </div>
        <div
          v-if="error"
          class="error"
        >
          <p>There was an error loading this font</p>
        </div>
        <sentence-sample
          v-if="!loading && !error"
          :id="font.family.toLowerCase().split(' ').join('-')"
          :style="sampleStyles"
        />
      </div>
      <font-info :font="font" />
      <div
        v-if="showJSON"
        class="json"
      >
        <pre>{{ font }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
  } from 'vue'
  import { useStore } from 'vuex'

  import FontInfo from '@/components/FontInfo.vue'
  import SentenceSample from '@/components/samples/SentenceSample.vue'
  import { useWebFont } from '@/composables/useWebFont'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()
  const fontCardRef = ref(null)
  const observer = ref(null)

  const getCategoryFilter = computed(() => store.state.categoryFilter)
  const getFilters = computed(() => store.state.filters)
  const globalFontSize = computed(() => store.state.globalFontSize)
  const showJSON = computed(() => store.state.showJSON)

  const { loadGoogleFonts, loading, error } = useWebFont()

  const getFontWeight = (font) => {
    if (font.variants.includes('regular')) {
      return '400'
    } else if (font.variants.length > 0) {
      return font.variants[0]
    }
    return '400'
  }

  const sampleStyles = computed(() => {
    return {
      fontFamily: `'${props.font.family}'`,
      fontSize: `${globalFontSize.value}px`,
      fontWeight: getFontWeight(props.font),
      fontVariationSettings: `'wght' ${getFontWeight(props.font)}`,
    }
  })

  const setupObserver = (fontFamily) => {
    if (observer.value) {
      observer.value.disconnect()
    }
    observer.value = new IntersectionObserver(entries => {
      const container = entries[0]
      if (container.isIntersecting) {
        loadGoogleFonts([fontFamily])
        observer.value.disconnect()
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    })

    if (fontCardRef.value) {
      observer.value.observe(fontCardRef.value)
    }
  }

  onMounted(() => {
    setupObserver(props.font.family)
  })

  watch(getCategoryFilter, () => {
    if (fontCardRef.value && observer.value) {
      observer.value.observe(fontCardRef.value)
    }
  })

  watch(getFilters, () => {
    if (fontCardRef.value && observer.value) {
      observer.value.observe(fontCardRef.value)
    }
  }, { deep: true })

  watch(() => props.font, (newFont, oldFont) => {
    if (newFont.family !== oldFont.family) {
      setupObserver(newFont.family)
    }
  })

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })
</script>

<style lang="scss" scoped>
  .font-card {
    position: relative;
    cursor: pointer;
    background: var(--interface-surface);
    border: 0.1rem solid var(--border-color);
    border-radius: var(--border-radius--large);

    :root & {
      --font-hover-bg: var(--interface-surface--accent);
    }

    html[data-color-theme='light'] & {
      --font-hover-bg: var(--interface-overlay);
    }

    &:hover {
      background: var(--font-hover-bg);
    }

    .loading {
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
    }

    .loading img {
      height: 20px;
    }

    .error {
      display: flex;
      align-items: center;
      color: var(--primary-color-base);
    }
  }

  .font-card a {
    text-decoration: none;
  }

  .font {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 60px 30px 0;

    &__sample {
      position: relative;
      flex: 1 1 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .error {
        padding-left: 6rem;
      }

      .json {
        padding-top: 30px;
        font-size: 12px;
      }
    }
  }
</style>