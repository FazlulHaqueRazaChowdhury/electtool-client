import React from 'react';

const ReviewCard = ({ review }) => {
    const { name, img, rating, desc } = review;
    return (
        <div>
            <div className="card m-w-96 bg-base-100 mx-auto shadow-xl h-[350px]">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className='italic'>"{desc.length > 80 ? desc.slice(0, 80) + '...' : desc}"</p>

                    <div className="rating justify-center">
                        {
                            [...Array(rating).keys()].map((star, index) => <input key={index + 9} type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />)

                        }
                        {
                            [...Array(5 - rating).keys()].map((star, index) => <input key={index + 4} type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" disabled />)
                        }
                    </div>
                    <div className="card-actions justify-center mt-9">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt='user profile' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;