import { cn } from '@/utilities/ui'
import React from 'react'
import { Card, CardSolutionData } from '../SolutionsArchive/Card'

export type Props = {
  industries: CardSolutionData[]
}

export const IndustryArchive: React.FC<Props> = (props) => {
  const { industries } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-12">
        {industries.map((result, index) => {
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
}
