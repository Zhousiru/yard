import { CollectionConfig, GenerateImageName, ImageSize } from 'payload'
import sharp from 'sharp'

const generateImageName: GenerateImageName = ({
  originalName,
  sizeName,
  extension,
}) => `${originalName}-${sizeName}.${extension}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defineImageSize(
  width: number | undefined,
  format: keyof sharp.FormatEnum | sharp.AvailableFormatInfo,
  name: string = `${width}w`,
): ImageSize {
  return {
    name,
    width,
    formatOptions: {
      format,
    },
    generateImageName,
  }
}

export const Images: CollectionConfig = {
  slug: 'images',
  upload: {
    disableLocalStorage: true,
    // FIXME: `withoutEnlargement` 对于 height 为 undefined 的 item 无效
    // FIXME: 如果加上这个，那么在 update 别的 fields 的时候，生成的缩略图会被删除
    // formatOptions: {
    //   format: 'avif',
    // },
    // imageSizes: [
    //   defineImageSize(16, 'webp', 'lqip'),
    //   defineImageSize(300, 'avif'),
    //   defineImageSize(600, 'avif'),
    //   defineImageSize(1200, 'avif'),
    //   defineImageSize(2400, 'avif'),
    //   defineImageSize(undefined, 'avif', 'original'),
    // ],
    // adminThumbnail: '300w',
    formatOptions: {
      format: 'avif',
    },
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
