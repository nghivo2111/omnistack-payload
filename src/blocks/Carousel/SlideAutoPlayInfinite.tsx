import RichText from '@/components/RichText'
import { CarouselBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'

const SlideAutoPlayInfinite = ({
   slidesPerViewMobile = 1, slidesPerViewDesktop = 3, items, direction
}: {
   slidesPerViewMobile?: number, slidesPerViewDesktop?: number, items: NonNullable<NonNullable<CarouselBlock['slides']>[number]['items']>, direction?: 'slide-to-right' | 'slide-to-left'
}) => {

   if (slidesPerViewDesktop && items.length < slidesPerViewDesktop * 2) items.push(...items)
   return (
      <div className="w-full overflow-hidden">
         <div
            className={cn(
               "flex hover:paused justify-around",
               direction === 'slide-to-right'
                  ? 'animate-slide-to-right'
                  : 'animate-slide-to-left'
            )}
         >
            {items.map((item, index) => (
               <Fragment key={`${item.id}-${index}`}>
                  <div
                     className="block md:hidden flex-shrink-0"
                     style={{
                        width: `${100 / (slidesPerViewMobile)}%`,
                     }}
                  >
                     {item.content && (
                        <RichText
                           data={item.content}
                           className='[&_a_span]:hover:!text-secondary w-max'
                           enableGutter={false}
                        />
                     )}
                  </div>
                  <div
                     key={`${item.id}-${index}`}
                     className="hidden md:block flex-shrink-0"
                     style={{
                        width: `${100 / (slidesPerViewDesktop)}%`,
                     }}
                  >
                     {item.content && (
                        <RichText
                           data={item.content}
                           className='[&_a_span]:hover:!text-secondary w-max'
                           enableGutter={false}
                        />
                     )}
                  </div>
               </Fragment>
            ))}
         </div>
      </div>
   )
}

export default SlideAutoPlayInfinite