import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({
  data,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className="md:flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} className=' h-full'>
            <CMSLink
            {...link}
            className={cn(
              'ml-2 p-4 inline-flex h-full items-center font-bold text-primary hover:text-secondary hover:border-b-secondary-foreground border-white border-y-[6px]',
            )}
          />
          </div>
          
        )
      })}
    </nav>
  )
}
