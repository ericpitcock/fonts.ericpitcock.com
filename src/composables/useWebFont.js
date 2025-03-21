import { ref } from 'vue'
import WebFont from 'webfontloader'

export function useWebFont() {
  const loading = ref(true)
  const error = ref(false)

  const loadGoogleFonts = (fonts) => {
    // let fontStack = ''
    // if (font.variants.length > 1) {
    //   fontStack = `${font.family}:${font.variants.join(',')}`
    // } else {
    //   fontStack = font.family
    // }

    WebFont.load({
      google: {
        families: fonts
      },
      classes: false,
      fontloading: () => {
        loading.value = true
      },
      fontactive: () => {
        loading.value = false
      },
      fontinactive: () => {
        loading.value = false
        error.value = true
      }
    })
  }

  return {
    loading,
    error,
    loadGoogleFonts
  }
}