'use client'
import { CarouselBlock as CarouselBlockType } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay';
import RichText from '@/components/RichText'

import { Autoplay } from 'swiper/modules';

const SlideClient = ({ slide }: { slide: NonNullable<CarouselBlockType['slides']>[number] }) => {
	const dir = {
		["slide-to-right"]: "ltr",
		["slide-to-left"]: "rtl",
	}
	return (
		<Swiper
			slidesPerView={6}
			spaceBetween={24}
			speed={5000}
			loop={true}
			allowTouchMove={false}
			autoplay={{
				waitForTransition: true,
				delay: 0,
				disableOnInteraction: false,
			}}
			modules={[Autoplay]}
			dir={slide.direction ? dir[slide.direction] : undefined}
			key={slide.id}
		>
			{Array.isArray(slide.items) && slide.items.map((item) => (
				<SwiperSlide key={item.id}>
					{item.content && <RichText data={item.content} />}
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default SlideClient