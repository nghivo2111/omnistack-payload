import type { Footer, Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Link } from '@/i18n/routing'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Media } from '@/components/Media'

export function FooterClient({ data, icon }: { data: Footer, icon?: MediaType }) {
   return (
      <footer
         className="bg-white relative"
         aria-labelledby="footer-heading"
      >
         <h2 id="footer-heading" className="sr-only">
            Footer
         </h2>
         <div className="lg:container !px-0 overflow-hidden lg:after:absolute lg:after:bg-neutral-200 lg:after:inset-0 lg:after:left-[calc(50%+687px)]">
            <div className="lg:flex justify-between gap-6">
               <div className='px-5 lg:px-0 lg:pl-8'>
                  <div className='md:flex items-start gap-10 py-10'>
                     <div
                        className="flex flex-shrink-0 items-center">
                        <Link href={'/'}>
                           {icon ? (
                              <Media resource={icon} className='!max-w-24 w-full h-full' />
                           ) :
                              <Logo loading="eager" priority="high" src={"/icons/logo_only.webp"} className='!max-w-24' />
                           }
                        </Link>
                     </div>
                     <div className="mt-6 grid lg:grid-cols-3 grid-cols-2 lg:col-span-1 lg:mt-0 gap-6">
                        {data.columns?.map((column) => (
                           <div key={column.id}>
                              <div className="text-xl font-bold leading-6 text-gray-900 dark:text-gray-50">
                                 {column.label}
                              </div>
                              <div className="mt-6 space-y-3">
                                 {column.navItems?.map((item) => (
                                    <div key={item.id}>
                                       <CMSLink
                                          {...item.link}
                                          className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900"
                                       />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-[#183b61] md:flex md:items-center md:justify-between pb-10 pt-10">
                     <p className="text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                        {data.copyRight}
                     </p>
                  </div>
               </div>

               <div className="lg:max-w-[386px] py-10 bg-neutral-200 px-5 lg:px-8">
                  <RichText
                     data={data.additionalInformation as DefaultTypedEditorState}
                     className="[&_p]:my-0"
                     enableGutter={false}
                  />
               </div>
            </div>

         </div>
      </footer>
   )
}
