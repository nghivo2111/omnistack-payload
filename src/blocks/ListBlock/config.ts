import { settingField } from '@/fields/setting';
import { Block } from 'payload';

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
							type: 'text',
							name: 'iconSize',
							admin: {
								description: 'Width of the icon in pixels (e.g. 24px, 2rem, ...). Leave blank for 24px.',
								width: '50%',
							}
						},
						{
							type: 'select',
							name: 'layout',
							defaultValue: '2-cols',
							options: [
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
					]
				}
			]
		}),
		{
			name: 'title',
			type: 'text',
			localized: true
		},
		{
			name: 'subTitle',
			type: 'richText',
			localized: true,
		},
		{
			type: 'array',
			name: 'items',
			fields: [
				{
					type: 'upload',
					name: 'icon',
					relationTo: 'media',
				},
				{
					type: 'richText',
					name: 'content',
				}
			],
			localized: true,
		}
	]
}