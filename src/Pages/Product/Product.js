import React from 'react';
import useProducts from '../../hook/useProducts';
import Loading from '../Shared/Loading/Loading';
import ProductCard from './ProductCard';

const Product = () => {
    const [products, loading] = useProducts(0);
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className='min-h-screen overflow-hidden'>
            <div className="title my-[150px] container mx-auto">
                <h1 className='text-2xl font-bold'>Total Products : <span className='text-primary'>{products?.length}</span></h1>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {
                        products.map(tool => <ProductCard key={tool._id} tool={tool}></ProductCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Product;