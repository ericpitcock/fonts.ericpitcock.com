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
            @click="$router.push(getFontPathByName(font))"
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
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const store = useStore()

  const getSearchResults = () => store.state.searchResults

  const input = ref('')
  const response = ref('')
  const parsedResponse = ref([])
  const loading = ref(false)
  const googleFonts = store.state.googleFonts

  const sendMessage = async () => {
    if (!input.value) return

    loading.value = true
    response.value = ''
    // Initialize as an empty array to store the font names.
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
      console.log('data', data)
      const raw = data.choices[0].message.content.trim()
      console.log('raw', raw)
      response.value = raw

      try {
        const parsedJSON = JSON.parse(raw)
        // check store.state.googleFonts for the font names
        // if the font name is in the store, add it to the parsedResponse array
        // if it's not in the store, remove it from the parsedResponse array
        store.state.googleFonts.forEach((font) => {
          console.log('checking font', font.family)
          if (parsedJSON.includes(font.family)) {
            parsedResponse.value.push(font.family)
          } else {
            parsedResponse.value = parsedJSON.filter((item) => item !== font.family)
          }
        })
        console.log(parsedResponse.value)



        // parsedResponse.value = JSON.parse(raw)
        // console.log(parsedResponse.value)
        // store.commit('setSearchResults', parsedResponse.value)
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
</script>

<style lang="scss" scoped>
  .search {
    position: relative;
  }
</style>