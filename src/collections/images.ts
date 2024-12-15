import { CollectionConfig, GenerateImageName, ImageSize } from 'payload'

const generateImageName: GenerateImageName = ({
  originalName,
  sizeName,
  extension,
}) => `${originalName}-${sizeName}.${extension}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defineImageSize(width: number): ImageSize {
  return {
    name: `${width}w`,
    width,
    formatOptions: {
      format: 'avif',
    },
    generateImageName,
  }
}

export const Images: CollectionConfig = {
  slug: 'images',
  upload: {
    staticDir: '.uploads/images',

    // FIXME: `withoutEnlargement` 对于 height 为 undefined 的 item 无效，似乎是 bug，先不做图像优化
    // imageSizes: [
    //   defineImageSize(300),
    //   defineImageSize(600),
    //   defineImageSize(1200),
    //   defineImageSize(2400),
    //   {
    //     name: `full`,
    //     formatOptions: {
    //       format: 'avif',
    //     },
    //     generateImageName,
    //   },
    // ],
    // adminThumbnail: '300w',
    mimeTypes: ['image/*'],

    // FIXME: 有 bug，如果加上这个，那么在 update 别的 fields 的时候，生成的缩略图会被删除
    formatOptions: {
      format: 'avif',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
