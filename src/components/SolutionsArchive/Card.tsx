'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import React, { Fragment } from 'react'
import type { Post, Solution } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { formatDateTime } from '@/utilities/formatDateTime'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
  const { card } = useClickableCard({})
  const { className, doc, title: titleFromProps } = props

  const { slug, title, description } = doc || {}

  const titleToUse = titleFromProps || title

  return (
    <article
      className={cn(
        className,
      )}
      ref={card.ref}
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
