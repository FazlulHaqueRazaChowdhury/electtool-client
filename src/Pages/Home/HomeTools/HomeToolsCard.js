import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const HomeToolsCard = ({ tool }) => {
    const { img, desc, name, price, minOrder, available, rating, _id } = tool;
    let leftStar = 5 - rating;
    const navigate = useNavigate();
    const handleBuyNow = (id) => {
        navigate(`/purchase/${id}`)
    }
    return (

        <div className='h-[100%] '>
            <div className="card lg:w-96 mx-auto">
                <figure className="px-10 pt-10">
                    <motion.img whileHover={{
                        scale: 1.1,
                        rotateZ: '20deg'
                    }} src={img} alt="Shoes" className="rounded-xl h-[304px] object-contain" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p className='h-[50px] overflow-hidden'>{desc.length > 75 ? desc.slice(0, 75) + '....' : desc}</p>
                    <div className="minNquantity flex gap-x-2 text-[14px]">
                        <p>Min Order : <span className='text-primary font-bold'>{minOrder} pieces</span></p>
                        <p>Quantity : <span className='text-primary font-bold'>{available} left</span></p>
                    </div>
                    <div className="rating">
                        {
                            [...Array(rating).keys()].map(star => <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />)

                        }
                        {
                            [...Array(leftStar).keys()].map(star => <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-500" disabled />)
                        }
                    </div>
                    <p className='text-2xl'>${price}/Piece</p>
                    <div className="card-actions">
                        <button className="btn btn-ghost text-2xl" onClick={() => {
                            handleBuyNow(_id)
                        }}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HomeToolsCard;