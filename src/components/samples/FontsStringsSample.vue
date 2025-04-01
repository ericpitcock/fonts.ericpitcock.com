<template>
  <div class="font-strings-sample">
    <div
      v-for="(text, index) in specimenTexts"
      :key="index"
      class="fitty-text"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
  import fitty from 'fitty'
  import { onMounted } from 'vue'

  const specimenTexts = Array.from({ length: 10 }, () => {
    const words = [
      "Lorem", "ipsum", "dolor", "sit", "amet",
      "consectetur", "adipiscing", "elit", "sed", "do",
      "eiusmod", "tempor", "incididunt", "ut", "labore",
      "et", "dolore", "magna", "aliqua"
    ]
    // Random number of words between 1 and 8
    const count = Math.floor(Math.random() * 8) + 1
    return Array.from({ length: count }, () => {
      return words[Math.floor(Math.random() * words.length)]
    }).join(" ")
  })

  onMounted(() => {
    setTimeout(() => {
      fitty('.fitty-text', {
        multiLine: false,
        minSize: 16,
        maxSize: 512,
      })
    }, 500)
  })
</script>

<style lang="scss" scoped>
  .font-strings-sample {
    width: 100%;
    color: var(--text-color--loud);

    & > * + * {
      margin-top: 5rem;
    }
  }

  .specimen-line {
    width: 100%;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }

  .fitty-text {
    display: block;
    white-space: nowrap;
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
</style>