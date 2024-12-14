import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import computeBlurhash from 'payload-blurhash-plugin'
import sharp from 'sharp'
import { Images } from './collections/images'
import { Posts } from './collections/posts'

export default buildConfig({
  editor: lexicalEditor(),

  collections: [Images, Posts],

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  sharp,

  plugins: [
    computeBlurhash({ collections: ['images'], algorithm: 'thumbhash' }),
  ],
})
