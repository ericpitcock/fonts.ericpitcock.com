<template>
  <fonts-layout class="fonts-grid--no-header-footer">
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #corner>
      <ep-theme-toggle
        class="app-header-button ep-button-var--ghost"
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
                @click="sendMessage"
              >
                Search
              </ep-button>
            </ep-flex>
            <ep-flex class="flex-col gap-10">
              <ep-flex class="canned-prompts flex-col gap-10">
                <ep-button
                  v-for="(button, index) in cannedPrompts"
                  :key="index"
                  class="canned-prompt-button"
                  size="xlarge"
                  @click="runCannedPrompt(button.prompt)"
                >
                  {{ button.label }}
                </ep-button>
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
              @click="sendMessage()"
            >
              Try again
            </ep-button>
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsCardLayout from '@/layouts/FontsCardLayout.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'
  import { useFontsStore } from '@/store/fontsStore'

  const fontsStore = useFontsStore()
  const router = useRouter()
  const route = useRoute()


  const input = ref('')
  const response = ref('')
  const parsedResponse = ref([])
  const loading = ref(false)
  const loadingMessage = ref({ message: '' })
  const error = ref()
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
      // Gemini runs in netlify/functions/font-search.mjs so the API key
      // stays server-side
      const res = await fetch('/api/font-search', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ request: prompt || input.value }),
        signal: abortController.signal,
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || `Font search failed (${res.status})`)
      }

      response.value = JSON.stringify(data.fonts)
      parsedResponse.value.push(...data.fonts)

      router.push({
        query: {
          input: input.value,
          results: parsedResponse.value.join(',')
        }
      })
    } catch (err) {
      console.error(err)

      if (err?.name === 'AbortError' || abortController?.signal?.aborted) {
        error.value = 'The request took too long. The server may be experiencing high demand. Please try again.'
      } else if (err?.message) {
        error.value = err.message
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
    --ep-loading-bg-color: var(--interface-bg);
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
    border-left: 5px solid oklch(from var(--primary-color--500) l c calc(h + 15));

    h2 {
      font-size: var(--font-size--body);
    }

    p {
      margin-bottom: 1rem;
    }
  }
</style>