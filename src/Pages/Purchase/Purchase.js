import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useProducts from '../../hook/useProducts';

const Purchase = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });

    const onSubmit = data => {

    };
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => {
                setProduct(res.data);
            });

    }, [])
    const watchQuantity = watch("quantity", parseInt(product?.minOrder));


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
                                        <input type="number" min={product?.minOrder} max={product?.available} placeholder="Minimum Quantity" defaultValue={product?.minOrder}

                                            {...register("quantity", {
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
                                <div class="leading-loose">

                                    <p class="font-medium">Customer information</p>
                                    <div class="">
                                        <label class="block text-sm " for="cus_name">Name</label>
                                        <input class="w-full px-5 py-1 input input-bordered rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Your Name" aria-label="Name" />
                                    </div>
                                    <div class="mt-2">
                                        <label class="block text-sm" for="cus_email">Email</label>
                                        <input class="w-full px-5  py-4 input input-bordered rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Your Email" aria-label="Email" />
                                    </div>
                                    <div class="mt-2">
                                        <label class=" block text-sm " for="cus_email">Address</label>
                                        <input class="w-full px-2 py-2 input input-bordered  rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Street" aria-label="Email" />
                                    </div>
                                    <div class="mt-2">

                                        <input class="w-full px-2 py-2 input input-bordered  rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="City" aria-label="Email" />
                                    </div>
                                    <div class="inline-block mt-2 w-1/2 pr-1">

                                        <input class="w-full px-2 py-2 input input-bordered rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Country" aria-label="Email" />
                                    </div>
                                    <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">

                                        <input class="w-full px-2 py-2 input input-bordered rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Zip" aria-label="Email" />
                                    </div>

                                </div>
                                <div class="mt-[10px]">
                                    <p>Per Unit Price: <span className='text-primary font-bold text-2xl'>{product?.price}</span></p>
                                    <p>Total Price: <span className='text-primary font-bold text-2xl'>{isNaN(parseInt(product?.price) * parseInt(watchQuantity)) ? 'Please give a value in quantity' : errors?.quantity ? 'Please check available product or minimum order!' : parseInt(product?.price) * parseInt(watchQuantity)}</span></p>
                                    <button type='submit' class="flex ml-auto bg-primary  py-2 px-6  hover:bg-secondary disabled:bg-neutral rounded" disabled={parseInt(watchQuantity) < parseInt(product?.minOrder) || parseInt(watchQuantity) > parseInt(product?.available)}>Purchase</button>
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