import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_pubbKey);

const Payment = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: order, isLoading, refetch } = useQuery('order', () => fetch(`https://arcane-reaches-97312.herokuapp.com/order/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            return signOut(auth);
        }
        if (res.status === 500) {
            toast.error(res.data.message);
            return navigate('/dashboard/myOrders')
        }
        return res.json();
    }));
    if (isLoading) {
        return <Loading />
    }

    if (order) {
        return (
            <div>
                <div className="hero min-h-screen w-full">
                    <h1 className='text-warning text-4xl text-center'>THIS IS A TEST WEBSITE DO NOT USE YOUR ORIGINAL CREDIT CARD !!!</h1>
                    <div className="hero-content flex-col lg:flex-row-reverse w-full">
                        <div className="card  bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className='text-2xl'>Hello <span className='text-primary font-bold'>{order?.name}</span></h3>
                                <h2 className="card-title">You have to pay <span className='text-2xl font-bold text-primary'>{order?.totalPrice}$</span> only</h2>
                                <p>Order Name:<span className='text-2xl font-bold text-primary'> {order?.productName}</span> </p>
                                <p>Quantity:<span className='text-2xl font-bold text-primary'> {order?.orderQuantity} pieces</span> </p>
                                <h2>Address:<span className='text-primary font-semibold'>{order?.address?.street},{order?.address?.city}-{order?.address?.zip},{order?.address?.country}</span></h2>


                            </div >
                        </div >
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" >
                            <div className="card-body" >

                                <Elements stripe={stripePromise} >
                                    <CheckoutForm order={order} />
                                </Elements >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
};

export default Payment;