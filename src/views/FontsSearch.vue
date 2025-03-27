<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #main>
      <div class="search">
        <div class="search-input">
          <ep-flex class="flex-col gap-30">
            <h1 class="ui-heading">
              Describe the fonts you’re looking for
            </h1>
            <ep-flex class="flex-col gap-10">
              <ep-textarea
                v-model="input"
                placeholder="Give me some fonts that are clean and modern."
              />
              <ep-button
                label="Search"
                @click="sendMessage"
              />
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
              @click="$router.push({ path: getFontPathByName(font), query: { tab: 'overview', return: $router.currentRoute.value.fullPath } })"
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
  import { onMounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  import FontCard from '@/components/FontCard.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const store = useStore()

  const input = ref('')
  const response = ref('')
  const parsedResponse = ref([])
  const loading = ref(false)
  const googleFonts = store.state.googleFonts

  const router = useRouter()

  const sendMessage = async () => {
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
              content: input.value,
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

        router.push({ query: { results: parsedResponse.value.join(',') } })
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

  const getFontByName = (name) => store.getters.getFontByName(name)
  const getFontPathByName = (name) => store.getters.getFontPathByName(name)

  onMounted(() => {
    const results = router.currentRoute.value.query.results
    if (results) {
      parsedResponse.value = results.split(',')
    }
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
    display: grid;
    grid-template-columns: 50rem 1fr;
    gap: 10rem;
    overflow: hidden;
  }

  .search-input {
    grid-column: 1;
    padding: 10rem;
    padding-right: 0;
  }

  .search-results {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-column: 2;
    overflow: auto;
    padding: 10rem 10rem 20rem 10rem;
    padding-left: 0;
  }
</style>