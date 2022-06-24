
import { signOut } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosPrivate from '../../../api/axiosPrivate';
import auth from '../../../firebase.init';


const AddProduct = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const img = data.photoURL[0];

        const formData = new FormData();
        formData.append('image', img);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb}`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate('/');
                    return signOut(auth);
                }
                return res.json()
            })
            .then(result => {

                if (result.data.display_url) {
                    const productInformation = {
                        name: data.name,
                        price: data.price,
                        minOrder: data.minOrder,
                        available: data.available,
                        img: result.data.display_url,
                        rating: data.rating,
                        desc: data.desc,
                    }

                    axiosPrivate.post('https://arcane-reaches-97312.herokuapp.com/products', productInformation)
                        .then(res => {

                            if (res.data.insertedId) {
                                toast.success('Product Added');
                                reset();
                            }
                        });
                }
            })


    }






    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <div className="card mx-auto w-96 min-h-[500px] bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl mx-auto">Add a new Product</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="name">Product Name</label>
                            <input type="text" name='name' placeholder="Name" className={`input input-bordered ${errors?.name ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("name", {
                                    required: 'Product Name is required'
                                })}

                            />
                            <p className='text-error'>{errors?.name?.type === 'required' ? errors?.name?.message : ''}</p>
                            <label htmlFor="number">Price:</label>
                            <input type="number" name='number' placeholder="Price" className={`input input-bordered ${errors?.price ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("price", {
                                    required: 'Prce is required',
                                })}
                            />
                            <p className='text-error'>{errors?.minOrder?.type === 'required' ? errors?.minOrder?.message : ''}</p>
                            <p className='text-error'>{errors?.minOrder?.type === 'min' ? errors?.minOrder?.message : ''}</p>
                            <label htmlFor="number">Product Minimum Order:</label>
                            <input type="number" name='number' placeholder="Minimum Order" className={`input input-bordered ${errors?.minOrder ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("minOrder", {
                                    required: 'Product Quantity is required',
                                    min: {
                                        value: 50,
                                        message: 'Minmum value shoudle be 50'
                                    }
                                })}
                            />
                            <p className='text-error'>{errors?.minOrder?.type === 'required' ? errors?.minOrder?.message : ''}</p>
                            <p className='text-error'>{errors?.minOrder?.type === 'min' ? errors?.minOrder?.message : ''}</p>
                            <label htmlFor="available">Product Available:</label>
                            <input type="number" name='available' placeholder="Available" className={`input input-bordered ${errors?.available ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("available", {
                                    required: 'This field is required'
                                })}
                            />
                            <p className='text-error'>{errors?.available?.type === 'required' ? errors?.available?.message : ''}</p>
                            <p className='text-error'>{errors?.available?.type === 'pattern' ? errors?.available?.message : ''}</p>
                            <label htmlFor="rating">Rating:</label>
                            <input type="number" min='0' max='5' name='rating' placeholder="Rating" className={`input input-bordered ${errors?.rating ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("rating", {
                                    required: 'Rating is required',
                                    min: {
                                        value: 0,
                                        message: '0 is minimum'
                                    },
                                    max: {
                                        value: 5,
                                        message: '5 is maximum'
                                    }
                                }
                                )}
                            />
                            <p className='text-error'>{errors?.rating?.type === 'required' ? errors?.rating?.message : ''}</p>
                            <p className='text-error'>{errors?.rating?.type === 'max' ? errors?.rating?.message : ''}</p>
                            <p className='text-error'>{errors?.rating?.type === 'min' ? errors?.rating?.message : ''}</p>
                            <label htmlFor="desc">Product Description</label>
                            <textarea name='desc' placeholder="Description" className={`textarea textarea-bordered ${errors?.desc ? 'input-error' : '  '} w-full max-w-xs`}
                                {...register("desc", {
                                    required: 'Description Password is required'
                                })}
                            />
                            <p className='text-error'>{errors?.desc?.type === 'required' ? errors?.desc?.message : ''}</p>

                            <input className={`input input-bordered h-full ${errors?.minOrder ? 'input-error' : '  '} w-full max-w-xs block text-sm  rounded-lg  cursor-pointer  focus:outline-none`} id=" multiple_files" type="file" {...register('photoURL', {
                                required: 'Your profile image is required'
                            })} multiple></input>
                            <p className='text-error'>{errors?.photoURL?.type === 'required' ? errors?.photoURL?.message : ''}</p>
                            <div className="card-actions justify-center mt-2">
                                <button className="btn btn-primary" type='submit'>Add Product</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        </div>
    )
};


export default AddProduct;