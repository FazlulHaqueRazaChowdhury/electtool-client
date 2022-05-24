import axios from 'axios';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';



const MyOrders = () => {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery('products', () => fetch(`http://localhost:5000/orders/${user.email}`).then(res => res.json()))
    const navigate = useNavigate();

    if (loading || isLoading) {
        return <Loading />
    }
    const handleDelete = (product) => {
        confirmAlert({
            title: 'Cancel the order',
            message: `Do you wanna cancel the order ${product?.productName}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:5000/orders/${product._id}`)
                            .then(res => {
                                if (res.data.deletedCount) {
                                    toast.success('Order Cancelled')
                                    return refetch();
                                };
                                toast.error('Something went wrong');
                            });

                    }
                },
                {
                    label: 'No',
                    onClick: ''
                }
            ]
        })
    }
    return (
        <div>
            <h1><span className='text-3xl font-bold'>{user.displayName}</span> Orders</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Quantity</th>
                            <th>ACTIons</th>
                            <th>transcitionId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((order, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{order?.productName}</td>
                                    <td>{order?.totalPrice}</td>
                                    <td>{order?.orderQuantity}</td>
                                    <td className='btn-group'>
                                        <button onClick={() => {
                                            navigate(`/payment/${order._id}`)
                                        }} className='btn btn-success text-white btn-sm' disabled={order?.paid} >{order?.paid ? 'Paid' : 'Pay'}</button>
                                        {
                                            !order?.paid && <button className='btn btn-error text-white btn-sm' onClick={() => {
                                                handleDelete(order)
                                            }}>Delete</button>
                                        }

                                    </td>
                                    <td>{order?.transcitionId}</td>

                                </tr>)
                        }


                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyOrders;