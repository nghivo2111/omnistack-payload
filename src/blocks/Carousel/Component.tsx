
import { CarouselBlock as CarouselBlockType } from '@/payload-types'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export type CarouselProps = CarouselBlockType & {
    className?: string
}

export default function Carousel(props: CarouselProps) {
    const { slides, settings, link, subtitle, title } = props;
    if (!slides?.length) return null;
    return (
        <div className='py-8 w-full' style={blockSettingStyle(settings)}>
            <div className={cn('space-y-6 prose md:prose-md w-full max-w-full',{"!container":!settings?.fullWidth})}>
                <div className={cn({"container":settings?.fullWidth})}>
                    {title && <h1 className='text-center'>
                        {title}
                    </h1>}
                    {subtitle && <RichText data={subtitle} />}
                </div>

                <div>
                    {
                        slides.map((slide) => {
                            const {autoPlay, direction, items, slidesPerView} = slide
                            if(!items) return null;
                            if(slidesPerView && items.length < slidesPerView * 2) items.push(...items)
                            return (
                                <div key={slide.id} className="w-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "flex hover:paused justify-around",
                                            direction === 'slide-to-right'
                                                ? 'animate-slide-to-right'
                                                : 'animate-slide-to-left'
                                        )}
                                    >
                                        {items.map((item, index) => (
                                            <div
                                                key={`${item.id}-${index}`}
                                                className="flex-shrink-0"
                                                style={{
                                                    width: `${100 / (slidesPerView || 3)}%`,
                                                }}
                                            >
                                                {item.content && (
                                                    <RichText
                                                        data={item.content}
                                                        className='[&_a>span]:hover:!text-secondary w-max'
                                                        enableGutter={false}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <CMSLink {...link} />
            </div>
        </div>
    )
}
