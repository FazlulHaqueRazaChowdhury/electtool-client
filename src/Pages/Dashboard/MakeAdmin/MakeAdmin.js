import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import Loading from '../../Shared/Loading/Loading';

const MakeAdmin = () => {
    const [user, loading] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    useEffect(() => {
        axiosPrivate.get(`https://arcane-reaches-97312.herokuapp.com/users`, {
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
        axiosPrivate.patch(`https://arcane-reaches-97312.herokuapp.com/makeAdmin/${id}`)
            .then(res => {
                axiosPrivate.get(`https://arcane-reaches-97312.herokuapp.com/users`, {
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
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <h1>Hey <span className='font-bold'>{user?.displayName}!</span> Make new admin.</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">

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
                                    <tr key={user?._id}>
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
            </div >
        </div >
    );
};

export default MakeAdmin;