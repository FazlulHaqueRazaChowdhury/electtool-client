import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from 'framer-motion';
// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
//import css
import './Banner.css';
const Banner = () => {
    const slideId = [
        {
            id: 'slide1'
        },
        {
            id: 'slide2'
        },
        {
            id: 'slide3'
        },
    ];
    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                pagination={{
                    clickable: true,
                }}

                modules={[EffectFade, Autoplay, Navigation, Pagination]}
                className="mySwiper"
            >
                {
                    slideId.map(slide => <SwiperSlide>
                        {({ isActive }) => (
                            <motion.div id={slide.id} initial={{ opacity: 1, scale: 1 }}
                                animate={{
                                    opacity: isActive ? 1 : 1,
                                    scale: isActive ? 1 : 1,
                                }}>
                                <div className="overlay flex justify-center items-center">
                                    <div className="text-part w-[50%]">
                                        <motion.h1 initial={{ x: '-100vw' }}
                                            animate={{
                                                x: isActive ? 0 : '-100vw'
                                            }}
                                            className="text-7xl font-lily text-white">
                                            Blogs
                                        </motion.h1>
                                    </div>
                                </div>

                            </motion.div>
                        )}
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default Banner;