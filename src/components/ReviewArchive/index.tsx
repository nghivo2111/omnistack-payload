'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { Review } from '@/payload-types'
import ReviewCard from './ReviewCard'

const ReviewsArchive = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section>
      <div className="md:container overflow-hidden h-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          speed={1000}
          slidesPerView={1.2}
          navigation={{
            prevEl: '.reviews-prev',
            nextEl: '.reviews-next',
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 8
            },
            1028: {
              slidesPerView: 3,
              spaceBetween: 16
            },
          }}
          className='h-full [&_.swiper-wrapper]:items-stretch'
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className='!h-[inherit] !flex px-2 md:px-4 pt-4 pb-6'>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom arrows */}
        <div className="hidden md:flex justify-center gap-4">
          <button className="reviews-prev h-12 w-12 rounded-full border flex items-center justify-center text-secondary font-bold text-3xl pb-1.5 hover:-translate-x-2 transform duration-200">
            ←
          </button>
          <button className="reviews-next h-12 w-12 rounded-full border flex items-center justify-center text-secondary font-bold text-3xl pb-1.5 hover:translate-x-2 transform duration-200">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReviewsArchive