import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { AiFillDelete } from 'react-icons/ai'
import axiosPrivate from '../../../api/axiosPrivate';
const ManageProduct = () => {
    const [user, loading] = useAuthState(auth);
    const { data: products, refetch, isLoading } = useQuery('products', () => fetch('https://arcane-reaches-97312.herokuapp.com/products').then(res => res.json()));
    if (loading || isLoading) {
        return <Loading />
    }
    const handleDelete = id => {
        axiosPrivate.delete(`https://arcane-reaches-97312.herokuapp.com/products/${id}`)
            .then(res => {
                refetch();
                console.log(res.data);
            })
    }

    return (
        <div>
            <h1>Hey<span className='text-primary font-bold'> {user?.displayName} ! </span>Manage Your Products!</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

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

                                <tr key={product?._id}>
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
            </div >
        </div >
    );
};

export default ManageProduct;