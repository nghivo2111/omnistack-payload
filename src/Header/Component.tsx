import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { TypedLocale } from 'payload'

export async function Header({ locale }: { locale: TypedLocale }) {
  const data = await getCachedGlobal('header', 1, locale)();
  // Type assertion required because getCachedGlobal may return union (header|footer).
  // We trust our usage here is safe by slug argument.
  return <HeaderClient data={data as Header} />
}
