import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from "react-dark-mode-toggle";
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import { signOut } from 'firebase/auth';
import { RiDashboardFill } from 'react-icons/ri'
const Header = ({ dark, setDark }) => {
    const [nav, setNavbar] = useState(false);
    const [user, loading, error] = useAuthState(auth);

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
    const location = useLocation();

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

                            {
                                user?.email &&
                                <>
                                    <div className="avatar">
                                        <div className="w-10 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photoURL} alt='user profile' />
                                        </div>

                                    </div>
                                    <h1 className='text-2xl'>{user?.displayName}</h1>
                                </>
                            }
                            {
                                /*
                                For Mobile Devices
                                */
                            }
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/' className=''>HOME</Link></motion.li>

                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/products' className=''>PRODUCTS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/reviews' className=''>REVIEWS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/blogs' className='' >BLOGS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/portfolio' className='' >PORTFOLIO</Link></motion.li>
                            {
                                user?.email ? <motion.li whileHover={{ scale: 1.2, originX: 0 }}><button onClick={() => {
                                    signOut(auth);
                                    localStorage.removeItem('accessToken');
                                }}>SIGN OUT</button></motion.li> : <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/logIn'>LOGIN</Link></motion.li>
                            }


                            {
                                user?.email && <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/dashboard'>DASHBOARD</Link></motion.li>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-3xl font-bold"><span className='text-primary'>Elect</span>Tool</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {/* For Desktop Devices */}
                        <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/'>HOME</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/products'>PRODUCTS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/reviews'>REVIEWS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/blogs'>BLOGS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/portfolio'>PORTFOLIO</Link></motion.li>
                        {
                            user?.email ? <motion.li whileHover={{ scale: 1.2, originX: 0 }}><button onClick={() => { signOut(auth) }}>SIGN OUT</button></motion.li> :
                                <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/logIn'>LOGIN</Link></motion.li>
                        }
                        {
                            user?.email && <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/dashboard'>DASHBOARD</Link></motion.li>
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-x-2 w-full">
                    {
                        user?.displayName && <>
                            <div className="avatar hidden lg:block">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt='user profile' />
                                </div>

                            </div>
                            <h1 className='text-2xl ml-5 hidden lg:block'>{user?.displayName}</h1></>
                    }
                    <DarkModeToggle
                        onChange={setDark}
                        checked={dark}
                        size={80}
                        className='mr-[30px] lg:mr-[0px]'
                    />
                    {
                        location.pathname.slice(0, 10) === '/dashboard' && <div className="drawer-content flex flex-col items-center justify-center">

                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><RiDashboardFill /></label>

                        </div>
                    }
                </div>
            </motion.div>
        </header >
    );
};

export default Header;