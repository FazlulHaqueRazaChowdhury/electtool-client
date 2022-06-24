import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from "react-dark-mode-toggle";
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import { signOut } from 'firebase/auth';
import { RiDashboardFill } from 'react-icons/ri'
import { useQuery } from 'react-query';
const Header = ({ dark, setDark }) => {
    const [nav, setNavbar] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [totalPrice, setTotalPrice] = useState(0);
    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true)
        }
        else if (window.scrollY === 0) {
            setNavbar(false)
        }
    }
    useEffect(() => {
        // adding the event when scroll change Logo
        window.addEventListener("scroll", changeBackground)
    })
    const { data: pd, isLoading, refetch } = useQuery('products', () => fetch(`https://arcane-reaches-97312.herokuapp.com/orders/${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            return signOut(auth);
        }
        return res.json();

    }), {
        refetchInterval: 2000
    })


    const [data, setData] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (user?.email) {
            let price = 0;
            pd?.forEach(z => {
                price = price + z.totalPrice;
            })
            setTotalPrice(price);
            let unPaid = pd?.filter(x => x.paid !== true);
            setData(unPaid);
        }
    }, [pd])
    if (loading) {
        return <Loading />
    }

    return (
        <header className={`fixed w-full top-0 z-40 ${(location.pathname !== '/' && !dark) && 'text-black'} ease-linear duration-200 ${(nav && dark) && 'bg-base-100 text-white'} ${(nav && !dark) ? 'bg-base-100 text-black' : 'text-white'}`}>
            <motion.div initial={{ y: '-100vh' }} animate={{ y: '0' }} transition={{ delay: .5 }} className="navbar container mx-auto h-[100px]">
                <div className="navbar-start">

                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>

                        <ul tabIndex="0" className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50  ${dark ? 'text-white' : 'text-black'}`}>

                            <DarkModeToggle
                                onChange={setDark}
                                checked={dark}
                                size={80}
                                className='mr-[30px] lg:mr-[0px] ml-2'
                            />
                            {
                                /*
                                For Mobile Devices
                                */
                            }
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/' className='bg-[transparent]'>HOME</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/products' className='bg-[transparent]'>PRODUCTS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/reviews' className='bg-[transparent]'>REVIEWS</Link></motion.li>

                            {
                                !user?.email &&
                                <>
                                    <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/logIn'>Sign In</Link></motion.li>
                                    <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/signUp'>Start for Free!</Link></motion.li>
                                </>
                            }


                        </ul>

                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-lg md:text-2xl lg:text-3xl font-bold"><span className='text-primary'>Elect</span>Tool</Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal p-0">
                        {/* For Desktop Devices */}
                        <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link className='bg-[transparent]' to='/'>HOME</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link className='bg-[transparent]' to='/products'>TOOLS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link className='bg-[transparent]' to='/reviews'>REVIEWS</Link></motion.li>

                        {
                            !user?.email &&
                            <>
                                <motion.li whileHover={{ scale: 1.2, originX: 0 }} className='bg-primary h-[50px] mt-6 rounded-lg text-white mx-3'><Link to='/logIn'>Sign In</Link></motion.li>
                                <motion.li whileHover={{ scale: 1.2, originX: 0 }} className='bg-secondary h-[50px] mt-6 rounded-lg text-white mx-3'><Link to='/signUp'>Get Started For Free!</Link></motion.li>
                            </>
                        }
                        <li>
                            <div class="mt-3 ml-6">
                                <div class="input-group relative flex  items-stretch w-full mb-4">
                                    <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                    <button class="btn inline-block border-0 px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-secondary hover:shadow-lg   focus:shadow-lg  focus:ring-0active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

                <div className="navbar-end gap-x-2 w-full">
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle">
                            <div class="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span class="badge badge-sm indicator-item">{data?.length && user?.email ? data.length : 0}</span>
                            </div>
                        </label>
                        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div class="card-body">
                                <span class="font-bold text-lg text-primary">{data?.length && user?.email ? data.length : 0} Items</span>
                                <span class="font-bold text-lg text-accent">Subtotal: <span className='text-primary'>{data?.length && user?.email ? totalPrice : 0}</span> $</span>

                                <div class="card-actions">
                                    <Link to='/dashboard/myOrders' class="btn btn-primary btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">

                    </div>
                    {
                        user?.email ? <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-circle">
                                {
                                    user?.displayName && <>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={user?.photoURL} alt='user profile' />
                                            </div>

                                        </div>

                                    </>
                                }
                            </label>
                            <ul tabindex="0" class={`mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ${dark ? 'text-white' : 'text-black'}`}>
                                <motion.li whileHover={{ scale: 1.1, originX: 0 }} className='text-center'>{user?.displayName}</motion.li>
                                <motion.li whileHover={{ scale: 1.1, originX: 0 }}>
                                    {
                                        location.pathname.slice(0, 10) === '/dashboard' &&
                                        <div className="drawer-content">

                                            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">Dashboard</label>

                                        </div>
                                    }
                                </motion.li>
                                {
                                    user?.email && <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/dashboard'>Profile</Link></motion.li>
                                }
                                {
                                    user?.email && <motion.li whileHover={{ scale: 1.1, originX: 0 }}><button onClick={() => {
                                        signOut(auth);
                                        localStorage.removeItem('accessToken');
                                    }}>Log Out</button></motion.li>

                                }
                            </ul>
                        </div> : ''
                    }

                    <DarkModeToggle
                        onChange={setDark}
                        checked={dark}
                        size={80}
                        className='mr-[30px] lg:mr-[0px] hidden lg:block'
                    />



                </div>

            </motion.div>
        </header >
    );
};

export default Header;