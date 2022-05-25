import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import { async } from '@firebase/util';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
const LogIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(
        auth
    );
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
    const handleReset = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        await sendPasswordResetEmail(email);
        toast.success('Password Reset Email Sent')
    }

    useEffect(() => {
        if (user) {
            const information = {
                photoURL: user.user.photoURL,
                name: user.user.displayName,
                email: user.user.email,

            }
            axiosPrivate.put(`https://arcane-reaches-97312.herokuapp.com/users/${user?.user.email}`, information)
                .then(res => {

                    localStorage.setItem('accessToken', res.data.token);
                    navigate(from, { replace: true });
                });



        }
    }, [user])
    useEffect(() => {
        if (googleUser) {
            const information = {
                photoURL: googleUser.user.photoURL,
                name: googleUser.user.displayName,
                email: googleUser.user.email,

            }
            axiosPrivate.put(`https://arcane-reaches-97312.herokuapp.com/users/${googleUser?.user.email}`, information)
                .then(res => {

                    localStorage.setItem('accessToken', res.data.token);
                    navigate(from, { replace: true })
                });



        }
    }, [googleUser])


    useEffect(() => {
        if (error) {

            switch (error?.code) {
                case 'auth/email-already-in-use':
                    toast.error('Email already in use')
                    break;
                case 'auth/invalid-email':
                    toast.error('Email is not valid')
                    break;
                case 'auth/invalid-password':
                    toast.error('Password is not valid')
                    break;
                case 'auth/wrong-password':
                    toast.error('Email and password did not matched.')
                    break;
                case 'auth/user-not-found':
                    toast.error('This email user does not exists')
                    break;
                default:
                    toast.error('Something Went Wrong.');
                    break;
            }

        }
    }, [error])
    useEffect(() => {
        if (googleError) {
            switch (googleError?.code) {
                case 'auth/email-already-in-use':
                    toast.error('Email already in use')
                    break;

                default:
                    toast.error('Something went wrong');
                    break;

            }
        }
    }, [googleError])

    if (sending) {
        return <Loading />
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card mx-auto w-96  bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mx-auto">Log In</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder="Email" className={`input input-bordered ${errors?.email ? 'input-error' : ''} w-full max-w-xs`} {...register("email", {
                            required: 'Email is required'
                        })} />
                        <p className='text-error'>{errors?.email?.type === 'required' ? errors?.email?.message : ''}</p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder="Password" className={`input input-bordered ${errors?.password ? 'input-error' : ''} w-full max-w-xs`} {...register("password", {
                            required: 'Password is required',

                        })} />

                        <p className='text-error'>{errors?.password?.type === 'required' ? errors?.password?.message : ''}</p>

                        <div className="card-actions justify-center mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <span >Don't have an account? <Link to='/signUp' className='text-primary underline'>Free Sign Up Here!</Link></span>
                    <div className="collapse p-[0px]">
                        <input type="checkbox" className="peer padding-0px" />
                        <div className="collapse-title padding-0px">
                            <span>Forgot your password? <button className='text-primary underline'>Reset Your password</button></span>
                        </div>
                        <div className="collapse-content">
                            <form onSubmit={handleReset}>
                                <input type="email" name='email' placeholder="Your Email" className="input input-bordered w-full max-w-xs " required />
                                <button type='submit' className='btn btn-primary mt-3'>Send Reset Password</button>
                            </form>
                        </div>
                    </div>

                    <div className="divider">OR</div>
                    <button className="btn btn-ghost gap-2" onClick={() => { signInWithGoogle() }}>
                        <FcGoogle className='text-2xl' />
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;