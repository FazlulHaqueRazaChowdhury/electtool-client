import React from 'react';
import { motion } from 'framer-motion';
const ArrivalCard = ({ arrival }) => {
    const { bg, name, price, img } = arrival;

    return (
        <button>
            <motion.div whileHover={{
                scale: 1.1
            }} class={`card lg:card-side ${bg} text-white max-w-[700px] shadow-xl p-[30px]`}>

                <div class="card-body text-center">
                    <span className='whitespace-nowrap'>New Arrivals in 2022</span>
                    <h2 class="card-title text-3xl font-bold whitespace-nowrap text-center mx-auto">{name}</h2>

                    <p className='font-bold'>From: ${price}</p>

                </div>
                <figure><img src={img} alt="Album" /></figure>
            </motion.div>


        </button >
    );
};

export default ArrivalCard;