<template>
  <div class="alphabet-sample">
    <!-- <p>
      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
      abcdefghijklmnopqrstuvwxyz<br />
      0123456789<br />
      ‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*
    </p> -->
    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    <div>abcdefghijklmnopqrstuvwxyz</div>
    <div>0123456789</div>
    <div>‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*</div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .alphabet-sample {
    word-break: break-all;
    letter-spacing: 2px;
    display: flex;

    > div {
      flex: 1;
      padding: 0 30px;
      border-left: 1px solid #e6e6e6;
    }
  }
</style>