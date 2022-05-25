import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="footer grid-rows-2 p-10 bg-base-100 ">
                <div className='mx-auto'>
                    <span className="footer-title">React JS</span>
                    <a className="link link-hover">Node Js</a>
                    <a className="link link-hover">Mongo DB</a>
                    <a className="link link-hover">Express JS</a>
                    <a className="link link-hover">Tailwind CSS</a>
                </div>
                <div className='mx-auto'>
                    <span className="footer-title">ElecTool</span>
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/products' className="link link-hover">Products</Link>
                    <Link to='/reviews' className="link link-hover">Reviews</Link>
                    <Link to='/signUp' className="link link-hover">Sign Up</Link>
                </div>
                <div className='mx-auto'>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
                <div className='mx-auto'>
                    <span className="footer-title">Social</span>
                    <a className="link link-hover" href='https://www.facebook.com/fhrcAiman'>Facebook</a>
                    <a href='https://github.com/FazlulHaqueRazaChowdhury' className="link link-hover">Github</a>
                </div>
                <div className='mx-auto'>
                    <span className="footer-title">Special Thanks To</span>
                    <a className="link link-hover">FHRC Aiman (Thats me)</a>
                    <a className="link link-hover">Jhankar Mahbub</a>
                    <a className="link link-hover">Programming Hero</a>
                </div>
                <div className='mx-auto'>
                    <span className="footer-title">My Other Works</span>
                    <a href='https://john-dealership.web.app/' className="link link-hover">John Dealership</a>
                    <a href='https://space-tourism-fhrc.netlify.app/' className="link link-hover">Space Tourism</a>
                    <a href='https://toddlu.netlify.app/' className="link link-hover">Toddlu</a>

                </div>
            </footer>
        </div>
    );
};

export default Footer;