
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import Address from './Address';

const ManageOrder = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: orders, refetch, isLoading } = useQuery('orders', () => fetch(`https://arcane-reaches-97312.herokuapp.com/orders`, {
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
        fetch(`https://arcane-reaches-97312.herokuapp.com/orderStatus`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(id)
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('accessToken');
                return signOut(auth);
            }
            return res.json()
        }).then(data => {
            if (data.matchedCount) {
                toast.success('Product is shipped!')
                refetch();
            }
        })
    }
    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <h1>Hey<span className='text-primary font-bold'> {user?.displayName} ! </span>Manage Your Products!</h1>
                <div className="overflow-x-scroll">
                    <table className="table w-full overflow-x-scroll">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>Item Name </th>
                                <th>Item Quantity</th>
                                <th>Item Total Price</th>
                                <th>Address</th>
                                <th>Pay Information</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, index) =>

                                    <tr key={order?._id}>
                                        <th>{index + 1}</th>
                                        <td>{order?.name}</td>
                                        <td>{order?.productName}</td>
                                        <td>{order?.orderQuantity}</td>
                                        <td>{order?.totalPrice}</td>
                                        <td>
                                            <Address address={order?.address} />
                                        </td>
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
            </div >
        </div >
    );
};

export default ManageOrder;