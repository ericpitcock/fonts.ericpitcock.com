<template>
  <fonts-layout>
    <template #sidebar>
      <fonts-navigation />
    </template>
    <template #main>
      <div class="search">
        <ep-textarea
          v-model="input"
          placeholder="Give me some fonts that are clean and modern."
        />
        <ep-button
          label="Search"
          @click="sendMessage"
        />

        <ep-loading-state v-if="loading" />

        <template v-if="!loading && parsedResponse.length > 0">
          <font-container
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
    </template>
  </fonts-layout>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'
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
          console.log('checking font', font)
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

  // onmounted check for results query
  // if it exists, set parsedResponse to the query
  onMounted(() => {
    const results = router.currentRoute.value.query.results
    if (results) {
      parsedResponse.value = results.split(',')
    }
  })

  // watch query results
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
    position: relative;
  }
</style>