import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { FcGoogle } from 'react-icons/fc'
const LogIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let location = useLocation();
    const navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";
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
        navigate(from, { replace: true });
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div class="card mx-auto w-96 h-[500px] bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-3xl mx-auto">Log In</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder="Email" class={`input input-bordered ${errors?.email ? 'input-error' : ''} w-full max-w-xs`} {...register("email", {
                            required: 'Email is required'
                        })} />
                        <p className='text-error'>{errors?.email?.type === 'required' ? errors?.email?.message : ''}</p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder="Password" class={`input input-bordered ${errors?.password ? 'input-error' : ''} w-full max-w-xs`} {...register("password", {
                            required: 'Password is required',

                        })} />

                        <p className='text-error'>{errors?.password?.type === 'required' ? errors?.password?.message : ''}</p>

                        <div class="card-actions justify-center mt-2">
                            <button class="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <span >Don't have an account? <Link to='/signUp' className='text-primary underline'>Free Sign Up Here!</Link></span>
                    <div class="divider">OR</div>
                    <button class="btn btn-ghost gap-2">
                        <FcGoogle className='text-2xl' />
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;