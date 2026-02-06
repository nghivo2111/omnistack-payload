import { useParams, useSearchParams } from 'next/navigation'
import React, { useTransition } from 'react'
import localization from '@/i18n/localization'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/utilities/ui'

export const LocaleSwitcher = () => {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace({ pathname, query }, { locale: value, scroll: false })
    })
  }

  return (
    <div className="my-auto">
      {localization.locales
        .sort((a, b) => a.code.localeCompare(b.code))
        .map((i) => (
          <button
            type="button"
            className={cn(
              params.locale === i.code && 'pointer-events-none hidden',
              'ml-2 uppercase font-bold p-4 text-primary hover:text-secondary',
            )}
            onClick={() => onSelectChange(i.code as TypedLocale)}
            key={i.code}
          >
            {i.code}
          </button>
        ))}
    </div>
  )
}
