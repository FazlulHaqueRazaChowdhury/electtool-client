import React from 'react';
import useProducts from '../../../hook/useProducts';
import Loading from '../../Shared/Loading/Loading';
import ArrivalCard from './ArrivalCard';

const Arrivals = () => {
    const bgColor = ['bg-gradient-to-b from-secondary to-primary lg:bg-gradient-to-r from-secondary to-primary', 'bg-gradient-to-b from-primary to-secondary lg:bg-gradient-to-r from-primary to-secondary', 'bg-gradient-to-b from-secondary to-primary lg:bg-gradient-to-r from-secondary to-primary']
    const smColor = ['bg-gradient-to-b from-secondary to-error', 'bg-gradient-to-b from-error to-primary', 'bg-gradient-to-b from-primary to-secondary']
    const [products, loading] = useProducts(3);
    if (loading) {
        return <Loading />
    }
    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:flex-row w-full'>
                {
                    products.map((arrival, index) => <ArrivalCard key={arrival?._id} bg={bgColor[index]} smColor={smColor[index]} arrival={arrival} />)
                }
            </div>
        </div>
    );
};

export default Arrivals;