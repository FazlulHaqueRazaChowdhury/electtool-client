import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import DeleteOrder from '../DeleteOrder/DeleteOrder';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery('products', () => fetch(`http://localhost:5000/orders/${user.email}`).then(res => res.json()))
    console.log(data)
    if (loading) {
        return <Loading />
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
                                        <button className='btn btn-success text-white btn-sm' disabled={order?.paid}>Pay</button>
                                        <label for="my-modal-4" class="btn btn-error text-white btn-sm modal-button">Cancel</label>

                                    </td>

                                </tr>)
                        }


                    </tbody>
                </table>
                <DeleteOrder refetch={refetch} data={data} />
            </div>
        </div>
    );
};

export default MyOrders;