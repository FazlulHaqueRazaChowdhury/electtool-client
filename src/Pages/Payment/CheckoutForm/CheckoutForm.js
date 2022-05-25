import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
const CheckoutForm = ({ order }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transcitionId, setTranscitionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataloading, setdataLoading] = useState(false);
    const [user, userLoading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {

        setdataLoading(true);

        axiosPrivate.post(`https://arcane-reaches-97312.herokuapp.com/create-payment-intent?price=${order.totalPrice}`)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                setClientSecret(res.data.clientSecret);

                setdataLoading(false)
            });
    }, [order])




    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            toast.error(error.message)

        }




        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,

                    },
                },
            },
        );

        if (paymentError) {

            setLoading(false);
            toast.error(paymentError.message)

        }
        else {
            setLoading(true);
            if (paymentIntent.id) {
                setTranscitionId(paymentIntent.id)
                toast.success(`Payment successfull. Payment ID${paymentIntent.id} `)
                const orderUpdate = {
                    orderId: order._id,
                    transcitionId: paymentIntent.id
                }
                axiosPrivate.patch('https://arcane-reaches-97312.herokuapp.com/order', orderUpdate)
                    .then(res => {
                        if (res.status === 401 || res.status === 403) {
                            localStorage.removeItem('accessToken');
                            return signOut(auth);
                        }

                        setLoading(false);
                        navigate('/dashboard/myOrders')
                    })


            }

        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary btn-xs mt-[10px]' type="submit" disabled={!stripe || order?.paid}>
                {order?.paid ? 'Paid' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;