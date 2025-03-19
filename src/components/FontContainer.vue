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
        <SentenceSample
          v-if="!loading && !error"
          :style="{ fontFamily: font.family, fontSize: `${getGlobalFontSize}px` }"
          @sentence-click="toFontSpecimen(font)"
        />
      </div>
      <FontInfo :font="font" />
      <div
        class="json"
        v-if="showJSON"
      >
        <pre>{{ font }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import SentenceSample from '@/components/samples/SentenceSample.vue'
  import FontInfo from '@/components/FontInfo.vue'
  import WebFont from 'webfontloader'

  const props = defineProps(['font'])

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
    // console.log([fontStack])
    WebFont.load({
      google: {
        //families: ['Open Sans:300,400,700']
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
        // console.log(`fontloading: ${familyName}`)
      },
      fontactive: (familyName, fvd) => {
        loading.value = false
        // console.log(`fontactive: ${familyName}`)
      },
      fontinactive: (familyName, fvd) => {
        loading.value = false
        error.value = true
        // console.log(`fontinactive: ${familyName}`)
      }
    })
  }

  const toFontSpecimen = (font) => {
    // temp disabled
    // use @sentence-click="toFontSpecimen(font)" in SentenceSample
    // populate store and route
    store.dispatch('updateCurrentSpecimen', font.family)
    router.push({ path: `/${font.family.toLowerCase().split(' ').join('-')}` })
  }

  // Watchers
  watch(getCategoryFilter, () => {
    console.log('getCategoryFilter changed')
    observer.value.observe(el.value)
  })

  watch(getFilters, () => {
    console.log('getFilters changed')
    observer.value.observe(el.value)
  }, { deep: true })

  // Lifecycle hooks
  onMounted(() => {
    // https://alligator.io/vuejs/lazy-image/
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
      color: red;
    }
  }

  .font-container a {
    color: black;
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
      color: hsl(0, 0%, 20%);

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
      color: red;

      &:hover {
        color: black;
        // cursor: pointer;
      }
    }
  }
</style>