import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import React from 'react';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            width: '100vw',
            height: '500px',
            '--swiper-pagination-color': '#000',
          } as React.CSSProperties
        }
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={title}
              className="w-[600px] h-[500px] object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
