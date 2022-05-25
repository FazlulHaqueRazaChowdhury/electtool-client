import React from 'react';
import useProducts from '../../../hook/useProducts';
import Loading from '../../Shared/Loading/Loading';
import ArrivalCard from './ArrivalCard';

const Arrivals = () => {
    const bgColor = ['bg-accent', 'bg-error', 'bg-primary']
    const [products, loading] = useProducts(3);
    if (loading) {
        return <Loading />
    }
    return (
        <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row '>
                {
                    products.map((arrival, index) => <ArrivalCard key={arrival?._id} bg={bgColor[index]} arrival={arrival} />)
                }
            </div>
        </div>
    );
};

export default Arrivals;