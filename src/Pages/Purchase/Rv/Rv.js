import React, { useState } from 'react';

const Rv = () => {
    const [menu, setMenu] = useState(true);
    const [menu1, setMenu1] = useState(false);
    return (
        <div className='container mx-auto'>
            <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
                <div className="flex flex-col justify-start items-start w-full space-y-8">
                    <div className="flex justify-start items-start">
                        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Reviews</p>
                    </div>
                    <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">

                        <div className="flex flex-col md:flex-row justify-between w-full">

                            <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                <div>
                                    <img src="https://i.ibb.co/QcqyrVG/Mask-Group.png" alt="girl-avatar" />
                                </div>
                                <div className="flex flex-col justify-start items-start space-y-2">
                                    <p className="text-base font-medium leading-none text-gray-800">Anna Kendrick</p>
                                    <p className="text-sm leading-none text-gray-600">14 July 2021</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            {
                                [...Array(parseInt(4) || 0).keys()].map((star, index) => <input key={index + 89} type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />)

                            }
                            {
                                [...Array(1).keys()].map((star, index) => <input key={index + 45} type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" disabled />)
                            }
                        </div>
                        <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 py-8">
                            <div className="flex flex-col md:flex-row flex justify-between w-full">

                                <div className="flex flex-row justify-between items-start">
                                    <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800">Comfortable and minimal, just how I like it!</p>
                                    <button onClick={() => setMenu1(!menu1)} className="ml-4 md:hidden">
                                        <svg className={"transform " + (menu1 ? "rotate-180" : "rotate-0")} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 12.5L10 7.5L5 12.5" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rv;