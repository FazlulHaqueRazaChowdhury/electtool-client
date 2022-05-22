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
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' },
        { img: '', name: 'John Doe', rating: 5, desc: 'Facere necessitatibus libero iure eum sint, laudantium maiores adipisci hic animi nisi, dolore ut nulla rerum perferendis!' }
    ]
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font-semi'>Whats Our Customer Says</h1>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    customerReview.map(review => <SwiperSlide className='mx-auto'><ReviewCard review={review} /></SwiperSlide >)
                }


            </Swiper>
        </div>
    );
};

export default Reviews;