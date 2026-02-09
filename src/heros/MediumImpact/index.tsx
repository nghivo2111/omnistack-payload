import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'

export const MediumImpactHero: React.FC<Page['hero']> = ({ link, media, richText, settings }) => {
  return (
    <div className="py-12 block-setting" style={blockSettingStyle(settings)}>
      <div className="container flex relative">
        <div className='max-w-full w-full lg:max-w-[60%]'>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          <CMSLink {...link} />
        </div>
        <div className='absolute -bottom-16 2xl:-bottom-32 right-0 z-10 max-w-0 xl:max-w-[40%]'>
          <Media resource={media} />
        </div>
      </div>
    </div>
  )
}
