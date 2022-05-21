import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
//import css
import './Banner.css';
const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Autoplay, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div id="slide1">
                        <div className="overlay"></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div id="slide2">
                        <div className="overlay"></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div id="slide3">
                        <div className="overlay"></div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;