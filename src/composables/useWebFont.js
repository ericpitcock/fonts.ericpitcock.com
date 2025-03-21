import { ref } from 'vue'
import WebFont from 'webfontloader'

export function useWebFont() {
  const fontsLoaded = ref(false)
  const loadingError = ref(null)

  const loadGoogleFonts = (fontFamilies, events = {}) => {
    fontsLoaded.value = false
    loadingError.value = null

    // Extract event callbacks
    const {
      loading,
      active,
      inactive,
      fontloading,
      fontactive,
      fontinactive
    } = events

    return new Promise((resolve, reject) => {
      WebFont.load({
        google: {
          families: fontFamilies.map(family => family.replace(/\s+/g, '+')),
        },
        // Event handlers
        loading: () => {
          // This event is triggered when all fonts have been requested
          if (loading) loading()
        },
        active: () => {
          // This event is triggered when the fonts have rendered
          fontsLoaded.value = true
          if (active) active()
          resolve(fontFamilies)
        },
        inactive: () => {
          // This event is triggered when the browser does not support linked fonts or if none of the fonts could be loaded
          loadingError.value = 'Failed to load fonts'
          if (inactive) inactive()
          reject(new Error('Failed to load fonts'))
        },
        fontloading: (familyName, fvd) => {
          // This event is triggered once for each font that's loaded
          if (fontloading) fontloading(familyName, fvd)
        },
        fontactive: (familyName, fvd) => {
          // This event is triggered once for each font that renders
          if (fontactive) fontactive(familyName, fvd)
        },
        fontinactive: (familyName, fvd) => {
          // This event is triggered if the font can't be loaded
          if (fontinactive) fontinactive(familyName, fvd)
        }
      })
    })
  }

  return {
    fontsLoaded,
    loadingError,
    loadGoogleFonts
  }
}