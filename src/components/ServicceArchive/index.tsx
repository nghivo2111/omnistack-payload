'use client'

import { Service } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Card from './Card'
import { useTranslations } from 'next-intl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function ServicesArchive({ services }: { services: Service[] }) {
  const t = useTranslations()
  return (
    <div className="container px-5 sm:px-8">

      <div className="lg:grid-cols-3 lgS:gap-y-12 lg:gap-x-8 md:grid-cols-2 grid grid-cols-1 gap-8">
          {services.map((service) => (
              <div key={service.id}>
                <Card
                image={service.icon}
                description={service.description as DefaultTypedEditorState}
                title={service.title}         
              />
              </div>
            ))}
      </div>
    </div>
  )
}
