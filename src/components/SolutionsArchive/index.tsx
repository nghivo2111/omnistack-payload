import { cn } from '@/utilities/ui'
import React from 'react'
import { Category } from '@/payload-types'
import { Media } from '../Media'
import { Card, CardSolutionData } from './Card'

export type Props = {
  categories?: Category[]
  solutions: CardSolutionData[]
}

export const SolutionsArchive: React.FC<Props> = (props) => {
  const { solutions, categories } = props

  return (
    <div className={cn('container')}>
      {categories?.map(category => {
        const solutionsFiltered = solutions?.filter((solution) => typeof solution.category === 'object' &&
          solution.category !== null &&
          'slug' in solution.category &&
          category.slug === (solution.category as Category)?.slug)
        if (solutionsFiltered.length > 0)
          return (
            <div key={category.id + '-category-solution'} className='mt-[4rem] md:mt-[7.5rem] first:mt-0'>
              <Media resource={category.icon} size='40px' imgClassName='w-10 h-10' />

              <h2 className='md:mb-12 mb-6 !font-semibold text-[32px] md:text-[40px] lg:text-[48px]'>{category.title}</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-12">
                {solutionsFiltered.map((result, index) => {
                  if (typeof result === 'object' && result !== null) {
                    return (
                      <div className="col-span-4 border rounded-xl p-6 bg-white" key={index}>
                        <Card className="h-full" doc={result} />
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>

          )
        return <></>
      })}

    </div>
  )
}
