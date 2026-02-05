'use client'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { LocaleSwitcher } from './LocationSwitcher'
import { cn } from '@/utilities/ui'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  // const [theme, setTheme] = useState<string | null>(null)
  // const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Always show near the top
        setShow(true);
      } else if (currentScrollY > lastScrollY) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // useEffect(() => {
  //   setHeaderTheme(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  // useEffect(() => {
  //   if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headerTheme])

  return (
    <header
      className={cn(
        "fixed w-full z-[9999] transition-opacity duration-300 shadow-none opacity-0",
        { "opacity-100": show },
        { "shadow-lg": lastScrollY >= 50 && show }
      )}
    >
      <Disclosure
        as="nav"
        className="bg-background backdrop-blur"
      >
        {({ open }) => (
          <>
            <div className="relative px-8">
              <div className="relative flex h-20 justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center text-primary font-bold focus:outline-none focus:ring-0">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center md:items-stretch justify-start gap-5">
                  <div
                    className="flex flex-shrink-0 items-center gap-5">
                    <Link href="/">
                      {data.logo && data.icon ? (
                        <>
                          <Media resource={data.logo} className='max-w-[200px] w-full h-full xl:block hidden' />
                          <Media resource={data.icon} className='!max-w-12 w-full h-full block xl:hidden' />
                        </>
                      ) :
                        <>
                          <Logo loading="eager" priority="high" src={"/logo-web.png"} className='xl:block hidden' />
                          <Logo loading="eager" priority="high" src={"/icons/logo_only.webp"} className='!max-w-12 block xl:hidden' />
                        </>
                      }
                    </Link>
                    {pathname && pathname !== '/' && (
                      <p className='border-l-2 border-[#d9dcdf] px-5 text-xl md:text-2xl'>
                        {data.navItems?.find((i) => i.link.url === pathname)?.link.label}
                      </p>
                    )}
                  </div>
                  <div className="hidden w-full lg:flex justify-end ml-auto">
                    <div className="flex">
                      <HeaderNav data={data} />
                      <LocaleSwitcher />
                      <div className="md:flex hidden gap-6 items-center pl-6">
                        <CMSLink {...data.link} />
                        {/* <ThemeSwitcher /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cn(
                'ease-out duration-300 overflow-hidden shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] fixed h-[100vh] top-20 w-full bg-white block overscroll-contain',
                { 'left-0': open },
                { 'left-[100%]': !open },
              )}
            >
              <div className="h-full w-full">
                {data.navItems?.map((item, index) => (
                  <Disclosure.Button
                    key={index}
                    className={"w-full block p-4 pl-8 text-base font-bold text-primary text-left"}
                    onClick={() => router.push(item.link.url || '')}
                  >
                    {item.link.label}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  )
}
