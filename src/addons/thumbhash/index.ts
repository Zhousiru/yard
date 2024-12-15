import type { CollectionBeforeChangeHook, Field } from 'payload'
import sharp from 'sharp'
import { rgbaToThumbHash } from 'thumbhash'

async function imageToThumbhash(data: Buffer) {
  const image = sharp(data)

  const metadata = await image.metadata()
  if (!metadata.width || !metadata.height) {
    throw new Error('Encountered an image without a width/height')
  }

  const scale = 100 / Math.max(metadata.width, metadata.height)
  const newWidth = Math.round(metadata.width * scale)
  const newHeight = Math.round(metadata.height * scale)

  const rawPixels = await image
    .resize(newWidth, newHeight)
    .ensureAlpha(1)
    .raw()
    .toBuffer()

  const thumbhash = Buffer.from(rgbaToThumbHash(newWidth, newHeight, rawPixels))

  return thumbhash.toString('base64')
}

export function createThumbhashHook() {
  const thumbhashHook: CollectionBeforeChangeHook = async ({ data, req }) => {
    const mimeType: string = data.mimeType ?? ''
    if (!mimeType.startsWith('image/')) {
      return data
    }

    const fileData = req.file?.data
    if (!fileData) {
      return data
    }

    const thumbhash = await imageToThumbhash(fileData)
    return {
      ...data,
      thumbhash,
    }
  }

  return thumbhashHook
}

export function createThumbhashField(): Field {
  return {
    type: 'text',
    name: 'thumbhash',

    admin: {
      readOnly: true,
      placeholder: 'Thumbhash will be generated after save.',
      // FIXME: Hide the thumbhash field.
      // hidden: true
    },
  }
}
