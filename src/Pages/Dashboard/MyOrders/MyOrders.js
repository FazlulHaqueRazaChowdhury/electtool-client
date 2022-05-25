
import { signOut } from 'firebase/auth';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';



const MyOrders = () => {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery('products', () => fetch(`https://arcane-reaches-97312.herokuapp.com/orders/${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            return signOut(auth);
        }
        return res.json();

    }))
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
                        axiosPrivate.delete(`https://arcane-reaches-97312.herokuapp.com/orders/${product._id}`)
                            .then(res => {
                                if (res.status === 401 || res.status === 403) {
                                    localStorage.removeItem('accessToken');
                                    return signOut(auth);
                                }
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
            <div className="overflow-x-auto">
                <table className="table w-full">

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
                                <tr key={order?._id}>
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

            </div >
        </div >
    );
};

export default MyOrders;