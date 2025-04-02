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
          <ep-loading-state v-if="loading" />
          <template v-if="!loading && parsedResponse.length > 0">
            <font-card
              v-for="(font, index) in parsedResponse"
              :key="index"
              :font="getFontByName(font)"
              @click="onFontCardClick(getFontByName(font))"
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

  import FontCard from '@/components/FontCard.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
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
  const googleFonts = fontsStore.googleFonts

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
    if (!input.value) return

    loading.value = true
    response.value = ''
    parsedResponse.value = []

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                `You are a Google Fonts and typography expert. Your role is to help users find the perfect fonts from the Google Fonts library based on their natural language descriptions. You should return a JSON array containing the names of the best fonts that best suit the user's request. Limit of 10 fonts. Do not include any additional commentary or explanation—only return the JSON array. Do not return an object. Do not include any additional information. Only return font names exactly as they appear in the available google fonts: ${googleFonts.map((font) => font.family).join(', ')}. Do not return "Source Sans Pro" - it's known as "Source Sans 3" now.`,
            },
            {
              role: 'user',
              content: prompt || input.value,
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      const raw = data.choices[0].message.content.trim()
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
      response.value = 'Something went wrong.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const getFontByName = (name) => fontsStore.getFontByName(name)

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
</style>