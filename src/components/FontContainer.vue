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
        intersected: false
      }
    },
    computed: {
      srcImage() {
        return this.intersected ? this.src : '';
      }
    },
    mounted() {
      var callback = function(entries, observer) { 
        entries.forEach(entry => {
          // console.log(entry)
          if (entry.isIntersecting) {
            // this.intersected = true;
            console.log('intersected')
            
            // this.observer.disconnect()
          }
        })
      }
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
      let observer = new IntersectionObserver(callback, options)
      observer.observe(this.$refs.fontContainer)
      // const targets = document.querySelectorAll('.font')
      // targets.forEach(target => {
      //   observer.observe(target)
      // })

      // this.observer = new IntersectionObserver(entries => {
      //   const image = entries[0];
      //   if (image.isIntersecting) {
      //     this.intersected = true;
      //     console.log('intersected')
          
      //     this.observer.disconnect()
      //   }
      // })

      // this.observer.observe(this.$el)
    },
    destroyed() {
      this.observer.disconnect()
    }
  }
</script>

<style>

</style>