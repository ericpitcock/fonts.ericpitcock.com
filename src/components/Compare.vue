<template>
  <div class="compare">
    <div class="container">
      <div class="content">
        <div class="controls">
          <!-- <template v-if="getCompare.length >= 2"> -->
          <div class="controls__label">{{ compareLabel }}</div>
          <div
            class="controls__clear"
            @click="clearCompare()"
          >Clear</div>
          <!-- </template> -->
        </div>
        <FontContainer
          v-for="(font, index) in getCompare"
          :key="index"
          :font="font"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'

  const store = useStore()

  const getCompare = computed(() => store.getters.getCompare)

  const compareLabel = computed(() => {
    if (getCompare.value.length == 1) {
      return 'Add more fonts to compare'
    } else {
      return `Comparing ${getCompare.value.length} fonts`
    }
  })

  const clearCompare = () => {
    store.dispatch('clearCompare')
  }
</script>

<style lang="scss" scoped>
  .compare {
    position: sticky;
    top: 110px;
    z-index: 1;
    display: flex;
    justify-content: center;
    width: 100vw;
    background: #fafafa;
    padding-bottom: 30px;
    border-bottom: 1px solid #e6e6e6;

    // margin-bottom: 30px;
    .controls {
      width: 100%;
      height: 30px;
      padding-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 12px;
      color: gray;

      &__label {
        margin-left: auto;
      }

      &__clear {
        margin-left: auto;
        cursor: pointer;
      }
    }
  }

  .font-container {
    background: #fff;

    :deep(.font) {
      border-color: #e6e6e6;
    }

    .font__sample {
      padding: 40px 30px;
    }
  }
</style>