import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

import en from './messages/en.json'
import vi from './messages/vi.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages { }
}

/**
 * Load locales via static imports so JSON is always included in the server bundle.
 * Dynamic `import(\`./messages/${locale}.json\`)` is often omitted from Next.js standalone
 * output tracing and some serverless bundles, which causes MISSING_MESSAGE at runtime in
 * production while local dev still works.
 */
const messagesByLocale = {
  en,
  vi,
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  const messages =
    messagesByLocale[locale as keyof typeof messagesByLocale] ??
    messagesByLocale[routing.defaultLocale as keyof typeof messagesByLocale]

  return {
    locale,
    messages,
  }
})
