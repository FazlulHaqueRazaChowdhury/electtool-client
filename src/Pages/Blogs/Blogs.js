import React from 'react';

const Blogs = () => {
    return (
        <div className='min-h-screen overflow-hidden'>
            <div className="container mx-auto mt-[150px]">
                <h1 className="text-2xl mt-[30px] font-bold"><span className='text-primary'>1.</span>How will you improve the performance of a React Application?</h1>
                <p className='text-justify'>
                    To improve react application performance we have to keep the components state where necessay. We have to memorize the React components so that do not re renders. We also should not use inline functions. We have to remove unnecessary await and promises. Lazy Loading is also used to imrove react performance. This is how we can improve the performance in react application.
                </p>
                <h1 className="text-2xl mt-[30px] font-bold"><span className='text-primary'>2.</span>What are the different ways to manage a state in a React application?</h1>
                <p className='text-justify'>
                    There area also many options to manage state in react. There is react library called Redux where you can manage state and now it is one of the most popular one. There is also one is called MobX. That follows OOP paradigm and use observables. We can also manage our state using Recoil that is relative to newcomer.Using these library we can manage the state of react.
                </p>
                <h1 className="text-2xl mt-[30px] font-bold"><span className='text-primary'>3.</span>Why you do not set the state directly in React</h1>
                <p className='text-justify'>
                    Whe should not update the state directly in React because mutating state directly can lead to odd bugs. Using setState() improve the performance of react it rerender only the props that has been change. So we should not set set state directly in react becasue it decrease the performance of react websites. And When we directly mutate the state, it doesn't change the state immediately.What it does it creates a pending state and accessing it after calling this method will  return the present value.
                </p>
                <h1 className="text-2xl mt-[30px] font-bold"><span className='text-primary'>4.</span>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h1>
                <p className='text-justify'>
                    For example if we have an array of products like array = ['laptop', 'iphone','dslr','playstation'] etc. They all have their different values like ram rom or anything like that in object. So we wanna find the products by its name. So finding products we have to use the array.filter() method.
                    array.filter(product => product.name === 'name'); this will return an array that matches the name in the array of products or we also can use includes() in a loop or forEach to find the product by its name.
                </p>
                <h1 className="text-2xl mt-[30px] font-bold"><span className='text-primary'>5.</span>What is a unit test? Why should write unit tests?</h1>
                <p className='text-justify'>
                    Unit testing is test something smallest testable unit of an application. This is done by the developers when coding. We have to unit test our application because it ensures that all code meets the quality standards before its go to production. It also develop application lifecycle and saves time and money. It also helps developer to write better code more efficiently.
                </p>
            </div>
        </div>
    );
};

export default Blogs; 