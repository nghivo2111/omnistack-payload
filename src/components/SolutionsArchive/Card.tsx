'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import type { Solution } from '@/payload-types'
import { useTranslations } from 'next-intl'
import RichText from '../RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type CardSolutionData = Pick<Solution, 'slug' | 'category' | 'title' | 'description'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardSolutionData
  title?: string;

}> = (props) => {
  const t = useTranslations()
  const { className, doc, title: titleFromProps } = props

  const { slug, title, description } = doc || {}

  const titleToUse = titleFromProps || title

  return (
    <article
      className={cn(
        className,
      )}
    >
      {titleToUse && (
        <div className='font-semibold md:font-bold text-lg md:text-3xl'>
          {titleToUse}
        </div>
      )}
      <RichText data={description as DefaultTypedEditorState} />
    </article>
  )
}
