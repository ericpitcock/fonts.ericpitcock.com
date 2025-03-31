<template>
  <fonts-layout
    v-if="font"
    class="fonts-grid--no-sidebar fonts-grid--no-footer"
  >
    <template #header>
      <fonts-specimen-details
        :font="font"
        :initial-tab="initialTab"
      />
    </template>
    <template #main>
      <div
        v-show="!loading && font"
        class="specimen"
        :style="{ fontFamily: `'${font.family}'` }"
      >
        <component
          :is="componentName"
          :font="font"
        />
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import {
    defineAsyncComponent,
    ref,
    shallowRef,
    watch,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import FontsSpecimenDetails from '@/components/FontsSpecimenDetails.vue'
  import { useWebFont } from '@/composables/useWebFont'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const FontsSpecimenOverview = defineAsyncComponent(() => import('@/views/FontsSpecimenOverview.vue'))
  const FontsSpecimenPlayground = defineAsyncComponent(() => import('@/views/FontsSpecimenPlayground.vue'))
  const FontsSpecimenUi = defineAsyncComponent(() => import('@/views/FontsSpecimenUi.vue'))

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    font: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['close'])

  const route = useRoute()
  const router = useRouter()
  const componentName = shallowRef(null)
  const font = ref(null)
  const initialTab = ref(0)

  const closeModal = () => {
    emit('close')
    // Remove font parameter from URL
    const query = { ...route.query }
    delete query.font
    delete query.tab
    router.push({
      path: route.path,
      query
    })
  }

  watch(() => route.query.tab, (tab) => {
    switch (tab) {
      case 'overview': {
        componentName.value = FontsSpecimenOverview
        initialTab.value = 0
        break
      }
      case 'ui': {
        componentName.value = FontsSpecimenUi
        initialTab.value = 1
        break
      }
      case 'playground': {
        componentName.value = FontsSpecimenPlayground
        initialTab.value = 2
        break
      }
      default: {
        componentName.value = FontsSpecimenOverview
      }
    }
  }, { immediate: true })

  // Watch for changes in font prop
  watch(() => props.font, (newFontFamily) => {
    if (newFontFamily) {
      // Get font from store
      import('@/store').then(({ default: store }) => {
        font.value = store.getters.getFontByName(newFontFamily)

        if (font.value) {
          // Load the font if it's found
          const variants = font.value.variants.join(',')
          const fontString = `${font.value.family}:${variants}`
          loadGoogleFonts([fontString])
        }
      })
    }
  }, { immediate: true })

  const { loadGoogleFonts, loading } = useWebFont()
</script>

<style lang="scss" scoped>
  .specimen-modal {
    position: absolute;
    inset: 0;
  }

  .specimen {
    display: flex;
    flex-direction: column;
    height: 100%;
    // max-height: calc(90vh - 10rem);
    /* Adjust height accounting for header */
    overflow-y: auto;
  }
</style>