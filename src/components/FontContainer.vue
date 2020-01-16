<template>
  <div ref="fontContainer" class="font-container">
    <slot name="font"></slot>
  </div>
</template>

<script>
  export default {
    name: 'FontContainer',
    props: ['font'],
    data() {
      return {
        observer: null
      }
    },
    computed: {
      srcImage() {
        return this.intersected ? this.src : '';
      }
    },
    mounted() {
      // https://alligator.io/vuejs/lazy-image/
      this.observer = new IntersectionObserver(entries => {
        const container = entries[0]
        if (container.isIntersecting) {
          console.log(this.font.family)
          this.observer.disconnect()
        }
      },{
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      })
      this.observer.observe(this.$refs.fontContainer)
    },
    destroyed() {
      this.observer.disconnect()
    }
  }
</script>

<style>

</style>