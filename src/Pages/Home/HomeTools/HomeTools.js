import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { motion } from 'framer-motion';
import HomeToolsCard from './HomeToolsCard';
const HomeTools = () => {
    const homeToolsData = [
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 4

        },
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 5

        },
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 4

        },
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 3

        },
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 4

        },
        {
            img: 'https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png',
            name: 'ElectTool Plus',
            desc: 'Especially Made of carbon fiber. Try this one on your next electronic jobs.',
            minOrder: 100,
            available: 1000,
            price: 100,
            rating: 5

        }
    ]
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font-semi'>Our Electronic Tools</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}

                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    homeToolsData.map(tool => <SwiperSlide><HomeToolsCard tool={tool} /></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default HomeTools;