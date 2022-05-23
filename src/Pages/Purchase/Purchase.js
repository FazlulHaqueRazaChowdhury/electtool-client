import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useProducts from '../../hook/useProducts';
import Loading from '../Shared/Loading/Loading';

const Purchase = () => {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState({});
    const [productLoading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });


    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => {

                setProduct(res.data);
                setLoading(false);
            });

    }, [id])

    const onSubmit = data => {
        const userInformation = {
            photoURL: user.photoURL,
            name: data.name,
            email: data.email,
            street: data.street,
            city: data.city,
            country: data.country,
            zip: data.zip,
            phone: data.phone,
        }
        const orderinformation = {
            name: data.name,
            email: data.email,
            address: {
                street: data.street,
                city: data.city,
                country: data.country,
                zip: data.zip,
            },
            productName: product.name,
            productID: product._id,
            orderQuantity: watchQuantity,
            remainingAvailable: parseInt(product.available) - parseInt(watchQuantity),
            totalPrice: parseInt(watchQuantity) * parseInt(product.price),
            paid: false
        }
        axios.patch(`http://localhost:5000/users/${user?.email}`, userInformation)
            .then(res => {
                if (res.data.matchedCount === 1) {
                    axios.post(`http://localhost:5000/orders`, orderinformation)
                        .then(res => {

                            if (res.data.success) {
                                toast.success(res.data.message)
                            }
                            else {
                                toast.error(res.data.message)
                            }
                        });
                }
            });

    };


    const watchQuantity = watch("quantity", parseInt(product?.minOrder));
    const remainStar = 5 - product?.rating;
    console.log(product);

    if (loading || productLoading) {
        return <Loading />
    }
    return (
        <div className='bg-base-100 min-h-screen flex items-center'>
            <section className="body-font overflow-hidden mx-auto bg-base-100">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full object-contain object-center rounded " src={product?.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font  tracking-widest">ElectTool</h2>
                            <h1 className=" text-3xl title-font font-medium mb-1">{product?.name}</h1>
                            <div className="flex mb-4">
                                <div className="rating">
                                    {
                                        [...Array(product?.rating || 0).keys()].map(star => <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />)

                                    }
                                    {
                                        [...Array(remainStar || 0).keys()].map(star => <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" disabled />)
                                    }
                                </div>

                            </div>
                            <p className="leading-relaxed">{product?.desc}</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div className="flex">
                                        <span className="mr-3 text-sm">Available:</span>
                                        <span className='text-primary'>{parseInt(product?.available) - watchQuantity < 0 ? 'Not avaible' : parseInt(product?.minOrder) > parseInt(watchQuantity) ? `Minimum Order is ${product?.minOrder}` : parseInt(product?.available) - watchQuantity}</span>
                                    </div>

                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3 text-sm" >Quantity</span>
                                        <input type="number" min={product?.minOrder} max={product?.available} defaultValue={`${product?.minOrder}`}
                                            className={errors?.quantity ? 'input input-bordered input-error w-full' : 'input input-bordered w-full'}
                                            {...register("quantity", {
                                                required: {
                                                    value: true,
                                                    message: 'Please select the quantity'
                                                },
                                                min: {
                                                    value: product?.minOrder,
                                                    message: `You have have order minimum ${product?.minOrder} ` // JS only: <p>error message</p> TS only support string
                                                },
                                                max: {
                                                    value: product?.available,
                                                    message: `You can't order than ${product?.available} `
                                                }
                                            })} />

                                    </div>

                                </div>
                                <div className="leading-loose">

                                    <p className="font-medium">Customer information</p>
                                    <div >
                                        <label className="block text-sm " for="cus_name">Name</label>
                                        <input className="w-full px-5 py-1 input input-bordered rounded" type="text" placeholder="Your Name" aria-label="Name" value={user?.displayName} {...register("name", {
                                            required: 'Name is required',

                                        })} />

                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm" for="cus_email">Email</label>
                                        <input className="w-full px-5  py-4 input input-bordered rounded" type="email" placeholder="Your Email" aria-label="Email" value={user?.email} {...register("email", {
                                            required: 'Email is required',

                                        })} />
                                    </div>
                                    <div className="mt-2">

                                        <input className="w-full px-2 py-2 input input-bordered  rounded" type="number" placeholder="Phone" {...register("phone", {
                                            required: 'Phone Number is required',

                                        })} />
                                        <p className='text-error'>{errors?.phone?.type === 'required' ? errors?.phone?.message : ''}</p>
                                    </div>
                                    <div className="mt-2">
                                        <label className=" block text-sm " for="cus_email">Address</label>
                                        <input className="w-full px-2 py-2 input input-bordered  rounded" type="text" placeholder="Street" {...register("street", {
                                            required: 'Address is required',

                                        })} />
                                        <p className='text-error'>{errors?.street?.type === 'required' ? errors?.street?.message : ''}</p>
                                    </div>
                                    <div className="mt-2">

                                        <input className="w-full px-2 py-2 input input-bordered  rounded" type="text" placeholder="City"
                                            {...register("city", {
                                                required: 'City is required',

                                            })}
                                        />
                                        <p className='text-error'>{errors?.city?.type === 'required' ? errors?.city?.message : ''}</p>
                                    </div>
                                    <div className="inline-block mt-2 w-1/2 pr-1">

                                        <input className="w-full px-2 py-2 input input-bordered rounded" placeholder="Country"
                                            {...register("country", {
                                                required: 'Password is required',

                                            })}
                                        />
                                        <p className='text-error'>{errors?.country?.type === 'required' ? errors?.country?.message : ''}</p>
                                    </div>
                                    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">

                                        <input placeholder='ZIP' className="w-full px-2 py-2 input input-bordered rounded" type="text"
                                            {...register("zip", {
                                                required: 'Zip is required',

                                            })} />
                                        <p className='text-error'>{errors?.zip?.type === 'required' ? errors?.zip?.message : ''}</p>
                                    </div>

                                </div>
                                <div className="mt-[10px]">
                                    <p>Per Unit Price: <span className='text-primary font-bold text-2xl'>{product?.price}</span></p>
                                    <p>Total Price: <span className='text-primary font-bold text-2xl'>{isNaN(parseInt(product?.price) * parseInt(watchQuantity)) ? 'Please give a value in quantity' : errors?.quantity ? 'Please check available product or minimum order!' : parseInt(product?.available) < parseInt(watchQuantity) ? 'Not available' : parseInt(product?.minOrder) > parseInt(watchQuantity) ? 'Please check minimum order' : parseInt(product?.price) * parseInt(watchQuantity)}</span></p>

                                    <button type='submit' className="flex ml-auto bg-primary  py-2 px-6  hover:bg-secondary disabled:bg-neutral rounded" disabled={parseInt(watchQuantity) < parseInt(product?.minOrder) || parseInt(watchQuantity) > parseInt(product?.available)}>Purchase</button>
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