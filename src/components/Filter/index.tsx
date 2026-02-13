import { cn } from '@/utilities/ui';
import { useTranslations } from 'next-intl'
import React from 'react'

const Filter = ({ data, setFilter, filter }: {
   data: {
      value: string;
      label: string;
   }[],
   setFilter: (value: string) => void
   filter: string;
}) => {
   const t = useTranslations();
   return (
      <div className="flex gap-4 justify-start lg:justify-center bg-[#f6f7f8] py-4 max-w-[100vw] overflow-x-auto px-4">
         <div className='font-medium flex items-center text-nowrap'>{t('filter_by')}: </div>
         <div className='flex gap-2'>
            <div className={cn('py-0.5 px-2 bg-[#d9dcdf] rounded-[8px] font-medium hover:bg-secondary/30 cursor-pointer flex items-center text-nowrap', { 'bg-secondary/30': filter === 'all' })}
               onClick={() => setFilter('all')}>{t('all')}</div>
            {data && data.map((d) => (
               <div key={d.value + d.label}
                  className={cn('py-0.5 px-2 bg-[#d9dcdf] rounded-[8px] font-medium hover:bg-secondary/30 cursor-pointer flex items-center text-nowrap', { 'bg-secondary/30': filter === d.value })} onClick={() => setFilter(d.value)}>{d.label}</div>
            ))}
         </div>
      </div>
   )
}

export default Filter