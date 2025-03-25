<template>
  <div>
    <router-link to="/sans-serif">
      Sans Serif
    </router-link>
    <router-link to="/serif">
      Serif
    </router-link>
    <router-link to="/display">
      Display
    </router-link>
    <router-link to="/monospace">
      Monospace
    </router-link>
    <router-link to="/handwriting">
      Handwriting
    </router-link>
    <textarea
      v-model="input"
      placeholder="Enter your snack or meal..."
    />
    <button @click="sendMessage">
      Search
    </button>

    <div v-if="loading">
      Loading...
    </div>

    <div v-if="parsedResponse.rating !== null">
      <h2>⭐ {{ parsedResponse.rating }} / 5</h2>
      <p>{{ parsedResponse.explanation }}</p>
    </div>

    <div v-else-if="response">
      {{ response }}
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const input = ref('')
  const response = ref('')
  const parsedResponse = ref({ rating: null, explanation: '' })
  const loading = ref(false)

  const sendMessage = async () => {
    if (!input.value) return

    loading.value = true
    response.value = ''
    parsedResponse.value = { rating: null, explanation: '' }

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
                `You are a Google Fonts and typography expert. Your role is to help users find the perfect font from the Google Fonts library based on their natural language descriptions. Use your extensive knowledge of typography—including font classifications (sans-serif, serif, display, monospace, handwriting), design aesthetics, and readability—to provide well-informed and creative recommendations. When responding, explain why the suggested fonts suit the user's description and offer additional insights on usage contexts if needed.`,
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
</script>