import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from "react-dark-mode-toggle";
import { Link, useLocation } from 'react-router-dom';
const Header = ({ dark, setDark }) => {
    const [nav, setNavbar] = useState(false);
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
                                /*
                                For Mobile Devices
                                */
                            }
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black'>HOME</a></motion.li>
                            {/* <li tabindex="0">
                                <a class="justify-between">
                                    Parent
                                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul class="p-2">
                                    <motion.li whileHover={{scale: 1.2, originX:0}}><a>Submenu 1</a></motion.li>
                                    <motion.li whileHover={{scale: 1.2, originX:0}}><a>Submenu 2</a></motion.li>
                                </ul>
                            </motion.li> */}
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black'>PRODUCTS</a></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black' >REVIEWS</a></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black' >BLOGS</a></motion.li>
                            <motion.li whileHover={{ scale: 1.2, originX: 0 }}><a className='text-black' >LOGIN</a></motion.li>
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
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/login'>LOGIN</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1, originX: 0 }}><Link to='/dashboard'>DASHBOARD</Link></motion.li>
                    </ul>
                </div>
                <div class="navbar-end">
                    <div class="avatar">
                        <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://api.lorem.space/image/face?hash=3174" />
                        </div>
                    </div>
                    <h1 className='text-2xl ml-5'>Sokina Khanom</h1>
                    <DarkModeToggle
                        onChange={setDark}
                        checked={dark}
                        size={80}
                        className='ml-[10px]'
                    />

                </div>
            </motion.div>
        </header>
    );
};

export default Header;