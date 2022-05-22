import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import ReviewCard from './ReviewCard';
const Reviews = () => {

    const customerReview = [
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatibus illum non qui! Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' }
    ]
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font-semi'>Whats Our Customer Says</h1>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><ReviewCard /></SwiperSlide>
                <SwiperSlide><ReviewCard /></SwiperSlide>
                <SwiperSlide><ReviewCard /></SwiperSlide>
                <SwiperSlide><ReviewCard /></SwiperSlide>
                <SwiperSlide><ReviewCard /></SwiperSlide>
                <SwiperSlide><ReviewCard /></SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Reviews;