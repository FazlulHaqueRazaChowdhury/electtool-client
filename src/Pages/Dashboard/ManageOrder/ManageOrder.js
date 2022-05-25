import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const ManageOrder = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: orders, refetch, isLoading } = useQuery('orders', () => fetch(`http://localhost:5000/orders`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            signOut(auth);
            return navigate('/logIn');
        }
        return res.json();
    }))
    const handleShip = _id => {
        const id = { id: _id };
        fetch(`http://localhost:5000/orderStatus`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(id)
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            refetch();
        })
    }
    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <h1>Hey<span className='text-primary font-bold'> {user?.displayName} ! </span>Manage Your Products!</h1>
                <div class="overflow-x-auto">
                    <table class="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>Item Name </th>
                                <th>Item Quantity</th>
                                <th>Item Total Price</th>
                                <th>Pay Information</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, index) =>

                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{order?.name}</td>
                                        <td>{order?.productName}</td>
                                        <td>{order?.orderQuantity}</td>
                                        <td>{order?.totalPrice}</td>
                                        <td>{(order?.paid && order?.status === 'shipped') ? 'Shipped' : order?.paid ? 'Pending' : 'Unpaid'}</td>
                                        <td><button className='btn btn-success' disabled={!order?.paid || order?.status === 'shipped'} onClick={() => {
                                            handleShip(order._id);
                                        }}>Ship</button></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;