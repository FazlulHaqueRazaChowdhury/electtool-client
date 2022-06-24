
import { signOut } from 'firebase/auth';

import React from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const UpdateUser = ({ user, refetch }) => {
    const [users, loading] = useAuthState(auth);
    const [updateProfile, updating, error] = useUpdateProfile(auth);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    const onSubmit = async data => {
        const userInformation = {
            photoURL: data.photoURL,
            name: data.name,
            email: users.email,
            street: data.street,
            city: data.city,
            country: data.country,
            zip: data.zip,
            phone: data.phone,
        }

        await updateProfile({ displayName: data.name, photoURL: userInformation.photoURL });
        axiosPrivate.patch(`https://arcane-reaches-97312.herokuapp.com/users/${users?.email}`, userInformation)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                if (res.data.matchedCount === 1) {

                    refetch()
                    return toast.success('Profile Updated')
                }
                toast.error('Something went wrong')
            })

    }
    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative z-50">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Your User Profile</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div >
                            <label className="block text-sm " htmlFor="cus_name">Name</label>
                            <input className="w-full px-5 py-1 input input-bordered rounded" type="text" placeholder="Your Name" aria-label="Name" defaultValue={user?.name} {...register("name")} />

                        </div>

                        <div className="mt-2">
                            <label className=" block text-sm " htmlFor="phone">Phone No</label>
                            <input defaultValue={user?.phone} name='phone' className="w-full px-2 py-2 input input-bordered  rounded" type="number" placeholder="Phone" {...register("phone")} />



                        </div>
                        <label className=" block text-sm " htmlFor="img">Img URL</label>
                        <input type='text' defaultValue={user?.photoURL && user?.photoURL} name='img' className='input input-bordered mt-2 w-full' {...register('photoURL')}></input>
                        <div className="mt-2">
                            <label className=" block text-sm " htmlFor="cus_email">Address</label>
                            <input defaultValue={user?.street} className="w-full px-2 py-2 input input-bordered  rounded" type="text" placeholder="Street" {...register("street")} />

                        </div>
                        <div className="mt-2">

                            <input defaultValue={user?.city} className="w-full px-2 py-2 input input-bordered  rounded" type="text" placeholder="City"
                                {...register("city")}
                            />

                        </div>
                        <div className="inline-block mt-2 w-1/2 pr-1">

                            <input defaultValue={user?.country} className="w-full px-2 py-2 input input-bordered rounded" placeholder="Country"
                                {...register("country")}
                            />

                        </div>
                        <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">

                            <input defaultValue={user?.zip} className="w-full px-2 py-2 input input-bordered rounded" placeholder='ZIP' type="text"
                                {...register("zip")} />

                        </div>
                        <button className='w-full btn btn-primary mt-5'>Update</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateUser;