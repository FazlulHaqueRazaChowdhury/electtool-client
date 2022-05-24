import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import { signOut } from 'firebase/auth';

const MakeAdmin = () => {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    useEffect(() => {
        axiosPrivate.get(`http://localhost:5000/users`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                setUsers(res.data);
            })
    }, [id])

    const handleAdmin = id => {
        setId(id);
        axiosPrivate.patch(`http://localhost:5000/makeAdmin/${id}`)
            .then(res => {
                axiosPrivate.get(`http://localhost:5000/users`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        if (res.status === 403 || res.status === 403) {
                            localStorage.removeItem('accessToken');
                            return signOut(auth);
                        }
                        setUsers(res.data);
                    })
            });

    }

    return (
        <div>
            <div>
                <h1>Hey <span className='font-bold'>{user?.displayName}!</span> Make new admin.</h1>
                <div class="overflow-x-auto">
                    <table class="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>ACtions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) =>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.role ? 'Admin' : 'Buyer'}</td>
                                        <td><button onClick={() => {
                                            handleAdmin(user._id)
                                        }} className='btn btn-xs btn-primary' disabled={user?.role === 'admin'}>{user?.role === 'admin' ? 'Admin' : 'Make Admin'}</button></td>

                                    </tr>)
                            }


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;