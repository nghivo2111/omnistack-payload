import { Media as MediaType } from '@/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const Card = ({
  title,
  image,
  description,
}: {
  title: string
  image: number | MediaType
  description: DefaultTypedEditorState
}) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Media resource={image} imgClassName="w-10 h-10" />
      <div className="pt-2">
        <h3 className="text-2xl md:text-3xl font-medium mb-4">{title}</h3>
        <RichText data={description} />
      </div>
    </div>
  )
}

export default Card
