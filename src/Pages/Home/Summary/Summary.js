import React from 'react';
import SummarCard from './SummarCard';

const Summary = () => {
    const summaryData = [
        {
            id: 1,
            name: 'Annual Revenue',
            quantity: 40,

        },
        {
            id: 2,
            name: 'Happy Customers',
            quantity: 400,

        },
        {
            id: 3,
            name: 'Reviews',
            quantity: 400,

        },
    ]
    return (
        <div className="bg-base-100">
            <div className='container mx-auto'>
                <h1 className='text-4xl font-semi'>Success In a View</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3  justify-center items-center">
                    {
                        summaryData.map(summary => <SummarCard key={summary.id + 'abcd'} summary={summary} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default Summary;