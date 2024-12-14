import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'featured-image',
      type: 'upload',
      relationTo: 'images',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}
