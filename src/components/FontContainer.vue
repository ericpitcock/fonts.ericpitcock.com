<template>
  <div
    :id="font.family.toLowerCase().split(' ').join('-')"
    ref="el"
    class="font-container"
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
          :style="{ fontFamily: font.family, fontSize: `${globalFontSize}px` }"
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
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import WebFont from 'webfontloader'

  import FontInfo from '@/components/FontInfo.vue'
  import SentenceSample from '@/components/samples/SentenceSample.vue'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()

  const loading = ref(true)
  const error = ref(false)
  const observer = ref(null)

  const el = ref(null)

  const getCategoryFilter = computed(() => store.state.categoryFilter)
  const getFilters = computed(() => store.state.filters)
  const globalFontSize = computed(() => store.state.globalFontSize)
  const showJSON = computed(() => store.state.showJSON)

  const loadFont = (font) => {
    let fontStack = ''
    if (font.variants.length > 1) {
      fontStack = `${font.family}:${font.variants.join(',')}`
    } else {
      fontStack = font.family
    }

    WebFont.load({
      google: {
        families: [fontStack]
      },
      classes: false,
      fontloading: () => {
        loading.value = true
      },
      fontactive: () => {
        loading.value = false
      },
      fontinactive: () => {
        loading.value = false
        error.value = true
      }
    })
  }

  watch(getCategoryFilter, () => {
    observer.value.observe(el.value)
  })

  watch(getFilters, () => {
    observer.value.observe(el.value)
  }, { deep: true })

  onMounted(() => {
    observer.value = new IntersectionObserver(entries => {
      const container = entries[0]
      if (container.isIntersecting) {
        loadFont(props.font)
        observer.value.disconnect()
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    })
    observer.value.observe(el.value)
  })

  onBeforeUnmount(() => {
    observer.value.disconnect()
  })
</script>

<style lang="scss" scoped>
  .font-container {
    position: relative;
    cursor: pointer;
    border-bottom: 0.1rem solid var(--border-color);

    &:is(:first-child) {
      border-top: 0.1rem solid var(--border-color);
    }

    &:hover {
      background: var(--interface-overlay);
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
      color: var(--primary-color);
    }
  }

  .font-container a {
    text-decoration: none;
  }

  .font {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 60px;

    &__sample {
      position: relative;
      flex: 1 1 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .json {
        padding-top: 30px;
        font-size: 12px;
      }
    }
  }
</style>