import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";

const HomeTools = () => {
    return (
        <div className='container mx-auto mb-[100px]'>
            <h1 className='text-4xl font-semi'>Our Electronic Tools</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}


                modules={[Pagination]}
                className="mySwiper"
            >

                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>
                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>
                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>
                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>
                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>
                <SwiperSlide><div className='h-[100%] '><div class="card w-96 bg-base-100">
                    <figure class="px-10 pt-10">
                        <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div></div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default HomeTools;