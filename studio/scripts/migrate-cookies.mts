import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config/sanity/config.json'), 'utf8'),
).authToken

const client = createClient({
  projectId: '6s8gofp5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const imagePath = new URL('../../src/assets/recipes/cookies.png', import.meta.url)

async function run() {
  console.log('Laster opp bilde...')
  const asset = await client.assets.upload('image', readFileSync(imagePath), {
    filename: 'cookies.png',
  })
  console.log('Bilde lastet opp:', asset._id)

  const doc = {
    _id: 'recipe-cookies',
    _type: 'recipe',
    title: "Julie's Chocolate Chip Cookies",
    slug: {_type: 'slug', current: 'cookies'},
    ingress:
      'Seige, gyldne cookies med masse sjokoladebiter – Julies egen favoritt som blir perfekte hver gang.',
    heroImage: {
      _type: 'image',
      asset: {_type: 'reference', _ref: asset._id},
      alt: 'Nybakte chocolate chip cookies med smeltet sjokolade på et stekebrett',
    },
    servings: 20,
    prepTime: '15 min',
    totalTime: '30 min',
    difficulty: 'Enkel',
    category: 'Bakst',
    tags: ['søtt', 'klassiker', 'sjokolade'],
    ingredientGroups: [
      {
        _type: 'group',
        _key: 'gruppe1',
        items: [
          '114 g usaltet smør (mykt)',
          '100 g sukker',
          '110 g brunt sukker',
          '1 egg',
          '1 ts vaniljeekstrakt',
          '1/2 ts salt',
          '1/2 ts natron',
          '160 g hvetemel',
          '175 g sjokoladebiter',
        ],
      },
    ],
    instructions: [
      'Sett ovnen på 175 °C.',
      'Rør sammen smør, sukker og brunt sukker.',
      'Bland inn egget og vaniljen.',
      'Tilsett mel, salt og natron. Rør til alt er blandet.',
      'Vend inn sjokoladebitene.',
      'Lag små kuler og legg dem på et bakepapirkledd stekebrett.',
      'Stek i 10–12 minutter, til kantene er gylne.',
      'La cookiesene hvile på brettet i 5 minutter før de avkjøles.',
    ],
    tips: [
      'De kan se litt myke ut når du tar dem ut av ovnen – det er helt riktig! De blir perfekte når de kjøler seg ned.',
    ],
    publishedAt: '2026-07-09T00:00:00.000Z',
  }

  console.log('Oppretter oppskrift...')
  const created = await client.createOrReplace(doc)
  console.log('Publisert oppskrift:', created._id)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
