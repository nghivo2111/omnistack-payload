import type { Field } from 'payload'
import {
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { settingField } from '@/fields/setting'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    settingField({
      overrides: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'lowImpact',
          label: 'Type',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'High Impact',
              value: 'highImpact',
            },
            {
              label: 'Medium Impact',
              value: 'mediumImpact',
            },
            {
              label: 'Low Impact',
              value: 'lowImpact',
            },
          ],
          required: true,
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
                },
                {
                  name: 'showMobile',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show the media on mobile devices.',
                  },
                },
                {
                  name: 'mediaBorderRadius',
                  label: 'Border Radius',
                  type: 'text',
                  admin: {
                    description: 'Border radius of the media (e.g., "16px", "2rem", "50%"). Rounds the corners of the media.',
                  }
                }
              ]
            },
          ],
          admin: {
            condition: (_, siblingData) => { return siblingData?.type === 'mediumImpact' },
          }
        }
      ]
    }),
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      label: false,
      localized: true,
    },
    link({
      overrides: {
        localized: true,
        required: false,
        admin: {
          condition: (_, siblingData) => ['highImpact', 'mediumImpact'].includes(siblingData.settings.type),
        }
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, siblingData) => ['highImpact', 'mediumImpact'].includes(siblingData.settings.type),
      },
      relationTo: 'media',
      required: true,
      localized: true,
    },
  ],
  label: false,
}
