import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { cn } from '@/utilities/ui'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText, settings }) => {
  const { style, className: bgClassName } = blockSettingStyle(settings)
  
  return (
    <div className={cn("py-12 block-setting", bgClassName)} style={style}>
      <div className='container '>
        {richText && <RichText data={richText} enableGutter={false} />}
      </div>
    </div>
  )
}
