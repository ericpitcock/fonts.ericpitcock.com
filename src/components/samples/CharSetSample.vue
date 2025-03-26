<template>
  <ep-flex class="flex-col gap-60">
    <ep-flex
      v-for="(set, index) in characterSet"
      :key="index"
      class="flex-col gap-20"
    >
      <h3 class="ui-heading">
        {{ set.label }}
      </h3>
      <div class="characters">
        <div
          v-for="(char, index) in set.value"
          :key="index"
          class="character"
        >
          {{ char }}
        </div>
      </div>
    </ep-flex>
  </ep-flex>
</template>

<script setup>
  const characterSet = [
    {
      label: 'Uppercase',
      value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
      label: 'Lowercase',
      value: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
      label: 'Numbers',
      value: '0123456789'
    },
    {
      label: 'Special Characters',
      value: '‘?’“!”(%)[#]{@}/&\\<-+÷×=>®©$€£¥¢:;,.*'
    },
  ]
</script>

<style lang="scss" scoped>
  .characters {
    word-break: break-all;
    letter-spacing: 2px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 3rem;

    .character {
      flex: 0 0 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.1rem solid var(--border-color);
      color: var(--text-color--loud);
    }
  }
</style>
