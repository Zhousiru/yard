import { collections } from '@/collections'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

export default buildConfig({
  editor: lexicalEditor(),

  collections,

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  sharp,

  plugins: [],

  typescript: {
    outputFile: path.resolve(__dirname, './src/payload-types.ts'),
  },
})
