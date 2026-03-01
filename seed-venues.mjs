/**
 * Seed 5 Hong Kong venues into Sanity.
 * Run: SANITY_TOKEN=xxx node seed-venues.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vto6zswf',
  dataset: 'production',
  apiVersion: '2024-02-19',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const venues = [
  {
    _type: 'venue',
    name: 'Yardbird',
    slug: { _type: 'slug', current: 'yardbird' },
    city: 'Hong Kong',
    neighborhood: 'Sheung Wan',
    category: 'restaurant',
    case_for_going: 'The restaurant that made yakitori a serious dining proposition in Asia. No reservations, always packed, worth every minute of the queue. The chicken liver mousse alone justifies the visit.',
    when_to_go: 'Weekday evenings before 7pm to avoid the worst of the wait',
    what_to_order: 'Oyster, heart, and tail skewers. The chicken skin is mandatory. End with the soft serve.',
    insider_note: 'They keep a small number of bar seats that open up mid-service — better odds than queuing from the start.',
    price_range: '$$$',
    tags: ['yakitori', 'japanese', 'no-reservations', 'sheung-wan'],
    featured: true,
  },
  {
    _type: 'venue',
    name: 'The Old Man',
    slug: { _type: 'slug', current: 'the-old-man' },
    city: 'Hong Kong',
    neighborhood: 'Central',
    category: 'bar',
    case_for_going: 'Named Asia\'s Best Bar for good reason. Hemingway-inspired cocktails with a Hong Kong sensibility — serious craft without the attitude.',
    when_to_go: 'Early evening for a seat; after 9pm for the energy',
    what_to_order: 'The Daiquiri variations rotate seasonally. Ask the bartender what\'s new — they always have an answer worth following.',
    insider_note: 'The bar seats facing the open kitchen give you the best view of the operation and the fastest service.',
    price_range: '$$$',
    tags: ['cocktails', 'central', 'award-winning', 'hemingway'],
    featured: true,
  },
  {
    _type: 'venue',
    name: 'Ho Lee Fook',
    slug: { _type: 'slug', current: 'ho-lee-fook' },
    city: 'Hong Kong',
    neighborhood: 'Central',
    category: 'restaurant',
    case_for_going: 'Modern Chinese done with genuine wit. The menu reads like someone who grew up eating dim sum and then spent years in serious Western kitchens — which is exactly what happened.',
    when_to_go: 'Dinner, Wednesday through Saturday when the kitchen is at full energy',
    what_to_order: 'Char siu pork (best in the city), mapo tofu with wagyu, and whatever the seasonal vegetable dish is.',
    insider_note: 'The basement level is quieter and has better lighting — worth asking for when you book.',
    price_range: '$$$',
    tags: ['chinese', 'modern', 'central', 'char-siu'],
    featured: false,
  },
  {
    _type: 'venue',
    name: 'Café Deadend',
    slug: { _type: 'slug', current: 'cafe-deadend' },
    city: 'Hong Kong',
    neighborhood: 'Kennedy Town',
    category: 'cafe',
    case_for_going: 'The neighbourhood café that Kennedy Town needed. Serious single-origin coffee, no-fuss food, and a room that somehow makes working alone feel sociable.',
    when_to_go: 'Weekday mornings before 11am',
    what_to_order: 'The flat white and whatever pastry came in that morning. The egg salad sandwich if it\'s on.',
    insider_note: 'There\'s a small courtyard out back that most people miss — quieter than the main room.',
    price_range: '$',
    tags: ['coffee', 'kennedy-town', 'work-friendly', 'neighbourhood'],
    featured: false,
  },
  {
    _type: 'venue',
    name: 'Honky Tonks',
    slug: { _type: 'slug', current: 'honky-tonks' },
    city: 'Hong Kong',
    neighborhood: 'Wan Chai',
    category: 'bar',
    case_for_going: 'Wan Chai dive bar with a genuinely good whisky list and zero pretension. The antidote to rooftop bars and hotel lobbies.',
    when_to_go: 'Late — after 10pm when the after-work crowd thins and the regulars arrive',
    what_to_order: 'Whatever Japanese whisky is open. They rotate the shelf constantly.',
    insider_note: 'The jukebox is real and the regulars take it seriously. Don\'t play anything ironic.',
    price_range: '$$',
    tags: ['whisky', 'wan-chai', 'dive-bar', 'local'],
    featured: false,
  },
]

async function seed() {
  console.log('Seeding 5 Hong Kong venues...')
  for (const v of venues) {
    try {
      const result = await client.create(v)
      console.log(`✅ ${v.name} → ${result._id}`)
    } catch (e) {
      console.log(`❌ ${v.name}: ${e.message}`)
    }
  }
  console.log('Done.')
}

seed()
