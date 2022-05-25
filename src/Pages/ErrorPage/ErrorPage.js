import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen'>

            <main class="h-screen w-full flex flex-col justify-center items-center bg-base-100">
                <h1 class="text-9xl font-extrabold text-primary tracking-widest">404</h1>
                <div class="bg-error px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <button class="mt-5">
                    <Link
                        to='/'
                        class="relative inline-block text-sm font-medium text-error group active:text-error focus:outline-none focus:ring"
                    >
                        <span
                            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-error group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            <router-link to="/">Go Home</router-link>
                        </span>
                    </Link>
                </button>
            </main>
        </div>
    );
};

export default ErrorPage;