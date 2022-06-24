import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import ReviewCard from './ReviewCard';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { Link } from 'react-router-dom';
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
            <div className='flex justify-between'>
                <h1 className='text-4xl font-semi'>Customer Reviews</h1>
                <Link to='/reviews' className='btn btn-outline btn-primary'>SEE MORE</Link>
            </div>

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
                    customerReview.map(review => <SwiperSlide key={review._id} className='mx-auto'><ReviewCard review={review} /></SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default Reviews;