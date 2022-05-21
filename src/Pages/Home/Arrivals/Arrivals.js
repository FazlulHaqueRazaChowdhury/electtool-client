import React from 'react';
import ArrivalCard from './ArrivalCard';

const Arrivals = () => {
    const newArrival = [
        {
            img: 'https://i.ibb.co/g9kB721/Drilling-Machine-Transparent-Background.png',
            name: 'Drill Machine',
            price: 689.99,
            bg: 'bg-blue-700'
        },
        {
            img: 'https://i.ibb.co/g9kB721/Drilling-Machine-Transparent-Background.png',
            name: 'Wood Sharpener',
            price: 689.99,
            bg: 'bg-green-600'
        },
        {
            img: 'https://i.ibb.co/g9kB721/Drilling-Machine-Transparent-Background.png',
            name: 'Wood Sharpener',
            price: 689.99,
            bg: 'bg-orange-700'
        }
    ]
    return (
        <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row gap-x-10 '>
                {
                    newArrival.map(arrival => <ArrivalCard arrival={arrival} />)
                }
            </div>
        </div>
    );
};

export default Arrivals;