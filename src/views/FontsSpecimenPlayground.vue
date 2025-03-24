<template>
  <ep-flex class="fonts-specimen-playground flex-col gap-40">
    <fonts-text-sample
      element="h1"
      :font="font"
      :text="article.headline"
      :initial-size="48"
      initial-weight="400"
    />
    <fonts-text-sample
      element="h3"
      :font="font"
      :text="article.byline"
      :initial-size="48"
      initial-weight="400"
    />
    <fonts-text-sample
      element="p"
      :font="font"
      :text="article.lead"
      :initial-size="20"
      initial-weight="400"
    />
    <fonts-text-sample
      element="p"
      :font="font"
      :text="article.body"
      :initial-size="16"
      initial-weight="400"
    />
    <fonts-text-sample
      element="blockquote"
      :font="font"
      :text="article.quotes[0]"
      :initial-size="20"
      initial-weight="400"
      italic
    />
    <fonts-text-sample
      element="p"
      :font="font"
      :text="article.supportingInformation"
      :initial-size="16"
      initial-weight="400"
    />
    <fonts-text-sample
      element="p"
      :font="font"
      :text="article.conclusion"
      :initial-size="16"
      initial-weight="400"
    />
  </ep-flex>
</template>

<script setup>
  import { faker } from '@faker-js/faker'

  import FontsTextSample from '@/components/samples/FontsTextSample.vue'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const articles = [
    {
      headline: "The Power of Typeface: How Fonts Influence Perception",
      byline: "By Steve Samsonite",
      lead: "Fonts are more than just design choices—they subtly guide how we perceive information. From trustworthiness to urgency, typography has the power to shape our thoughts before we even read the words.",
      body: "Typography plays a crucial role in communication design. Studies have shown that certain fonts, like serif typefaces, are often perceived as more trustworthy, while sans-serifs can feel more modern and clean. Designers carefully choose fonts to evoke the right emotional tone. For example, brands like The New York Times use traditional typefaces to signal authority and reliability.",
      quotes: [
        "'Typography is the voice of the written word,' says Sarah Hyndman, author of *Why Fonts Matter*."
      ],
      supportingInformation: "A 2012 MIT study found that fonts can influence reader retention and engagement, with some fonts improving reading speed by up to 20%.",
      conclusion: "Typography isn't just aesthetic—it's strategic. Understanding the emotional and psychological impact of typefaces can elevate any piece of communication."
    },
    {
      headline: "Kerning: The Hidden Art Behind Beautiful Type",
      byline: "By Steve Samsonite",
      lead: "To the untrained eye, kerning might seem like a minor detail. But to typographers, it’s an art form—one that separates amateur design from professional polish.",
      body: "Kerning is the process of adjusting the space between individual letter pairs to achieve visually pleasing and readable text. Without proper kerning, words can look uneven or distracting. Tools like Adobe Illustrator and Figma allow designers to manually tweak kerning to perfection.",
      quotes: [
        "'Bad kerning is like a bad handshake—it creates an immediate negative impression,' notes type designer Tobias Frere-Jones."
      ],
      supportingInformation: "Many famous logos—like Coca-Cola and Google—have undergone extensive kerning refinements to achieve their iconic looks.",
      conclusion: "Paying attention to kerning ensures clarity and elegance, making a world of difference in how text is received."
    },
    {
      headline: "Why Web Typography Matters More Than Ever",
      byline: "By Sarah Sandoval",
      lead: "In a digital-first world, web typography has become a crucial component of user experience. It's no longer just about how it looks—it's about how it reads, responds, and renders across devices.",
      body: "Responsive typography adapts to screen size and user preferences, ensuring accessibility and legibility. Modern CSS features like `clamp()` and variable fonts allow designers to scale type fluidly. Google's Core Web Vitals now also take font loading into account when ranking websites.",
      quotes: [
        "'Good web typography is invisible—it simply works,' says Jen Simmons, web standards advocate at Apple."
      ],
      supportingInformation: "According to a 2023 Nielsen Norman Group report, typography is the top factor influencing online readability and time-on-page.",
      conclusion: "Investing in smart, flexible web typography improves both design and performance—two pillars of a great user experience."
    },
    {
      headline: "The Comeback of Variable Fonts",
      byline: "By Sarah Sandoval",
      lead: "After years of limited adoption, variable fonts are making a strong comeback—offering flexibility, speed, and expressive possibilities in a single font file.",
      body: "Variable fonts allow designers to adjust weight, width, and slant without loading multiple font files. This reduces page load times and gives designers more creative freedom. They're now supported in all major browsers and are featured prominently in Google Fonts.",
      quotes: [
        "'Variable fonts are the future of digital typography,' says Jason Pamental, typography consultant and speaker."
      ],
      supportingInformation: "One variable font can replace 8–10 static font files, cutting load times by up to 30%, according to Google Fonts engineering."
      ,
      conclusion: "As performance and creativity become top priorities, variable fonts are proving to be the next big leap in web design."
    },
    {
      headline: "How to Choose the Right Font for Your Project",
      byline: "By Jason Johnson",
      lead: "With thousands of fonts available, choosing the right one can be overwhelming. But making an intentional choice can elevate your entire project.",
      body: "The key to selecting the right font is to align it with your message and audience. Serif fonts work well for long-form reading, while sans-serifs are better for UI. Display fonts should be used sparingly for emphasis. Tools like Fontpair and Google Fonts make it easy to find complementary font combinations.",
      quotes: [
        "'Type should reinforce the tone of your message, not distract from it,' says Ellen Lupton, author and curator of contemporary design."
      ],
      supportingInformation: "A 2021 Adobe survey found that 73% of creatives say font choice directly affects how their work is perceived.",
      conclusion: "Choosing a font isn't just about looks—it's about function and feeling. Get it right, and your message speaks louder."
    }
  ]

  const article = faker.helpers.arrayElement(articles)
</script>

<style lang="scss" scoped>
  .fonts-specimen-playground {
    padding-bottom: 10rem;
  }
</style>