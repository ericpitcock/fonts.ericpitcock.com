<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #main>
      <div class="index">
        <div class="index__header">
          <SampleControl />
        </div>
        <div
          ref="content"
          class="index__content"
        >
          <div class="content-padder">
            <template v-if="getActiveFonts.length == 0">
              <div class="no-results">No fonts found. Try
                <span @click="$store.commit('resetFilters')">
                  resetting all filters.
                </span>
              </div>
            </template>
            <FontContainer
              v-for="(font, index) in getActiveFonts"
              :key="index"
              :font="font"
              @click="toFontSpecimen(font)"
            />
          </div>
        </div>
        <div class="index__status-bar">
          <ep-item-count
            :count="getFontCount"
            singular="font"
            plural="fonts"
          />
        </div>
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import { computed, useTemplateRef, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import SampleControl from '@/components/SampleControl.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const store = useStore()

  const getActiveFonts = computed(() => store.getters.getActiveFonts)
  const getFontCount = computed(() => store.getters.getFontCount)

  const router = useRouter()
  const toFontSpecimen = (font) => {
    router.push({
      path: `/${font.family.toLowerCase().replace(/\s+/g, '-')}`,
    })
  }

  const content = useTemplateRef('content')

  watch(getActiveFonts, () => {
    content.value.scrollTop = 0
  })
</script>

<style lang="scss" scoped>
  .index {
    display: grid;
    grid-template-rows: 8rem 1fr 4rem;
    grid-template-columns: 1fr;
    overflow: hidden;
  }

  .index__header {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  .index__content {
    grid-row: 2/3;
    grid-column: 1/2;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .index__status-bar {
    grid-row: 3/4;
    grid-column: 1/2;
    display: flex;
    align-items: center;
    // background: var(--interface-bg);
    border-top: 0.1rem solid var(--border-color);
    padding: 0 6rem;
  }

  .content-padder {
    padding: 0 0 20rem 0;
  }

  .no-results {
    padding: 3rem 6rem;
    font-size: 1.5em;

    span {
      color: #007bff;
      cursor: pointer;
    }
  }
</style>
