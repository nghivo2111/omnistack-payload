import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

import en from './messages/en.json'
import vi from './messages/vi.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages { }
}

// Cache translation messages per locale to avoid file I/O on every request
// This provides cross-request caching in addition to React's per-request cache
// Each locale is cached separately with a unique key
// const getCachedMessagesForLocale = (locale: string) =>
//   unstable_cache(
//     async () => {
//       return (await import(`./messages/${locale}.json`)).default
//     },
//     [`i18n-messages-${locale}`],
//     {
//       tags: [`i18n-messages-${locale}`],
//       revalidate: false, // Translation files don't change at runtime, cache indefinitely
//     },
//   )

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
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  // Use cached messages to avoid file I/O on every request
  // Cache is per-locale, so each language is cached separately
  // const messages = await getCachedMessagesForLocale(locale)()

  const messages =
    messagesByLocale[locale as keyof typeof messagesByLocale] ??
    messagesByLocale[routing.defaultLocale as keyof typeof messagesByLocale]

  return {
    locale,
    messages,
  }
})
