import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig, slugField } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
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
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'category', type: 'relationship', relationTo: 'categories', filterOptions: {
        type: {
          equals: 'service'
        }
      }
    },
    slugField()
  ],
}
