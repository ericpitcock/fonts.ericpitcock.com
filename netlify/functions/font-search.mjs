/* eslint-env node */
import { GoogleGenAI, Type } from '@google/genai'

// Gemini runs here rather than in the browser so the API key never reaches
// the client bundle. The prompt is built server-side from the user's request
// alone, so this endpoint can only answer font searches, not proxy arbitrary
// Gemini calls.
const MODEL = 'gemini-3.8-flash'
const MAX_REQUEST_LENGTH = 500
const MAX_RESULTS = 10
// Ask for a few spares: names Gemini gets wrong are filtered out below
const MAX_CANDIDATES = 15

// Browsers always send Origin on a cross-origin or POST fetch, so this turns
// away other sites calling the endpoint from their pages. It is not auth —
// a script can forge the header — which is what the rate limit is for.
const ALLOWED_ORIGINS = [
  'https://fonts.ericpitcock.com',
  'http://localhost:5179',
]
const NETLIFY_PREVIEW = /^https:\/\/([a-z0-9-]+--)?adoring-kalam-ac16eb\.netlify\.app$/

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

// The same list the app loads, fetched once per warm function instance. It
// only checks Gemini's answers; it is not sent to Gemini, where all ~1,900
// names cost thousands of input tokens on every search.
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

const systemInstruction = `You are a Google Fonts and typography expert. Your role is to help users find the perfect fonts from the Google Fonts library based on their natural language descriptions. Return the names of the Google Fonts that best suit the user's request, best match first, at most ${MAX_CANDIDATES}. Use each family's exact name as it appears on Google Fonts. Do not return "Source Sans Pro" - it's known as "Source Sans 3" now.`

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const isAllowedOrigin = origin =>
  ALLOWED_ORIGINS.includes(origin) || NETLIFY_PREVIEW.test(origin ?? '')

export default async req => {
  if (!isAllowedOrigin(req.headers.get('origin'))) {
    return json({ error: 'Forbidden' }, 403)
  }

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
        systemInstruction,
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
  // Netlify enforces this before the function runs, so a blocked request
  // never reaches Gemini. 10 searches a minute per visitor is far above what
  // a person typing does.
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}
