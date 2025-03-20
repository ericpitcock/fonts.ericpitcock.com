<template>
  <div
    :id="font.family.toLowerCase().split(' ').join('-')"
    ref="el"
    class="font-container"
    @click="toFontSpecimen(font)"
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
          :style="{ fontFamily: font.family, fontSize: `${getGlobalFontSize}px` }"
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
  import { useRouter } from 'vue-router'
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

  const router = useRouter()

  const store = useStore()

  const inCompare = ref(false)
  const loading = ref(true)
  const error = ref(false)
  const observer = ref(null)

  const el = ref(null)

  const getCategoryFilter = computed(() => store.getters.getCategoryFilter)
  const getCompare = computed(() => store.getters.getCompare)
  const getFilters = computed(() => store.getters.getFilters)
  const getFontSample = computed(() => store.getters.getFontSample)
  const getGlobalFontSize = computed(() => store.getters.getGlobalFontSize)
  const showJSON = computed(() => store.getters.showJSON)

  const compare = (font) => {
    store.dispatch('updateCompare', font)
  }

  const compareLabel = (font) => {
    return (getCompare.value.some(item => item.family == font.family)) ? 'Remove' : 'Compare'
  }

  const loadFont = (font) => {
    // https://www.npmjs.com/package/webfontloader
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
      loading: () => {
      },
      active: () => {
      },
      inactive: () => {
      },
      fontloading: (familyName, fvd) => {
        loading.value = true
      },
      fontactive: (familyName, fvd) => {
        loading.value = false
      },
      fontinactive: (familyName, fvd) => {
        loading.value = false
        error.value = true
      }
    })
  }

  const toFontSpecimen = (font) => {
    store.dispatch('updateCurrentSpecimen', font.family)
    router.push({ path: `/${font.family.toLowerCase().split(' ').join('-')}` })
  }

  watch(getCategoryFilter, () => {
    console.log('getCategoryFilter changed')
    observer.value.observe(el.value)
  })

  watch(getFilters, () => {
    console.log('getFilters changed')
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

  // // Expose template ref - you need to add ref="el" to your root element in the template
  // defineExpose({ el })
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
    // color: black;
    text-decoration: none;
  }

  .font {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 60px;

    &:hover {
      // cursor: pointer;
    }

    &__sample {
      position: relative;
      flex: 1 1 auto;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: 20px;

      // color: hsl(0, 0%, 20%);
      &:hover {
        // cursor: pointer;
      }

      .json {
        padding-top: 30px;
        font-size: 12px;
      }
    }

    &__compare-button {
      display: flex;
      align-items: center;
      display: flex;
      align-items: center;
      font-size: 11px;
      border-radius: 15px;
      color: var(--primary-color);

      &:hover {
        color: black;
        // cursor: pointer;
      }
    }
  }
</style>