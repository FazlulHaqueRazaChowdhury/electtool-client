import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import ReviewCard from './ReviewCard';
import axios from 'axios';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
const Reviews = () => {
    const [customerReview, setCustomerReview] = useState([]);

    useEffect(() => {
        axiosPrivate.get('https://arcane-reaches-97312.herokuapp.com/reviews')
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                setCustomerReview(res.data)
            });
    }, [])
    return (
        <div className='container mx-auto' id='review'>
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
                autoplay={{
                    delay: 1500
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper p-[40px]"
            >
                {
                    customerReview.map(review => <SwiperSlide className='mx-auto'><ReviewCard review={review} /></SwiperSlide >)
                }


            </Swiper>
        </div>
    );
};

export default Reviews;