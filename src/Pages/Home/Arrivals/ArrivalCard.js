import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const ArrivalCard = ({ arrival, bg, smColor }) => {
    const { name, price, img } = arrival;
    const navigate = useNavigate();
    console.log(bg);
    return (
        <button onClick={() => {

            navigate(`/purchase/${arrival?._id}`)
        }
        } className='border-0'>
            <motion.div whileHover={{
                opacity: 0.5
            }} className={`flex flex-col justify-center items-center lg:flex-row  ${bg} border-0 text-white shadow-xl p-[30px] min-h-[300px]`}>

                <div className="card-body text-center border-0">
                    <span className='whitespace-nowrap'>New Arrivals in 2022</span>
                    <h2 className="card-title text-3xl font-bold whitespace-nowrap text-center mx-auto">{name.slice(0, 23)}</h2>

                    <p className='font-bold'>From: ${price}</p>

                </div>
                <figure><img src={img} alt="Album" className='w-[200px]' /></figure>
            </motion.div>


        </button >
    );
};

export default ArrivalCard;