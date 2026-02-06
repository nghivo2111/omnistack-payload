import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { MediaContentProps } from './Component'

const reverseLayout = (fraction: string) => {
  const [a, b] = fraction.split('/').map(Number)
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
    throw new Error('Invalid fraction')
  }
  return `${b - a}/${b}`
}

const MediaContentClient = ({ props }: { props: MediaContentProps }) => {
  const {
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    content,
    enableButtonDirect,
    link,
    settings,
  } = props

  const renderMedia = () => {
    if (media || staticImage)
      return (
        <div
          className={cn(
            'md:w-1/2',
            'md:w-1/3',
            'md:w-1/4',
            'md:w-2/3',
            'md:w-3/4',
            'md:w-2/5',
            'md:w-3/5',
            'w-full',
            [`md:w-${settings?.layout}`],
          )}
          style={{ margin: `${settings?.margin}` }}
        >
          <div className='w-full media-class' style={{ width: `${settings?.width}` }}>
            <Media
              imgClassName={cn(imgClassName)}
              resource={media}
              src={staticImage}
              className="object-contain"
            />
          </div>
        </div>
      )
    return null
  }

  const renderContent = () => {
    if (content)
      return (
        <div
          className={cn(
            {
              container: !disableInnerContainer,
              'mt-6': settings?.layout === 'full',
            },
            [`md:w-${reverseLayout(settings?.layout as string)}`],
            'w-full',
          )}
        >
          <RichText data={content} enableGutter={false} />
          {enableButtonDirect && link && <CMSLink {...link} />}
        </div>
      )
    return null
  }

  const renderLayout = () => {
    if (settings?.alignment === 'contentMedia') {
      return (
        <>
          {renderContent()}
          {renderMedia()}
        </>
      )
    }
    return (
      <>
        {renderMedia()}
        {renderContent()}
      </>
    )
  }
  return (
    <div className={cn(className, 'py-8 block-setting')} style={blockSettingStyle(settings)}>
      <div className={cn('flex flex-col md:flex-row w-full gap-6 justify-between', { container: enableGutter })} style={{ gap: `${settings?.gap}` }}>
        {renderLayout()}
      </div>
    </div>
  )
}

export default MediaContentClient
