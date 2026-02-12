import type { Metadata } from 'next/types'
import { TypedLocale } from 'payload'
import React from 'react'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { queryAllIndustries, queryPageBySlug } from '@/_data'
import PageClient from './page.client'
import { cn } from '@/utilities/ui'
import { IndustryArchive } from '@/components/Industry'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'en' } = await paramsPromise;

  const industries = await queryAllIndustries({ locale })

  const page = await queryPageBySlug({
    slug: 'industries',
    locale: locale,
  })

  return (
    <div className="pt-20">
      <PageClient />
      {page?.hero && <RenderHero {...page?.hero} />}
      <div className={cn('py-12 bg-[#f6f7f8]', { 'pt-12 mg:pt-20 lg:pt-24': page?.hero && page?.hero?.settings?.type === 'mediumImpact' })}>
        <IndustryArchive industries={industries.docs} />
      </div>

      {page?.layout && <RenderBlocks blocks={page?.layout} />}

    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'industries',
    locale: locale,
  })

  return generateMeta({ doc: page, locale })
}
