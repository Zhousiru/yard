import { CollectionConfig, TextFieldSingleValidation } from 'payload'

const slugValidator: TextFieldSingleValidation = (v) => {
  return (
    /^[A-Za-z0-9\-]+$/.test(String(v)) ||
    'The slug can only contain numbers, letters, and dashes.'
  )
}

export const Posts: CollectionConfig = {
  slug: 'posts',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: slugValidator,
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
