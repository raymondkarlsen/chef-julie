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

const imagePath = new URL('../../src/assets/logo.png', import.meta.url)

async function run() {
  console.log('Laster opp forsidebilde...')
  const asset = await client.assets.upload('image', readFileSync(imagePath), {
    filename: 'logo.png',
  })
  console.log('Bilde lastet opp:', asset._id)

  const doc = {
    _id: 'frontPage',
    _type: 'frontPage',
    heading: 'Jeg heter Julie.',
    intro: 'Jeg elsker å lage mat. Her deler jeg mine beste oppskrifter.',
    image: {
      _type: 'image',
      asset: {_type: 'reference', _ref: asset._id},
      alt: 'Chef Julie',
    },
  }

  console.log('Oppretter forside...')
  const created = await client.createOrReplace(doc)
  console.log('Publisert forside:', created._id)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
