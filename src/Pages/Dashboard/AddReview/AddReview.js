import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarFill } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
const AddReview = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const [rating, setRating] = useState(1);
    const ratingChanged = (newRating) => {
        setRating(newRating);

    };
    const onSubmit = data => {
        const review = {
            img: user?.photoURL,
            name: data.name,
            email: data.email,
            desc: data.desc,
            rating: rating
        }
        axiosPrivate.post('http://localhost:5000/reviews', review)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                if (res.data.insertedId) {
                    toast.success('Review Added');
                    reset()
                }
            });

    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card mx-auto w-96 min-h-[500px] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mx-auto">Add Review</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' placeholder="Name" value={user?.displayName} className={`input input-bordered ${errors?.name ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("name", {
                                required: 'Name is required'
                            })}

                        />
                        <p className='text-error'>{errors?.name?.type === 'required' ? errors?.name?.message : ''}</p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' value={user?.email} placeholder="Email" className={`input input-bordered ${errors?.email ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Email is not valid'
                                }
                            })}
                        />
                        <label htmlFor='desc'>Description</label>
                        <textarea class="textarea textarea-bordered w-full mt-2" name='desc' placeholder="Your Review" {...register("desc", {
                            required: 'Description is required'
                        })}
                        ></textarea>
                        <p className='text-error'>{errors?.desc && errors.desc.message}</p>
                        <div className="flex flex-col items-center">
                            <h1>Give Your Rating</h1>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={44}
                                activeColor="#FFA500"
                            />
                        </div>

                        <p className='text-error'>{errors?.photoURL?.type === 'required' ? errors?.photoURL?.message : ''}</p>
                        <div className="card-actions justify-center mt-2">
                            <button className="btn btn-primary" type='submit'>Add review</button>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
};

export default AddReview;