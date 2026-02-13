import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { blockSettingStyle } from '@/utilities/blockSettingStyle'
import { cn } from '@/utilities/ui'
import { FeatureProps } from './Component'

const FeatureClient = ({ props }: { props: FeatureProps }) => {
  const { items, className, settings } = props
  const { style, className: bgClassName } = blockSettingStyle(settings)
  
  return (
    <div className={cn(className, 'py-8 block-setting', bgClassName)} style={style}>
      <div
        className={cn(
          ' container grid grid-cols-2 gap-x-8 gap-y-12',
          'md:grid-cols-3',
          'md:grid-cols-5',
          'md:grid-cols-4',
          { [`md:grid-cols-${settings?.layout?.slice(0, 1)}`]: settings?.layout },
        )}
      >
        {items?.map((item) => (
          <div
            key={item.id}>
            {item.media && <Media resource={item.media} imgClassName="mx-auto" />}
            {item.content && <RichText data={item.content} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureClient
