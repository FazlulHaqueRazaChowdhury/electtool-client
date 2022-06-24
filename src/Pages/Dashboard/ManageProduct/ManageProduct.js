import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { AiFillDelete } from 'react-icons/ai'
import axiosPrivate from '../../../api/axiosPrivate';
import { confirmAlert } from 'react-confirm-alert';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
const ManageProduct = () => {
    const [user, loading] = useAuthState(auth);
    const { data: products, refetch, isLoading } = useQuery('products', () => fetch('https://arcane-reaches-97312.herokuapp.com/products').then(res => res.json()));
    if (loading || isLoading) {
        return <Loading />
    }
    const handleDelete = id => {

        confirmAlert({
            title: 'Delete the product',
            message: `Do you wanna delete the product?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axiosPrivate.delete(`https://arcane-reaches-97312.herokuapp.com/products/${id}`)
                            .then(res => {
                                if (res.status === 403 || res.status === 401) {
                                    localStorage.removeItem('accessToken');
                                    return signOut(auth);
                                }
                                if (res.data.deletedCount === 1) {
                                    toast.success('Product has been deleted!');
                                    refetch()
                                }
                            })

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
            <h1>Hey<span className='text-primary font-bold'> {user?.displayName} ! </span>Manage Your Products!</h1>
            <div className="overflow-scroll">
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