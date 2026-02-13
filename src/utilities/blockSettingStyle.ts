import { Media } from '@/payload-types'
import { CSSProperties } from 'react'

type Setting = {
  bgType?: ('image' | 'color' | 'transparent' | 'gradient') | null
  bgColor?: string | null
  bgImage?: (number | null) | Media
  bgRepeat?: boolean | null
  bgSize?: ('contain' | 'cover' | 'custom') | null
  bgSizeCustom?: string | null
  bgPosition?: ('center' | 'right' | 'left' | 'top' | 'bottom')[] | null
  bgAttachment?: ('scroll' | 'fixed') | null
  padding?: string | null,
  bgGradient?: string | null,
  maxWidth?: string | null,
  borderRadius?: string | null,
  showOnMobile?: boolean | null,
}

type BlockSettingStyleResult = {
  style: CSSProperties
  className?: string
}

export const blockSettingStyle = (settings?: Setting): BlockSettingStyleResult => {
  const style: CSSProperties = {}
  let className: string | undefined

  if (!settings) return { style }

  if (settings.padding) style.paddingBlock = `${settings.padding}`

  if (settings.maxWidth) {
    style.maxWidth = `${settings.maxWidth}`
    style.margin = 'auto'
  }

  if (settings.borderRadius) {
    style.borderRadius = `${settings.borderRadius}`
  }

  if (settings.bgType === 'transparent') {
    style.background = `transparent`
    return { style }
  }

  if (settings.bgType === 'color') {
    style.backgroundColor = `${settings.bgColor}`
    return { style }
  }

  if (settings.bgType === 'gradient') {
    style.background = `${settings.bgGradient}`
    return { style }
  }

  // Handle showOnMobile only for background images
  if (settings.bgType === 'image') {
    // If showOnMobile is false, hide background image on mobile
    if (settings.showOnMobile === false) {
      className = 'hide-bg-on-mobile'
    }

    style.backgroundRepeat = `${settings.bgRepeat ? 'repeat' : 'no-repeat'}`

    if (settings.bgImage && typeof settings.bgImage === 'object')
      style.backgroundImage = `url(${settings.bgImage.url})`

    if (settings.bgPosition) style.backgroundPosition = `${settings.bgPosition.join(' ')}`

    if (settings.bgSize) {
      if (settings.bgSize !== 'custom') {
        style.backgroundSize = `${settings.bgSize}`
      } else {
        style.backgroundSize = `${settings.bgSizeCustom}`
      }
    }

    if (settings.bgAttachment) style.backgroundAttachment = `${settings.bgAttachment}`
  }

  return { style, className }
}
