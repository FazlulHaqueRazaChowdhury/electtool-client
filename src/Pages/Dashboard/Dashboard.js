import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='overflow-hidden'>

            <div className="drawer drawer-mobile mt-[100px] container mx-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col mx-auto w-full">



                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label for="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80  text-base-content z-10">

                        <li><Link to='/dashboard'>My Profile</Link></li>
                        <li><Link to='myOrders'>My Orders</Link></li>
                        <li><Link to='addReview'>Add a review</Link></li>
                    </ul>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;