import { CollectionConfig, GenerateImageName, ImageSize } from 'payload'
import sharp from 'sharp'

const generateImageName: GenerateImageName = ({
  originalName,
  sizeName,
  extension,
}) => `${originalName}-${sizeName}.${extension}`

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
    // FIXME: 如果加上这个，那么在 update 别的 fields 的时候，生成的缩略图会被删除，先添加一个 original size workaround
    // formatOptions: {
    //   format: 'avif',
    // },
    imageSizes: [
      defineImageSize(16, 'webp', 'lqip'),
      defineImageSize(300, 'avif'),
      defineImageSize(600, 'avif'),
      defineImageSize(1200, 'avif'),
      defineImageSize(2400, 'avif'),
      defineImageSize(undefined, 'avif', 'original'),
    ],
    adminThumbnail: '300w',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'lqip-preview',
      label: 'LQIP Preview',
      type: 'text',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData['lqip-preview']
          },
        ],
        afterRead: [
          ({ data }) => {
            return JSON.stringify(data?.sizes?.lqip)
          },
        ],
      },
      admin: {
        readOnly: true,
        components: {
          Field: '@/components/admin/lqip-preview-field#LqipPreviewField',
        },
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
}
