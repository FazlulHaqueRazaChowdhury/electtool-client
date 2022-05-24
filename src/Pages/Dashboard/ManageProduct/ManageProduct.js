import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { AiFillDelete } from 'react-icons/ai'
import axiosPrivate from '../../../api/axiosPrivate';
const ManageProduct = () => {
    const [user, loading, error] = useAuthState(auth);
    const { data: products, refetch, productError, isLoading } = useQuery('products', () => fetch('http://localhost:5000/products').then(res => res.json()));
    if (loading || isLoading) {
        return <Loading />
    }
    const handleDelete = id => {
        axiosPrivate.delete(`http://localhost:5000/products/${id}`)
            .then(res => {
                refetch();
                console.log(res.data);
            })
    }

    return (
        <div>
            <h1>Hey<span className='text-primary font-bold'> {user?.displayName} ! </span>Manage Your Products!</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Name</th>
                            <th>Item Available </th>
                            <th>Item Minimum Quantity</th>
                            <th>Item Ratings</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, index) =>

                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{product?.name}</td>
                                    <td>{product?.available}</td>
                                    <td>{product?.minOrder}</td>
                                    <td>{product?.rating}</td>
                                    <td><button className='btn btn-error' onClick={() => { handleDelete(product?._id) }}><AiFillDelete /></button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;