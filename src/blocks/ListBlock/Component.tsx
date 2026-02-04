import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { IListBlock } from '@/payload-types'
import { blockSettingStyle } from '@/utilities/blockSettingStyle';
import { cn } from '@/utilities/ui';
import Image from 'next/image';
import React from 'react'

type ListBlockProp = IListBlock & {
	className?: string;
}

const ListBlock = (props: ListBlockProp) => {
	const { className, settings, items, title, subTitle } = props
	return (
		<div className={cn('py-8 block-setting', className)} style={blockSettingStyle(settings)}>
			<div className='container'>
				<div className=' prose md:prose-md w-full max-w-full mb-16'>
					{title && <h1 className='text-center'>
						{title}
					</h1>}
					{subTitle && <RichText data={subTitle} enableGutter={false} />}
				</div>
				{items && (
					<div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', {
						"md:grid-cols-2": settings?.layout === '2-cols',
						"md:grid-cols-3": settings?.layout === '3-cols',
						"md:grid-cols-4": settings?.layout === '4-cols',
					})}>
						{
							items.map((item) => {
								const { content, icon } = item
								return (
									<div className='flex gap-4' key={item.id}>
										{icon && typeof icon === 'object' && 'url' in icon && (
											<div className='pt-2s'>
												<Image
													alt={typeof icon === 'object' && 'alt' in icon && icon.alt ? icon.alt : ''}
													src={icon.url ?? ''}
													width={parseInt(settings?.iconSize as string) ?? '24'}
													height={parseInt(settings?.iconSize as string) ?? '24'}
												/>
											</div>
										)}
										{content && <RichText data={content} enableGutter={false} />}
									</div>
								)
							})
						}

					</div>
				)}

			</div>
		</div>
	)
}

export default ListBlock