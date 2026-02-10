import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig, slugField } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'category', type: 'relationship', relationTo: 'categories', filterOptions: {
        type: {
          equals: 'technology'
        }
      }
    },
    slugField()
  ],
}
