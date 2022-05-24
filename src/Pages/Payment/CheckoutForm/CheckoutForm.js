import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../Shared/Loading/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useQuery } from 'react-query';
const CheckoutForm = ({ order }) => {
    console.log(order);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transcitionId, setTranscitionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataloading, setdataLoading] = useState(false);
    const [user, userLoading, error] = useAuthState(auth);
    useEffect(() => {

        setdataLoading(true);

        axios.post(`http://localhost:5000/create-payment-intent?price=${order.totalPrice}`)
            .then(res => {
                setClientSecret(res.data.clientSecret);
                console.log(res.data);
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
            console.log(error);
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
            console.log(paymentError);
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
                axios.patch('http://localhost:5000/order', orderUpdate)
                    .then(res => {
                        setLoading(false);

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
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;