<template>
  <div class="alphabet-sample">
    <div v-for="char in characterSet" :key="char">{{ char }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alphabet-sample {
    word-break: break-all;
    letter-spacing: 2px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;

    > div {
      flex: 0 0 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border: 1px solid #e6e6e6;
    }
  }
</style>
