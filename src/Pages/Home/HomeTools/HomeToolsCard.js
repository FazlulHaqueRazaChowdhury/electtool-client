import React from 'react';
import { SwiperSlide } from 'swiper/react';

const HomeToolsCard = ({ tool }) => {
    const { img, desc, name, price, minOrder, available } = tool;
    return (

        <div className='h-[100%] '><div class="card lg:w-96 bg-base-100">
            <figure class="px-10 pt-10">
                <img src="https://i.ibb.co/8gRt0FQ/png-multi-tool-46528.png" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{name}</h2>
                <p>{desc}</p>
                <div className="minNquantity flex gap-x-2 text-[14px]">
                    <p>Min Order : <span className='text-primary font-bold'>{minOrder} pieces</span></p>
                    <p>Quantity : <span className='text-primary font-bold'>{available} left</span></p>
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