import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import { TypedLocale } from 'payload'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()
  const headerData: Header = await getCachedGlobal('header', 1, locale)()

  return (
    <FooterClient
      data={footerData}
      icon={headerData.icon && typeof headerData.icon === 'object' ? headerData.icon : undefined}
    />
  )
}
