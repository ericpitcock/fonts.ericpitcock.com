import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { categoryMap } from '@/store/categoryMap'
import { headlines } from '@/store/headlines'
import { recommendedFonts } from '@/store/recommendedFonts'
import { weightMap } from '@/store/weightMap'

const defaultFilters = {
  category: 'sans-serif',
  italics: false,
  multipleWeights: false,
  recommended: false,
}

export const useFontsStore = defineStore('font', () => {
  // State
  const filters = ref({ ...defaultFilters })
  const currentFont = ref({})
  const categoryFilter = ref('sans-serif')
  const categoryMapRef = ref(categoryMap)
  const globalFontSize = ref(36)
  const googleFonts = ref([])
  const headlinesRef = ref(headlines)
  const recommendedFontsRef = ref(recommendedFonts)
  const sentenceSample = ref('The quick brown fox jumps over the lazy dog.')
  const sentenceSampleDefault = ref('The quick brown fox jumps over the lazy dog.')
  const showJSON = ref(false)
  const theme = ref('dark')
  const weightMapRef = ref(weightMap)

  // Getters
  const getLatinFonts = computed(() => {
    return googleFonts.value.filter(
      font => font.subsets.includes('latin')
    )
  })

  const getFontCategories = computed(() => {
    return [...new Set(googleFonts.value.map(font => font.category))]
  })

  const getFontsByCategory = (category) => {
    return getLatinFonts.value.filter(
      font => font.category === category
    )
  }

  const getActiveFonts = computed(() => {
    let activeFonts = getFontsByCategory(categoryFilter.value)

    // Apply recommended fonts filter
    if (filters.value.recommended) {
      activeFonts = activeFonts.filter(
        font => recommendedFontsRef.value.includes(font.family)
      )
    }

    // if filters.italics, filter out the non-italic variants
    if (filters.value.italics) {
      activeFonts = activeFonts.filter(
        font => font.variants.includes('italic')
      )
    }

    // if multipleWeights, filter out the fonts with only one weight
    if (filters.value.multipleWeights) {
      activeFonts = activeFonts.filter(font => font.variants.length > 1)
      // if there are 2 variants and one of them is italic, filter it out
      activeFonts = activeFonts.filter(
        font => !(font.variants.length === 2 && font.variants.includes('italic'))
      )
    }

    return activeFonts
  })

  const getFontCount = computed(() => {
    return getActiveFonts.value.length
  })

  const getFiltersAsQuery = computed(() => {
    const queryParams = {}

    // Only include filter values that are true
    Object.keys(filters.value).forEach(key => {
      // Skip category as it's part of the path
      if (key !== 'category' && filters.value[key] === true) {
        queryParams[key] = 'true'
      }
    })

    return queryParams
  })

  // Methods (formerly mutations and actions)
  const getCurrentFont = (fontQuery) => {
    return googleFonts.value.find(font => font.family === fontQuery)
  }

  const getFontBySlug = (slug) => {
    return googleFonts.value.find(
      font => font.family.toLowerCase().replace(/\s+/g, '-') === slug
    )
  }

  const getFontByName = (name) => {
    const font = googleFonts.value.find(
      font => font.family === name
    )
    if (!font) return {}
    return font
  }

  const getFontPathByName = (name) => {
    const font = getFontByName(name)
    if (!font) return
    const category = font.category
    return `/${category}/${font.family.toLowerCase().replace(/\s+/g, '-')}`
  }

  const resetFilters = () => {
    filters.value = { ...defaultFilters }
  }

  const setGoogleFonts = (fonts) => {
    googleFonts.value = fonts
  }

  const setCategoryFilter = (value) => {
    categoryFilter.value = value
  }

  const setCurrentFont = (font) => {
    currentFont.value = font
  }

  const setFilters = (value = {}) => {
    if (Object.keys(value).length === 0) {
      for (let key in filters.value) {
        if (key !== 'category') {
          filters.value[key] = false
        }
      }
      return
    }
    for (let key in value) {
      filters.value[key] = value[key]
    }
  }

  const applyFiltersFromQuery = (query) => {
    const newFilters = { ...defaultFilters }

    for (const key in query) {
      if (key !== 'tab' && key in newFilters) {
        newFilters[key] = query[key] === 'true'
      }
    }

    filters.value = newFilters
  }

  const setGlobalFontSize = (value) => {
    globalFontSize.value = value
  }

  const setSentenceSample = (value) => {
    sentenceSample.value = value
  }

  const setTheme = (data) => {
    theme.value = data
  }

  const toggleJSON = () => {
    showJSON.value = !showJSON.value
  }

  const fetchGoogleFonts = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONTS_API_KEY}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch Google Fonts. Status: ${response.status}`)
      }

      const data = await response.json()
      setGoogleFonts(data.items)
    } catch (error) {
      console.error('Error fetching Google Fonts:', error)
      throw error
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-color-theme', newTheme)
    setTheme(newTheme)
  }

  const updateURLWithFilters = (router) => {
    const currentRoute = router.currentRoute.value
    const queryParams = { ...getFiltersAsQuery.value }

    // Preserve the tab parameter if it exists
    if (currentRoute.query.tab) {
      queryParams.tab = currentRoute.query.tab
    }

    // Always update URL to ensure consistency
    router.replace({
      path: currentRoute.path,
      query: queryParams
    })
  }

  // Return all state properties, getters, and actions
  return {
    // State
    filters,
    currentFont,
    categoryFilter,
    categoryMap: categoryMapRef,
    globalFontSize,
    googleFonts,
    headlines: headlinesRef,
    recommendedFonts: recommendedFontsRef,
    sentenceSample,
    sentenceSampleDefault,
    showJSON,
    theme,
    weightMap: weightMapRef,

    // Getters
    getLatinFonts,
    getFontCategories,
    getActiveFonts,
    getFontCount,
    getFiltersAsQuery,

    // Methods that act as getters
    getCurrentFont,
    getFontBySlug,
    getFontByName,
    getFontPathByName,
    getFontsByCategory,

    // Actions
    resetFilters,
    setGoogleFonts,
    setCategoryFilter,
    setCurrentFont,
    setFilters,
    applyFiltersFromQuery,
    setGlobalFontSize,
    setSentenceSample,
    setTheme,
    toggleJSON,
    fetchGoogleFonts,
    toggleTheme,
    updateURLWithFilters
  }
})