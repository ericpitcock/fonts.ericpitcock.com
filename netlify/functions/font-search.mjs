/* eslint-env node */
import { GoogleGenAI, Type } from '@google/genai'

// Gemini runs here rather than in the browser so the API key never reaches
// the client bundle. The prompt is built server-side from the user's request
// alone, so this endpoint can only answer font searches, not proxy arbitrary
// Gemini calls.
const MODEL = 'gemini-3.8-flash'
const MAX_REQUEST_LENGTH = 500
const MAX_RESULTS = 10

const FRIENDLY_API_ERRORS = {
  429: 'Gemini rate limit reached. Wait a minute and try again.',
  503: 'Gemini is overloaded right now. Try again in a moment.',
}

let client = null
let fontFamilies = null

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw Object.assign(
      new Error('Gemini API key is not configured (set GEMINI_API_KEY)'),
      { status: 500 },
    )
  }
  client ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  return client
}

// The same list the app loads, fetched once per warm function instance
const getFontFamilies = async () => {
  if (fontFamilies) return fontFamilies

  const response = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.VITE_GOOGLE_FONTS_API_KEY}`,
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch Google Fonts. Status: ${response.status}`)
  }

  const { items } = await response.json()
  fontFamilies = items.map(font => font.family)
  return fontFamilies
}

const systemInstruction = families => `You are a Google Fonts and typography expert. Your role is to help users find the perfect fonts from the Google Fonts library based on their natural language descriptions. Return the names of the fonts that best suit the user's request, at most ${MAX_RESULTS}. Only return font names exactly as they appear in the available Google Fonts: ${families.join(', ')}. Do not return "Source Sans Pro" - it's known as "Source Sans 3" now.`

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

export default async req => {
  const body = await req.json().catch(() => ({}))
  const request = typeof body.request === 'string' ? body.request.trim() : ''

  if (!request) {
    return json({ error: 'Describe the fonts you are looking for.' }, 400)
  }
  if (request.length > MAX_REQUEST_LENGTH) {
    return json(
      { error: `Keep the request under ${MAX_REQUEST_LENGTH} characters.` },
      400,
    )
  }

  try {
    const families = await getFontFamilies()
    const result = await getClient().models.generateContent({
      model: MODEL,
      contents: request,
      config: {
        systemInstruction: systemInstruction(families),
        responseMimeType: 'application/json',
        responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        abortSignal: req.signal,
      },
    })

    const known = new Set(families)
    const fonts = JSON.parse(result.text)
      .filter(font => known.has(font))
      .slice(0, MAX_RESULTS)

    return json({ fonts })
  } catch (err) {
    console.error(err)
    const status = err.status ?? 500
    return json(
      { error: FRIENDLY_API_ERRORS[status] ?? 'Font search failed. Please try again.' },
      status >= 400 && status < 600 ? status : 500,
    )
  }
}

export const config = {
  path: '/api/font-search',
  method: 'POST',
}
