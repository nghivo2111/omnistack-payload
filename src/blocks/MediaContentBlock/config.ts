import { link } from '@/fields/link'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { FeatureBlock } from '../FeatureBlock/config'
import { settingField } from '@/fields/setting'

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  fields: [
    settingField({
      overrides: [
        {
          name: 'gap',
          type: "text",
          admin: {
            description: "Space between media and content elements (CSS units, e.g., 24px, 2rem). Default: 24px."
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'alignment',
              type: 'select',
              options: [
                { label: 'Content + Media', value: 'contentMedia' },
                { label: 'Media + Content', value: 'mediaContent' },
              ],
              defaultValue: 'mediaContent',
              admin: {
                width: '50%',
                description:
                  'Choose the order of content and media within this block. "Media + Content" displays the media first, followed by the content; "Content + Media" reverses the order.',
              },
            },
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: '50% - 50%', value: '1/2' },
                { label: '25% - 75%', value: '1/4' },
                { label: '40% - 60%', value: '2/5' },
                { label: '30% - 70%', value: '1/3' },
                { label: '60% - 40%', value: '3/5' },
                { label: '70% - 30%', value: '2/3' },
                { label: '75% - 25%', value: '3/4' },
                { label: '100%', value: 'full' },
              ],
              defaultValue: '1/2',
              admin: {
                width: '50%',
                description:
                  'Select the proportional layout of Content and Media within this block.',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              label: 'Media Setting',
              type: 'collapsible',
              fields: [
                {
                  name: 'margin',
                  type: 'text',
                  admin: {
                    description: 'Margin format: "top right bottom left" (e.g., "16px 24px 16px 24px"). Applies to media. Each value sets margin for one side, in order: top, right, bottom, left.'
                  }
                },
                {
                  name: 'width',
                  type: 'text',
                  admin: {
                    description: 'Width of the media (e.g., "100%", "400px", "40vw"). Accepts any valid CSS width value.',
                  }
                }
              ]
            },
          ]
        }
      ],
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, BlocksFeature({ blocks: [FeatureBlock] })]
        },
      }),
      localized: true,
    },
    {
      type: 'collapsible',
      label: 'Button',
      fields: [
        { name: 'enableButtonDirect', type: 'checkbox' },
        link({
          overrides: {
            admin: {
              condition: (_, sibling) => sibling.enableButtonDirect === true,
            },
            localized: true,
          },
        }),
      ],
    },
  ],
}
