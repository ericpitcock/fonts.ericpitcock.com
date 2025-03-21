import { ref } from 'vue'
import WebFont from 'webfontloader'

// Module-level Set to track loaded fonts across all component instances
const loadedFonts = new Set()

export function useWebFont() {
  const loading = ref(true)
  const error = ref(false)

  const loadGoogleFonts = (fonts) => {
    // Filter out already loaded fonts
    const fontsToLoad = fonts.filter(font => !loadedFonts.has(font))

    // If all fonts are already loaded, just return
    if (fontsToLoad.length === 0) {
      console.log('All fonts already loaded:', fonts)
      loading.value = false
      return
    }

    console.log('Loading fonts:', fontsToLoad)
    loading.value = true

    WebFont.load({
      google: {
        families: fontsToLoad
      },
      classes: false,
      fontloading: () => {
        loading.value = true
      },
      fontactive: (familyName) => {
        // Add the font to our cached set
        loadedFonts.add(familyName)
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