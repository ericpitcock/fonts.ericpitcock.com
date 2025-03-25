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

        <div v-if="parsedResponse !== null">
          <font-container
            v-for="(font, index) in parsedResponse"
            :key="index"
            :font="getFontByName(font)"
            @click="$router.push(getFontPathByName(font))"
          />
        </div>

        <div v-else-if="response">
          {{ response }}
        </div>
      </div>
    </template>
  </fonts-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  import FontContainer from '@/components/FontContainer.vue'
  import FontsNavigation from '@/components/FontsNavigation.vue'
  import FontsLayout from '@/layouts/FontsLayout.vue'

  const input = ref('')
  const response = ref('')
  const parsedResponse = ref([])
  const loading = ref(false)

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
                `You are a Google Fonts and typography expert. Your role is to help users find the perfect fonts from the Google Fonts library based on their natural language descriptions. You should return a JSON array containing the names of the best fonts that best suit the user's request. Limit of 10 fonts. Do not include any additional commentary or explanation—only return the JSON array.`,
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
        parsedResponse.value = JSON.parse(raw)
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

  const store = useStore()

  const getFontByName = (name) => store.getters.getFontByName(name)
  const getFontPathByName = (name) => store.getters.getFontPathByName(name)
</script>