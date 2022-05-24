import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import axiosPrivate from '../../../api/axiosPrivate';
import { signOut } from 'firebase/auth';

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true
    });


    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [img, setImg] = useState('');
    const [infoName, setName] = useState('');
    const [information, setInfo] = useState({
        photoURL: '',
        name: '',
        email: '',
        street: '',
        city: '',
        country: '',
        zip: '',
        phone: ''
    })

    const onSubmit = data => {
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const email = data.email;
        const name = data.name;
        const img = data.photoURL[0];

        setName(name);

        const formData = new FormData();

        formData.append('image', img);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb}`, {
            method: 'POST',
            body: formData
        })
            .then(res => {

                return res.json()
            })
            .then(result => {

                if (result.success) {
                    const img = result?.data?.url;

                    setImg(img);
                    if (password === confirmPassword) {
                        setInfo({
                            photoURL: img,
                            name: name,
                            email: email
                        })
                        createUserWithEmailAndPassword(email, password);
                    }
                    else {
                        toast.error('Password Did not matched');
                    }
                }
            })



    };
    useEffect(() => {
        if (user) {
            updateProfile({ displayName: infoName, photoURL: img });
            axiosPrivate.put(`http://localhost:5000/users/${user?.user?.email}`, information)
                .then(res => localStorage.setItem('accessToken', res.data.token));
            toast.success('Email verification send');
            navigate(from, { replace: true });
        }
    }, [user])
    useEffect(() => {
        if (googleUser) {
            const information = {
                photoURL: googleUser.user.photoURL,
                name: googleUser.user.displayName,
                email: googleUser.user.email
            }


            axiosPrivate.put(`http://localhost:5000/users/${googleUser?.user.email}`, information)
                .then(res => localStorage.setItem('accessToken', res.data.token));
            navigate(from, { replace: true });
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
                default:
                    toast.error('Something went wrong');
                    break;
            }

        }
    }, [error])

    useEffect(() => {
        if (googleError) {
            switch (googleError?.code) {
                case 'auth/email-already-in-use':
                    toast.error('Email already in use.')
                    break;

                default:
                    toast.error('Something went wrong');
                    break;

            }
        }
    }, [googleError])
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card mx-auto w-96 min-h-[500px] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mx-auto">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' placeholder="Name" className={`input input-bordered ${errors?.name ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("name", {
                                required: 'Name is required'
                            })}

                        />
                        <p className='text-error'>{errors?.name?.type === 'required' ? errors?.name?.message : ''}</p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder="Email" className={`input input-bordered ${errors?.email ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Email is not valid'
                                }
                            })}
                        />
                        <p className='text-error'>{errors?.email?.type === 'required' ? errors?.email?.message : ''}</p>
                        <p className='text-error'>{errors?.email?.type === 'pattern' ? errors?.email?.message : ''}</p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder="Password" className={`input input-bordered ${errors?.password ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("password", {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Give a strong password including eight characters, at least one letter and one number:'
                                }
                            })}
                        />
                        <p className='text-error'>{errors?.password?.type === 'required' ? errors?.password?.message : ''}</p>
                        <p className='text-error'>{errors?.password?.type === 'pattern' ? errors?.password?.message : ''}</p>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name='confirmPassword' placeholder="Confirm Password" className={`input input-bordered ${errors?.confirmPassword ? 'input-error' : '  '} w-full max-w-xs`}
                            {...register("confirmPassword", {
                                required: 'Confirm Password is required'
                            })}
                        />
                        <p className='text-error'>{errors?.confirmPassword?.type === 'required' ? errors?.confirmPassword?.message : ''}</p>

                        <input className={`input input-bordered ${errors?.email ? 'input-error' : '  '} w-full max-w-xs block text-sm  rounded-lg  cursor-pointer  focus:outline-none`} id=" multiple_files" type="file" {...register('photoURL', {
                            required: 'Your profile image is required'
                        })} multiple></input>
                        <p className='text-error'>{errors?.photoURL?.type === 'required' ? errors?.photoURL?.message : ''}</p>
                        <div className="card-actions justify-center mt-2">
                            <button className="btn btn-primary" type='submit'>Sign Up</button>
                        </div>
                    </form>
                    <p>Already have an account? <Link to='/logIn' className='text-primary underline'>Sign In Here!</Link></p>
                    <div className="divider">OR</div>
                    <button className="btn btn-ghost gap-2" onClick={() => { signInWithGoogle() }}>
                        <FcGoogle className='text-2xl' />
                        Sign In With Google
                    </button>
                </div>
            </div>
        </div >
    );
};

export default SignUp;