
import { CarouselBlock as CarouselBlockType } from '@/payload-types'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import SlideAutoPlayInfinite from './SlideAutoPlayInfinite'

export type CarouselProps = CarouselBlockType & {
	className?: string
}

export default function Carousel(props: CarouselProps) {
	const { slides, settings, link, subtitle, title } = props;
	if (!slides?.length) return null;
	const { style, className: bgClassName } = blockSettingStyle(settings)
	
	return (
		<div className={cn('py-8 w-full', bgClassName)} style={style}>
			<div className={cn('space-y-6 prose md:prose-md w-full max-w-full', { "!container": !settings?.fullWidth })}>
				<div className={cn({ "container": settings?.fullWidth })}>
					{title && <h1 className='text-center'>
						{title}
					</h1>}
					{subtitle && <RichText data={subtitle} />}
				</div>
				<div>
					{
						slides.map((slide) => {
							const { direction, items, slidesPerViewM, slidesPerViewD } = slide
							if (!items) return null;

							if (settings?.type === 'content') {
								return (
									<SlideAutoPlayInfinite
										key={slide.id}
										direction={direction || 'slide-to-left'}
										items={items}
										slidesPerViewMobile={slidesPerViewM || 3}
										slidesPerViewDesktop={slidesPerViewD || 3}
									/>
								)
							}
							return <></>
						})
					}
				</div>
				<CMSLink {...link} />
			</div>
		</div>
	)
}
