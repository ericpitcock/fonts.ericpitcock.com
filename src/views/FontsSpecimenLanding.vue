<template>
  <ep-flex class="fonts-specimen-landing flex-col gap-100">
    <ep-flex class="fonts-specimen-landing gap-30">
      <div class="font-family">
        <h1>{{ font.family }}</h1>
      </div>
      <ep-flex class="font-variants flex-col gap-20">
        <h1
          v-for="(variant, index) in variants"
          :key="index"
          :style="{
            fontWeight: variant.value,
            fontVariationSettings: `'wght' ${variant.value}`
          }"
        >
          <span>{{ variant.name }}</span>
          <span
            v-if="variant.italic"
            style="font-style: italic; color: var(--text-color--subtle)"
          >
            Italic
          </span>
        </h1>
      </ep-flex>
    </ep-flex>
    <char-set-sample />
  </ep-flex>
</template>

<script setup>
  // import { computed } from 'vue'
  import { useStore } from 'vuex'

  import CharSetSample from '@/components/samples/CharSetSample.vue'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const store = useStore()
  const weightMap = store.state.weightMap

  // const variants = props.font.variants.map(variant => {
  //   return {
  //     name: weightMap[variant],
  //     value: variant
  //   }
  // })
  /*
  font object:
  {
  "family": "Petrona",
  "variants": [
    "100",
    "200",
    "300",
    "regular",
    "500",
    "600",
    "700",
    "800",
    "900",
    "100italic",
    "200italic",
    "300italic",
    "italic",
    "500italic",
    "600italic",
    "700italic",
    "800italic",
    "900italic"
  ],
  "subsets": [
    "latin",
    "latin-ext",
    "vietnamese"
  ],
  "version": "v32",
  "lastModified": "2024-09-04",
  "files": {
    "100": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsARBH452Mvds.ttf",
    "200": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NsQRBH452Mvds.ttf",
    "300": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk7TsQRBH452Mvds.ttf",
    "500": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6_sQRBH452Mvds.ttf",
    "600": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5TtgRBH452Mvds.ttf",
    "700": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5qtgRBH452Mvds.ttf",
    "800": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NtgRBH452Mvds.ttf",
    "900": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4ktgRBH452Mvds.ttf",
    "regular": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsQRBH452Mvds.ttf",
    "100italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwDFYpUN-dsIWs.ttf",
    "200italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwCFYpUN-dsIWs.ttf",
    "300italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8rICFYpUN-dsIWs.ttf",
    "italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwCFYpUN-dsIWs.ttf",
    "500italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8t4CFYpUN-dsIWs.ttf",
    "600italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8jIFFYpUN-dsIWs.ttf",
    "700italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8gsFFYpUN-dsIWs.ttf",
    "800italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwFFYpUN-dsIWs.ttf",
    "900italic": "https://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8kUFFYpUN-dsIWs.ttf"
  },
  "category": "serif",
  "kind": "webfonts#webfont",
  "menu": "https://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsTRAFYo.ttf"
}
  */

  // map variants into an array of objects with name and value properties and boolean for whether there's a matching italic
  // for example, "100" becomes { name: "Thin", value: "100", italic: true }
  // const variants = props.font.variants.map(variant => {
  //   return {
  //     name: weightMap[variant],
  //     value: variant,
  //     italic: props.font.variants.includes(`${variant}italic`)
  //   }
  // })

  const variants = props.font.variants
    .filter(variant => !variant.includes('italic'))
    .map(variant => ({
      name: weightMap[variant],
      value: variant,
      italic: props.font.variants.includes(`${variant}italic`)
    }))

  console.log(variants)
</script>

<style scoped>
  h1 {
    font-size: 6rem;
    color: var(--text-color--loud);
    /* text-box: cap alphabetic; */
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
</style>