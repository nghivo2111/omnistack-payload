import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ link, media, richText }) => {
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('dark')
  // })

  return (
    <div className="relative overflow-hidden mx-auto sm:px-8 min-h-[70vh] xl:min-h-screen -mb-24 pb-24 md:-mb-52 md:pb-48 lg:pb-60 z-0 bg-neutral-100">
      <div
        className="container py-16 z-30 absolute inset-0 pointer-events-none"
      >
        <div className="relative pointer-events-auto w-full xl:w-[45%]">
          {richText && <RichText className="mb-6 text-center xl:text-left" enableProse data={richText} enableGutter={false} />}
          <CMSLink {...link} wrapClassName='text-center xl:text-left'/>
        </div>
      </div>
      <div className="absolute inset-0 z-10 hidden xl:block">
        <Media
          resource={media}
          imgClassName="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-45% via-70% to-90% from-neutral-100 via-white/80 to-transparent hidden xl:block">       
      </div>
      <div
        className="absolute -bottom-36 -left-[10%] h-72 w-[120%] bg-white md:h-96 lg:-bottom-[500px] lg:h-[800px] z-30"
        style={{
          clipPath: 'ellipse(50% 45% at 50% 50%)',
          WebkitClipPath: 'ellipse(50% 45% at 50% 50%)',
        }}
      ></div>
    </div>
  )
}
