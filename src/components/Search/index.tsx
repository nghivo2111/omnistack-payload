import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Search = ({ value, setValue, width }: { value: string, setValue: (value: string) => void, width?: string }) => {
   const t = useTranslations();
   return (
      <div className='flex gap-4 justify-center items-center rounded-xl p-2.5 mx-auto outline-[#c2c7cc] outline-1 outline-none -outline-offset-1 my-16 focus-within:!outline-secondary/40' style={{ width: width ?? '600px' }} >
         <Image src={"/icons/search.svg"} alt='search' width={16} height={17} />
         <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} aria-label='search' placeholder={t('technology.search')} className='!border-0 !ring-0 focus:!ring-offset-0 text-lg p-0' />
      </div>
   )
}

export default Search