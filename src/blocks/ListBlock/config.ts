import { settingField } from '@/fields/setting';
import { Block, Field } from 'payload';

const statsHighlight: Field[] = [
	{
		name: 'value',
		type: 'text',
		required: true,
	},
	{
		name: 'label',
		type: 'text',
		required: true,
	},
	{
		name: 'subLabel',
		type: 'text',
		required: false,
	},
]

const iconContent: Field[] = [
	{
		type: 'upload',
		name: 'icon',
		relationTo: 'media',
	},
	{
		type: 'richText',
		name: 'content',
	}
]

export const ListBlock: Block = {
	slug: 'listBlock',
	interfaceName: 'IListBlock',
	fields: [
		settingField({
			overrides: [
				{
					type: 'row',
					fields: [
						{
							type: 'select',
							name: 'layout',
							defaultValue: '2-cols',
							options: [
								{
									label: '1 Columns',
									value: '1-cols'
								},
								{
									label: '2 Columns',
									value: '2-cols'
								},
								{
									label: '3 Columns',
									value: '3-cols'
								},
								{
									label: '4 Columns',
									value: '4-cols'
								}
							],
							admin: {
								description: 'Choose how many columns to show your list: 2 columns, 3 columns, or 4 columns. Pick what fits your content best.',
								width: '50%'
							}
						},
						{
							type: 'select',
							name: 'type',
							defaultValue: 'icon-content',
							options: [
								{
									value: 'icon-content',
									label: 'Icon Content'
								},
								{
									value: 'stats-highlight',
									label: 'Stats Highlight'
								}
							],
							admin: {
								width: '50%',
								description: 'Choose the style for your list: "Icon Content" displays items with icons and text, while "Stats Highlight" shows statistical highlights with numbers or key data.',
							}
						},
						{
							type: 'text',
							name: 'iconSize',
							admin: {
								description: 'Width of the icon in pixels (e.g. 24px, 2rem, ...). Leave blank for 24px.',
								width: '50%',
								condition: (_, siblingData) => siblingData.type === 'icon-content'
							}
						},
					]
				},
			]
		}),
		{
			name: 'title',
			type: 'text',
		},
		{
			name: 'subtitle',
			type: 'richText',
		},
		{
			type: 'array',
			name: 'items',
			fields: [
				{
					type: 'group',
					name: 'iconContent',
					fields: iconContent,
					admin: {
						condition: (_, __, { blockData }) => blockData.settings.type === 'icon-content'
					}
				},
				{
					type: 'group',
					name: 'statsHighlight',
					fields: statsHighlight,
					admin: {
						condition: (_, __, { blockData }) => blockData.settings.type === 'stats-highlight'
					}
				}
			],
		}
	]
}