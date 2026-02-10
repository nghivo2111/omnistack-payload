import type { Metadata } from 'next/types'
import { TypedLocale } from 'payload'
import React from 'react'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { queryAllTechnologies, queryCategoryByType, queryPageBySlug } from '@/_data'
import PageClient from './page.client'
import { cn } from '@/utilities/ui'
import Filter from '@/components/Filter'
import { TechnologiesArchive } from '@/components/TechnologiesArchive'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'en' } = await paramsPromise;

  const technologies = await queryAllTechnologies({ locale })

  const categories = await queryCategoryByType({ locale, type: 'technology' })

  const page = await queryPageBySlug({
    slug: 'technologies',
    locale: locale,
  })

  return (
    <div className="pt-20">
      <PageClient />
      {page?.hero && <RenderHero {...page?.hero} />}

      <div className={cn('py-24', { 'py-12 mg:py-20 lg:py-24': page?.hero && page?.hero?.settings?.type === 'mediumImpact' })}>

        <TechnologiesArchive technologies={technologies.docs} categories={categories?.docs} />
      </div>

      {page?.layout && <RenderBlocks blocks={page?.layout} />}

    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'technologies',
    locale: locale,
  })

  return generateMeta({ doc: page, locale })
}
