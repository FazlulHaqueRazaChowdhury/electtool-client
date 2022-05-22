import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit = async data => {
        console.log(data);
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const email = data.email;
        const name = data.name;
        const photoURL = 'https://api.lorem.space/image/face?hash=92310';

        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password)
            await updateProfile({ displayName: name, photoURL: photoURL });
        }
        else {
            toast.error('Password Did not matched');
        }

    };
    if (error) {
        console.log(error);
    }
    if (user) {
        navigate('/');
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div class="card mx-auto w-96 min-h-[500px] bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-3xl mx-auto">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' placeholder="Name" class="input input-bordered w-full max-w-xs"
                            {...register("name")}

                        />
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder="Email" class="input input-bordered w-full max-w-xs"
                            {...register("email")}

                        />
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder="Password" class="input input-bordered w-full max-w-xs"
                            {...register("password")}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name='confirmPassword' placeholder="Confirm Password" class="input input-bordered w-full max-w-xs"
                            {...register("confirmPassword")}
                        />
                        <label class="block mb-2 text-sm font-medium" for="multiple_files">Upload multiple files</label>
                        <input class="block w-full text-sm  rounded-lg  cursor-pointer  focus:outline-none" id=" multiple_files" type="file" {...register('photoURL')} multiple></input>
                        <div class="card-actions justify-center mt-2">
                            <button class="btn btn-primary" type='submit'>Sign Up</button>
                        </div>
                    </form>
                    <p>Already have an account? <Link to='/logIn' className='text-primary underline'>Sign In Here!</Link></p>
                </div>
            </div>
        </div >
    );
};

export default SignUp;