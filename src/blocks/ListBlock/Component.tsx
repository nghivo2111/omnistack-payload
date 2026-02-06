import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { IListBlock } from '@/payload-types'
import { blockSettingStyle } from '@/utilities/blockSettingStyle';
import { isColorDark } from '@/utilities/checkColor';
import { cn } from '@/utilities/ui';
import Image from 'next/image';
import React from 'react'

type ListBlockProp = IListBlock & {
	className?: string;
}

const renderIconContent = (iconSize: string, item: NonNullable<IListBlock['items']>[number]['iconContent']) => {
	if (!item) return null;

	const { icon, content } = item

	return (<>
		{icon && typeof icon === 'object' && 'url' in icon && (
			<div className='pt-2'>
				<Image
					alt={typeof icon === 'object' && 'alt' in icon && icon.alt ? icon.alt : ''}
					src={icon.url ?? ''}
					width={parseInt(iconSize) ?? '24'}
					height={parseInt(iconSize) ?? '24'}
				/>
			</div>
		)}
		{content && <div className='flex-1'>
			<RichText data={content} enableGutter={false} />
		</div>}
	</>)
}

const renderStatsHighlight = (item: NonNullable<IListBlock['items']>[number]['statsHighlight'], settings: IListBlock['settings']) => {
	if (!item) return null;

	const { label, value, subLabel } = item


	const bgColor = settings?.bgColor || '#ffffff'
	const darkBg = isColorDark(bgColor) && settings?.bgType !== 'transparent'

	return (
		<div
			className="w-auto flex justify-center"
		>
			<div className='relative flex aspect-square w-40 flex-col items-center justify-center md:w-[12.5rem] lg:w-56'>
				{/* Circular subLabel */}
				{subLabel && (
					<div className="absolute inset-0 animate-spin-slow">
						<svg viewBox="0 0 100 100" className="animate-spin-slow site-paragraph-s md:site-paragraph-m absolute box-border aspect-square overflow-visible p-[0.625em] tracking-[6px] md:font-medium">
							<path id=":R8me4v9t5kq:" fill="none" d="M0,50a50,50 0 1,1 100,0a50,50 0 1,1 -100,0"></path>
							<text className="origin-center">
								<textPath className="fill-neutral-600 text-[0.6em] md:text-[0.75em]" textLength="292" href="#:R8me4v9t5kq:">
									{subLabel}
								</textPath>
							</text>
						</svg>
					</div>
				)}

				{/* Center content */}
				<h3 className={cn("text-2xl md:text-5xl font-bold !my-0 text-black", { "text-white": darkBg })}>
					{value}
				</h3>
				<p className={cn("mt-2 text-xs md:text-base font-medium opacity-80 max-w-28 text-center text-black", { "text-white": darkBg })}>
					{label}
				</p>
			</div>
		</div>
	)
}

const ListBlock = (props: ListBlockProp) => {
	const { className, settings, items, title, subtitle } = props
	return (
		<div className={cn('py-8 block-setting overflow-hidden', className)} style={blockSettingStyle(settings)}>
			<div className='container'>
				{(title || subtitle && subtitle.root.children.length > 0) && (
					<div className=' prose md:prose-md w-full max-w-full mb-16'>
						{title && <h1 className='text-center'>
							{title}
						</h1>}
						{subtitle && <RichText data={subtitle} enableGutter={false} />}
					</div>
				)}
				{items && (
					<div className={cn('grid md:grid-cols-2 gap-6 p-3', {
						"md:grid-cols-1": settings?.layout === '1-cols',
						"md:grid-cols-2": settings?.layout === '2-cols',
						"md:grid-cols-3": settings?.layout === '3-cols',
						"md:grid-cols-4": settings?.layout === '4-cols',
						"grid-cols-1": settings?.type === 'icon-content',
						"grid-cols-2": settings?.type === 'stats-highlight',
					})}>
						{
							items.map((item) => {
								const { iconContent, statsHighlight, id } = item
								if (settings?.type === 'icon-content')
									return (
										<div className='flex gap-4 justify-center' key={id}>
											{renderIconContent(
												settings?.iconSize ?? 'md',
												iconContent
											)}
										</div>
									)
								if (settings?.type === 'stats-highlight')
									return (
										<div className='flex gap-4 items-center justify-center' key={id}>
											{renderStatsHighlight(
												statsHighlight,
												settings
											)}
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