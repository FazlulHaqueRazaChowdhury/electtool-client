
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading/Loading';
import UpdateUser from '../UpdateUser/UpdateUser';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery(['users', user], () => fetch(`https://arcane-reaches-97312.herokuapp.com/users/${user?.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            <Navigate to='/logIn' state={{ from: '/' }} replace />
            return signOut(auth);
        }
        return res.json();
    }))
    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div className="flex">
            <div className="card w-full bg-base-100 shadow-xl mx-auto">
                <div className="avatar p-[20px] mt-[30px]">
                    <div className="w-24 mx-auto  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={data?.photoURL} alt='user profile' />
                    </div>
                </div>
                <div className="card-body">
                    <h1 className='text-2xl text-primary'>User Details:</h1>
                    <h2>Role: <span className='text-xl font-bold'>{data?.role === 'admin' ? 'Admin' : 'Buyer'}</span></h2>
                    <h2>Name: <span className='text-xl font-bold'>{data?.name}</span></h2>
                    <h2>Email: <span className='text-xl font-bold'>{data?.email}</span></h2>
                    <h2>Phone No: <span className='text-xl font-bold'>{data?.phone ? data?.phone : 'No Phone Number'}</span></h2>
                    <h1 className='text-2xl text-primary'>Address:</h1>
                    <h2>Street: <span className='text-xl font-bold'>{data?.street ? data?.street : 'No Street Added'}</span></h2>
                    <h2>City: <span className='text-xl font-bold'>{data?.city ? data?.city : 'No City Added'}</span></h2>
                    <h2>Country: <span className='text-xl font-bold'>{data?.country ? data?.country : 'No Country Added'}</span></h2>
                    <p></p>
                    <div className="card-actions justify-center ">
                        <label htmlFor="my-modal-3" className="btn btn-primary text-white modal-button">Update User Information</label>

                    </div>
                </div>

            </div>
            <UpdateUser user={data} refetch={refetch} />
        </div>
    );
};

export default MyProfile;