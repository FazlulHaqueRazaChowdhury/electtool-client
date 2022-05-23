import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from "react-dark-mode-toggle";
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';
import { signOut } from 'firebase/auth';
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
        <header className={`fixed w-full top-0 z-10 ${(location.pathname !== '/' && !dark) && 'text-black'} ease-linear duration-200 ${(nav && dark) && 'bg-base-100 text-white'} ${(nav && !dark) ? 'bg-base-100 text-black' : 'text-white'}`}>
            <motion.div initial={{ y: '-100vh' }} animate={{ y: '0' }} transition={{ delay: .5 }} class="navbar container mx-auto h-[100px]">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>

                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user?.email &&
                                <>
                                    <div class="avatar">
                                        <div class="w-10 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photoURL} alt='user profile' />
                                        </div>

                                    </div>
                                    <h1 className='text-2xl text-black'>{user?.displayName}</h1>
                                </>
                            }
                            {
                                /*
                                For Mobile Devices
                                */
                            }
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/' className='text-black'>HOME</Link></motion.li>

                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/products' className='text-black'>PRODUCTS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/reviews' className='text-black' >REVIEWS</Link></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/blogs' className='text-black' >BLOGS</Link></motion.li>
                            {
                                user?.email ? <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a >Sign Out</a></motion.li> : <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/logIn'>LOGIN</Link></motion.li>
                            }


                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black' >DASHBOARD</a></motion.li>
                        </ul>
                    </div>
                    <a class="btn btn-ghost normal-case text-3xl font-bold"><span className='text-primary'>Elect</span>Tool</a>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        {/* For Desktop Devices */}
                        <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/'>HOME</Link></motion.li>
                        {/* <li tabindex="0">
                            <a>
                                Parent
                                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul class="p-2">
                                <motion.li whileHover={{scale: 1.2, originX:0}}><a>Submenu 1</a></motion.li>
                                <motion.li whileHover={{scale: 1.2, originX:0}}><a>Submenu 2</a></motion.li>
                            </ul>
                        </motion.li> */}
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/products'>PRODUCTS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/reviews'>REVIEWS</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/blogs'>BLOGS</Link></motion.li>
                        {
                            user?.email ? <motion.li whileHover={{ scale: 1.2, originX: 0 }}><button onClick={() => { signOut(auth) }}>Sign Out</button></motion.li> :
                                <motion.li whileHover={{ scale: 1.2, originX: 0 }}><Link to='/logIn'>LOGIN</Link></motion.li>
                        }
                        {
                            user?.email && <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/dashboard'>DASHBOARD</Link></motion.li>
                        }
                    </ul>
                </div>
                <div class="navbar-end gap-x-2">
                    {
                        user?.displayName && <>
                            <div class="avatar hidden lg:block">
                                <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt='user profile' />
                                </div>

                            </div>
                            <h1 className='text-2xl ml-5 hidden lg:block'>{user?.displayName}</h1></>
                    }
                    <DarkModeToggle
                        onChange={setDark}
                        checked={dark}
                        size={80}

                    />

                </div>
            </motion.div>
        </header>
    );
};

export default Header;