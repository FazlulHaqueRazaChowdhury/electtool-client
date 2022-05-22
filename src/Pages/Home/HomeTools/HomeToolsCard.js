import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
const HomeToolsCard = ({ tool }) => {
    const { img, desc, name, price, minOrder, available, rating } = tool;
    let leftStar = 5 - rating;
    return (

        <div className='h-[100%] '><div class="card lg:w-96 mx-auto">
            <figure class="px-10 pt-10">
                <motion.img whileHover={{
                    scale: 1.1,
                    rotateZ: '20deg'
                }} src={img} alt="Shoes" class="rounded-xl h-[304px] object-contain" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{name}</h2>
                <p className='h-[50px] overflow-hidden'>{desc.length > 75 ? desc.slice(0, 75) + '....' : desc}</p>
                <div className="minNquantity flex gap-x-2 text-[14px]">
                    <p>Min Order : <span className='text-primary font-bold'>{minOrder} pieces</span></p>
                    <p>Quantity : <span className='text-primary font-bold'>{available} left</span></p>
                </div>
                <div class="rating">
                    {
                        [...Array(rating).keys()].map(star => <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked disabled />)

                    }
                    {
                        [...Array(leftStar).keys()].map(star => <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-200" disabled />)
                    }
                </div>
                <p className='text-2xl'>${price}/Piece</p>
                <div class="card-actions">
                    <button class="btn btn-ghost text-2xl">Buy Now</button>
                </div>
            </div>
        </div></div>

    );
};

export default HomeToolsCard;