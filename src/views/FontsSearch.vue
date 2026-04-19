<template>
  <fonts-layout class="fonts-grid--no-header-footer">
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #corner>
      <ep-theme-toggle
        class="app-header-button ep-button-var--ghost"
        :current-theme="theme"
        @toggle-theme="toggleTheme"
      />
    </template>
    <template #main>
      <div class="search">
        <div class="search-input">
          <ep-flex class="search-container flex-col gap-30">
            <h1 class="ui-heading">
              Describe the fonts you’re looking for
            </h1>
            <ep-flex class="flex-col gap-10">
              <ep-textarea
                v-model="input"
                placeholder="Give me some fonts that are clean and modern."
                @keydown.enter="onEnter"
              />
              <ep-button
                label="Search"
                @click="sendMessage"
              />
            </ep-flex>
            <ep-flex class="flex-col gap-10">
              <ep-flex class="canned-prompts flex-col gap-10">
                <ep-button
                  v-for="(button, index) in cannedPrompts"
                  :key="index"
                  class="canned-prompt-button"
                  :label="button.label"
                  size="xlarge"
                  @click="runCannedPrompt(button.prompt)"
                />
              </ep-flex>
            </ep-flex>
          </ep-flex>
        </div>
        <div class="search-results">
          <ep-loading-state
            v-if="loading"
            :message="loadingMessage"
          />
          <ep-flex
            v-else-if="error"
            class="search-error flex-col gap-10"
          >
            <h2>Something went wrong</h2>
            <p>{{ error }}</p>
            <ep-button
              label="Try again"
              @click="sendMessage()"
            />
          </ep-flex>
          <template v-else-if="parsedResponse.length > 0">
            <fonts-card-layout
              :fonts="fontResults"
              view="cards"
              @click="onFontCardClick"
            />
          </template>

          <div v-else-if="response">
            {{ response }}
          </div>
        </div>
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import { GoogleGenAI } from '@google/genai'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsCardLayout from '@/layouts/FontsCardLayout.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()
  const router = useRouter()
  const route = useRoute()

  const toggleTheme = () => fontsStore.toggleTheme()
  const theme = computed(() => fontsStore.theme)

  const input = ref('')
  const response = ref('')
  const parsedResponse = ref([])
  const loading = ref(false)
  const loadingMessage = ref({ message: '' })
  const error = ref()
  const googleFonts = fontsStore.googleFonts
  let messageTimeouts = []
  let abortTimeout = null
  let abortController = null

  const loadingMessages = [
    { delay: 0, message: 'Searching for the best fonts…' },
    { delay: 8000, message: 'Really thinking about it…' },
    { delay: 20000, message: 'Struggling right now…' },
    { delay: 40000, message: 'Still trying, hang tight…' },
  ]

  const onEnter = (event) => {
    if (event.shiftKey) return

    event.preventDefault()
    sendMessage()
  }

  const runCannedPrompt = async (prompt) => {
    input.value = prompt
    sendMessage(prompt)
  }

  const cannedPrompts = [
    {
      label: "Modern sans ui fonts for web apps",
      prompt: "Modern sans ui fonts for web apps"
    },
    {
      label: "Elegant serif fonts for editorial designs",
      prompt: "Elegant serif fonts for editorial designs"
    },
    {
      label: "Playful handwritten fonts for creative projects",
      prompt: "Playful handwritten fonts for creative projects"
    },
    {
      label: "Futuristic display fonts for tech startups",
      prompt: "Futuristic display fonts for tech startups"
    },
    {
      label: "Vintage typewriter fonts for retro aesthetics",
      prompt: "Vintage typewriter fonts for retro aesthetics"
    },
    {
      label: "Minimalist monospaced fonts for coding environments",
      prompt: "Minimalist monospaced fonts for coding environments"
    }
  ]

  const sendMessage = async (prompt = null) => {
    if (!input.value || loading.value) return

    loading.value = true
    loadingMessage.value = { message: '' }
    response.value = ''
    parsedResponse.value = []
    error.value = null

    messageTimeouts.forEach(clearTimeout)
    messageTimeouts = []
    clearTimeout(abortTimeout)
    if (abortController) abortController.abort()
    abortController = new AbortController()

    loadingMessages.forEach(({ delay, message }) => {
      const id = setTimeout(() => {
        loadingMessage.value = { message }
      }, delay)
      messageTimeouts.push(id)
    })

    abortTimeout = setTimeout(() => {
      if (abortController) abortController.abort()
    }, 60000)

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

      const systemPrompt = `You are a Google Fonts and typography expert. Your role is to help users find the perfect fonts from the Google Fonts library based on their natural language descriptions. You should return a JSON array containing the names of the best fonts that best suit the user's request. Limit of 10 fonts. Do not include any additional commentary or explanation—only return the JSON array. Do not return an object. Do not include any additional information. Only return font names exactly as they appear in the available google fonts: ${googleFonts.map((font) => font.family).join(', ')}. Do not return "Source Sans Pro" - it's known as "Source Sans 3" now.`

      const userPrompt = prompt || input.value

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${systemPrompt}\n\nUser request: ${userPrompt}`,
        config: {
          abortSignal: abortController.signal,
        },
      })

      const raw = result.text.trim()
      response.value = raw

      try {
        const parsedJSON = JSON.parse(raw)

        parsedJSON.forEach((font) => {
          if (googleFonts.map((font) => font.family).includes(font)) {
            parsedResponse.value.push(font)
          }
        })

        router.push({
          query: {
            input: input.value,
            results: parsedResponse.value.join(',')
          }
        })
      } catch (e) {
        console.warn('Could not parse response as JSON. Showing raw output.')
      }
    } catch (err) {
      console.error(err)

      if (err?.name === 'AbortError' || abortController?.signal?.aborted) {
        error.value = 'The request took too long. The server may be experiencing high demand. Please try again.'
      } else if (err?.message) {
        try {
          const parsed = JSON.parse(err.message)
          error.value = parsed?.error?.message || err.message
        } catch {
          error.value = err.message
        }
      } else {
        error.value = 'An unexpected error occurred. Please try again.'
      }
    } finally {
      loading.value = false
      loadingMessage.value = { message: '' }
      messageTimeouts.forEach(clearTimeout)
      messageTimeouts = []
      clearTimeout(abortTimeout)
    }
  }

  const fontResults = computed(() => {
    return parsedResponse.value.map((font) => {
      return fontsStore.getFontByName(font)
    })
  })

  // const getFontByName = (name) => fontsStore.getFontByName(name)

  const onFontCardClick = (font) => {
    router.push({
      query: {
        ...route.query,
        font: font.family,
        tab: 'overview'
      }
    })
  }

  onMounted(() => {
    const results = router.currentRoute.value.query.results
    if (results) {
      parsedResponse.value = results.split(',')
    } else {
      parsedResponse.value = []
    }
    input.value = router.currentRoute.value.query.input || ''
  })

  watch(() => router.currentRoute.value.query.results, (results) => {
    if (results) {
      parsedResponse.value = results.split(',')
    } else {
      parsedResponse.value = []
    }
  })
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    justify-content: flex-end;
    grid-template-columns: 50rem 1fr;
    gap: 10rem;
    min-height: 100%;
    background: var(--interface-bg);
  }

  .search-input {
    grid-column: 1/2;
    align-self: flex-start;
    padding-left: 10rem;
  }

  .ep-loading {
    --ep-loading-state-bg-color: var(--interface-bg);
  }

  .ep-textarea {
    --ep-textarea-border-radius: var(--border-radius--large);
    --ep-textarea-bg-color: var(--interface-surface);
    --ep-textarea-resize: vertical;
    --ep-textarea-min-height: 10rem;
    field-sizing: content;
    pointer-events: all;
  }

  .canned-prompts {
    margin-top: 2rem;
  }

  .canned-prompt-button {
    --ep-button-bg-color: var(--interface-surface);
  }

  .search-container {
    position: fixed;
    top: 10rem;
    left: 30rem;
    max-width: 40rem;
    pointer-events: none;

    .ep-button {
      pointer-events: all;
    }
  }

  .search-results {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-column: 2;
    padding: 10rem 10rem 20rem 10rem;
    padding-left: 0;
    width: calc(100% - 60rem);
  }

  .search-error {
    padding: 3rem;
    border-radius: var(--border-radius--large);
    background: var(--interface-surface);
    max-width: 500px;
    align-self: center;
    border: 1px solid var(--border-color);
    border-left: 5px solid var(--primary-color-up-15-500);

    h2 {
      font-size: var(--font-size--body);
    }

    p {
      margin-bottom: 1rem;
    }
  }
</style>