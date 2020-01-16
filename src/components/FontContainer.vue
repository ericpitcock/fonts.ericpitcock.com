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
        observer: null,
        // intersected: false
      }
    },
    computed: {
      srcImage() {
        return this.intersected ? this.src : '';
      }
    },
    mounted() {
      //NEW
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
      
      // OLD
      // const fontObject = this.font
      // const callback = function(entries, observer) { 
      //   entries.forEach(entry => {
      //     // console.log(entry)
      //     if (entry.isIntersecting) {
      //       // this.intersected = true;
      //       console.log(fontObject.family)
            
      //       // this.observer.disconnect()
      //     }
      //   })
      // }
      // const options = {
      //   root: null,
      //   rootMargin: '0px',
      //   threshold: 0.5
      // }
      // this.observer = new IntersectionObserver(callback, options)
      // this.observer.observe(this.$refs.fontContainer)
    },
    destroyed() {
      this.observer.disconnect()
    }
  }
</script>

<style>

</style>