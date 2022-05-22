import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useProducts from '../../hook/useProducts';

const Purchase = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => setProduct(res.data));
    }, [])
    const remainStar = 5 - product?.rating;
    return (
        <div className='bg-base-100 min-h-screen flex items-center'>
            <section class="body-font overflow-hidden mx-auto bg-base-100">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full object-contain object-center rounded " src={product?.img} />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font  tracking-widest">ElectTool</h2>
                            <h1 class=" text-3xl title-font font-medium mb-1">{product?.name}</h1>
                            <div class="flex mb-4">
                                <div class="rating">
                                    {
                                        [...Array(product?.rating || 0).keys()].map(star => <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" checked disabled />)

                                    }
                                    {
                                        [...Array(remainStar || 0).keys()].map(star => <input type="radio" name="rating-2" class="mask mask-star-2 bg-gray-400" disabled />)
                                    }
                                </div>
                                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a class="   ">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-2    ">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-2    ">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p class="leading-relaxed">{product?.desc}</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div class="flex">
                                        <span class="mr-3">Available:</span>
                                        <span className='text-primary'>{product?.available}</span>
                                    </div>

                                    <div class="flex ml-6 items-center">
                                        <span class="mr-3" >Quantity</span>
                                        <input type="number" min={product?.minOrder} max={product?.available} placeholder="Minimum Quantity" defaultValue={product?.minOrder} {...register("quantity", {
                                            required: {
                                                value: true,
                                                message: 'Please select the quantity'
                                            },
                                            min: {
                                                value: parseInt(product?.minOrder),
                                                message: `You have have order minimum ${product?.minOrder} ` // JS only: <p>error message</p> TS only support string
                                            },
                                            max: {
                                                value: parseInt(product?.available),
                                                message: `You can't order than ${product?.available} `
                                            }
                                        })} class={errors?.quantity ? 'input input-bordered input-error w-full max-w-xs' : 'input w-full max-w-xs'} />

                                    </div>

                                </div>

                                <div class="flex">
                                    <span class="title-font font-medium text-2xl">${product?.price}/unit</span>
                                    <button type='submit' class="flex ml-auto bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary disabled:bg-neutral rounded" disabled={errors?.quantity}>Purchase</button>
                                </div>
                                <p className='text-error'>{errors?.quantity?.message}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Purchase;