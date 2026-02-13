import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ link, media, richText, settings }) => {
  const { style, className: bgClassName } = blockSettingStyle(settings)
  
  return (
    <div className={cn("py-12 block-setting", bgClassName)} style={style}>
      <div className="container lg:flex relative z-10">
        <div className='max-w-full w-full lg:max-w-[60%]'>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          <CMSLink {...link} />
        </div>
        <div
          className={cn('overflow-hidden h-fit', settings.showMobile ? 'w-full lg:w-1/2 block' : 'hidden lg:block w-1/2')}
          style={{
            borderRadius: settings.mediaBorderRadius ?? undefined,
            width: settings.width ?? undefined,
            margin: settings.margin ?? undefined,
          }}
        >
          <Media resource={media}
            className="object-contain" />
        </div>
      </div>
    </div>
  )
}
