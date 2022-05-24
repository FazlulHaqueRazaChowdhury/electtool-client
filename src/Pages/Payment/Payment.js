import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_pubbKey);

const Payment = () => {

    const [order, setOrder] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/order/${id}`)
            .then(res => setOrder(res.data));
    }, [])
    return (
        <div>
            <div class="hero min-h-screen w-full">
                <div class="hero-content flex-col lg:flex-row-reverse w-full">
                    <div class="card  bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 className='text-2xl'>Hello <span className='text-primary font-bold'>{order?.name}</span></h3>
                            <h2 class="card-title">You have to pay <span className='text-2xl font-bold text-primary'>{order?.totalPrice}$</span> only</h2>
                            <p>Order Name:<span className='text-2xl font-bold text-primary'> {order?.productName}</span> </p>
                            <p>Quantity:<span className='text-2xl font-bold text-primary'> {order?.orderQuantity} pieces</span> </p>
                            <h2>Address:<span className='text-primary font-semibold'>{order?.address?.street},{order?.address?.city}-{order?.address?.zip},{order?.address?.country}</span></h2>


                        </div>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">

                            <Elements stripe={stripePromise}>
                                <CheckoutForm order={order} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;