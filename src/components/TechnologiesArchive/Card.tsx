import { cn } from '@/utilities/ui'
import React from 'react'
import type { Technology } from '@/payload-types'
import { Media } from '../Media'

export type CardTechnologyData = Pick<Technology, 'slug' | 'category' | 'title' | 'image'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardTechnologyData
  title?: string;

}> = (props) => {
  const { className, doc, title: titleFromProps } = props

  const { slug, title, image } = doc || {}

  const titleToUse = titleFromProps || title

  return (
    <div
      className={cn(
        className,
        'group cursor-pointer shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden'
      )}
    >
      <Media resource={image} imgClassName='w-[120px] h-[60px] my-4 mx-auto' className='group-hover:scale-[1.2] transition-all' />
      {titleToUse && (
        <div className='font-semibold text-sm py-3 text-center bg-[#f6f7f8] group-hover:bg-black group-hover:text-white transition-all'>
          {titleToUse}
        </div>
      )}
    </div>
  )
}
