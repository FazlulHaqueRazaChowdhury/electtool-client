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
            id: 'slide1',
            title: 'Quality',
            para: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, iure.',
            btn: 'Visit Our Factory',
        },
        {
            id: 'slide2',
            title: 'Best',
            para: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, iure.',
            btn: 'Read It'
        },
        {
            id: 'slide3',
            title: 'In Budget',
            para: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, iure.',
            btn: 'Pricing'
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
                autoplay={{
                    delay: 5500
                }}
                modules={[EffectFade, Autoplay, Navigation, Pagination]}
                className="mySwiper"
            >
                {
                    slideId.map(slide =>
                        <SwiperSlide key={slide.id}>
                            {({ isActive }) => (
                                <motion.div id={slide.id} initial={{ opacity: 1, scale: 1 }}
                                    animate={{
                                        opacity: isActive ? 1 : 1,
                                        scale: isActive ? 1 : 1,
                                    }}>
                                    <div className="overlay flex justify-center items-center">
                                        <div className="text-part container mt-5 ">
                                            <motion.h1 initial={{ x: '-100vw' }}
                                                animate={{
                                                    x: isActive ? 0 : '-100vw'
                                                }}
                                                className="text-7xl font-lily text-white">
                                                {
                                                    slide.title
                                                }
                                            </motion.h1>
                                            <motion.p initial={{ y: '-100vh' }}
                                                animate={{
                                                    y: isActive ? 0 : '-100vh'
                                                }}
                                                transition={{
                                                    delay: .7,
                                                }}
                                                className="text-3xl font-semi text-white  lg:w-[50%] mt-5 ">
                                                {
                                                    slide.para
                                                }
                                            </motion.p>
                                            <motion.button
                                                initial={{ x: '-100vw' }}
                                                animate={{
                                                    x: isActive ? 0 : '-100vw'
                                                }}
                                                transition={{
                                                    delay: .8,
                                                }}

                                                className="btn btn-primary mt-5 w-[200px] h-[10px] font-semi">
                                                {
                                                    slide.btn
                                                }
                                            </motion.button>
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