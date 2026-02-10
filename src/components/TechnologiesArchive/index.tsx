"use client"
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Card, CardTechnologyData } from './Card'
import { Category } from '@/payload-types'
import Filter from '../Filter'
import Search from '../Search'

export type Props = {
  technologies: CardTechnologyData[]
  categories: Category[]
}

export const TechnologiesArchive: React.FC<Props> = ({ technologies, categories }) => {
  const [filter, setFilter] = useState<string>("all")
  const [searchValue, setSearchValue] = useState<string>("")

  const filterData = categories?.map(d => {
    return {
      value: d.slug,
      label: d.title
    }
  })

  // Sort A–Z, safely handling possible null/undefined titles
  const sorted = [...technologies].sort((a, b) =>
    (a.title ?? '').localeCompare(b.title ?? '')
  )

  // Group by first letter
  const grouped = sorted.filter(t => t.title?.toLowerCase().includes(searchValue.toLowerCase())).reduce<Record<string, CardTechnologyData[]>>(
    (acc, tech) => {
      const title = tech.title ?? ''
      const letter = title.charAt(0).toUpperCase() || '#'

      if (!acc[letter]) {
        acc[letter] = []
      }

      acc[letter].push(tech)
      return acc
    },
    {}
  )

  const renderCard = () => {
    if (filter === 'all')
      return (
        Object.entries(grouped).map(([letter, items]) => (
          <div key={letter}>
            {/* Letter header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-lg font-semibold text-gray-500">
                {letter}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {items.map((technology, index) => (
                <div
                  className="border bg-white rounded-2xl animate-came-here repeat-1"
                  key={index}
                >
                  <Card doc={technology} />
                </div>
              ))}
            </div>
          </div>
        )))
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {technologies
          .filter((t) =>
            (t.title?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) &&
            (t.category != null &&
              typeof t.category === 'object' &&
              'slug' in t.category &&
              t.category.slug === filter)
          )
          .map((technology, index) => (
            <div
              className="border bg-white rounded-2xl animate-came-here repeat-1"
              key={index}
            >
              <Card doc={technology} />
            </div>
          ))}
      </div>
    )
  }

  return (
    <>
      <Search value={searchValue} setValue={setSearchValue} />
      <Filter data={filterData} setFilter={setFilter} filter={filter} />
      <div className={cn('container space-y-16 pt-20')}>
        {/* Cards */}
        {renderCard()}
      </div>
    </>
  )
}
