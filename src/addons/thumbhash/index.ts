import type { CollectionBeforeChangeHook, Field } from 'payload'
import sharp from 'sharp'
import { rgbaToThumbHash } from 'thumbhash'

async function imageToThumbHash(data: Buffer) {
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

  const thumbHash = Buffer.from(rgbaToThumbHash(newWidth, newHeight, rawPixels))

  return thumbHash.toString('base64')
}

export function createThumbHashHook() {
  const thumbHashHook: CollectionBeforeChangeHook = async ({ data, req }) => {
    const mimeType: string = data.mimeType ?? ''
    if (!mimeType.startsWith('image/')) {
      return data
    }

    const fileData = req.file?.data
    if (!fileData) {
      return data
    }

    const thumbhash = await imageToThumbHash(fileData)
    return {
      ...data,
      thumbhash,
    }
  }

  return thumbHashHook
}

export function createThumbHashField(): Field {
  return {
    type: 'text',
    name: 'thumbhash',
    label: 'ThumbHash',

    admin: {
      readOnly: true,
      placeholder: 'ThumbHash will be generated after save.',
      components: {
        Field: '@/components/admin/thumbhash-field#ThumbHashField',
      },
      disableListColumn: true,
      disableListFilter: true,
    },
  }
}
