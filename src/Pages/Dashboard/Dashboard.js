import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        axiosPrivate.get(`https://arcane-reaches-97312.herokuapp.com/users/${user?.email}`).then(res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('accessToken');
                return signOut(auth);
            }
            setUserProfile(res.data);
        });

    }, [user])
    if (loading) {
        return <Loading />
    }
    return (
        <div className='overflow-hidden'>

            <div className="drawer drawer-mobile mt-[100px] container mx-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col mx-auto w-full">



                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80  text-base-content z-10 bg-base-100">
                        {
                            userProfile?.role !== 'admin' ?
                                <>
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='myOrders'>My Orders</Link></li>
                                    <li><Link to='addReview'>Add a review</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='addProduct'>Add a Product</Link></li>
                                    <li><Link to='makeAdmin'>Make an Admin</Link></li>
                                    <li><Link to='manageOrders'>Manage Orders</Link></li>
                                    <li><Link to='manageProducts'>Manage Products</Link></li>
                                </>
                        }
                    </ul>

                </div>

            </div>

        </div>
    );
};


export default Dashboard;