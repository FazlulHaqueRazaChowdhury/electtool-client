import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';
import ReviewCardRoute from './ReviewCardRoute';

const ReviewsRout = () => {
    const [customerReview, setCustomerReview] = useState([]);
    useEffect(() => {
        axiosPrivate.get('https://arcane-reaches-97312.herokuapp.com/reviews')
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                setCustomerReview(res.data)
            });
    }, [])
    return (
        <div className='min-h-screen overflow-hidden'>
            <div className="my-[100px] container mx-auto">
                <h1 className='text-3xl font-bold'>Watch  our customer <span className='text-primary font-bold'>reviews!</span></h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[10px] gap-y-[20px]">
                    {
                        customerReview.map(review => <ReviewCardRoute key={review._id} review={review} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewsRout;