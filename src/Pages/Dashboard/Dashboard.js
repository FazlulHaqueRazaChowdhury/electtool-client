import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='overflow-hidden'>

            <div class="drawer drawer-mobile mt-[100px] container mx-auto">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col mx-auto w-full">



                    <Outlet />
                </div>

                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content z-10">

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