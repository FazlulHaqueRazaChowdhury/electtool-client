import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
const LogIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signInWithEmailAndPassword(email, password);
    };
    console.log(error);
    if (user) {
        navigate('/')
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div class="card mx-auto w-96 h-[500px] bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-3xl mx-auto">Log In</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder="Email" class="input input-bordered w-full max-w-xs" {...register("email")} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder="Password" class="input input-bordered w-full max-w-xs" {...register("password")} />


                        <div class="card-actions justify-center mt-2">
                            <button class="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p>Don't have an account? <Link to='/signUp' className='text-primary underline'>Free Sign Up Here!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;