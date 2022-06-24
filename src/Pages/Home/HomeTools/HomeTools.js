import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import HomeToolsCard from './HomeToolsCard';
import useProducts from '../../../hook/useProducts';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const HomeTools = () => {
    const [products, loading] = useProducts(6);
    if (loading) {
        return <Loading />
    }
    return (
        <div className='container mx-auto'>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-semi'>Our Electronic Tools</h1>
                <Link to='/products' className='btn btn-outline btn-primary'>ALL PRODUCTS</Link>
            </div>
            <Swiper
                slidesPerView={4}
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
                    delay: 2500
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    products.map(tool => <SwiperSlide key={tool._id}><HomeToolsCard tool={tool} /></SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default HomeTools;