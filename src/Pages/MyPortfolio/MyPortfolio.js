import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='min-h-screen overflow-hidden'>
            <div className="container mx-auto my-[200px]">
                <h1 className='text-center font-bold text-3xl'>My Information:</h1>
                <h1 className='text-2xl font-bold'>Name:<span className='text-primary'> Fazlul Haque Raza Chowdhury</span></h1>
                <h1 className='text-2xl font-bold'>Email:<span className='text-primary'> fozlulcoc1592@gmail.com</span></h1>
                <h1 className='text-2xl font-bold'>HSC-2023:<span className='text-primary'> Madan Mohan College (Science)</span></h1>
                <h1 className='text-2xl font-bold'>SSC-2021:<span className='text-primary'> Blue Bird High School and College (Science) </span></h1>
                <h1 className='text-2xl font-bold text-primary'>List Of Technologies I now:</h1>
                <ul>
                    <li className='text-2xl'>React JS</li>
                    <li className='text-2xl'>Javascript ES6</li>
                    <li className='text-2xl'>Firebase Authentication</li>
                    <li className='text-2xl'>HTML5</li>
                    <li className='text-2xl'>CSS3</li>
                    <li className='text-2xl'>Tailwindcss</li>
                    <li className='text-2xl'>DaisyUI</li>
                    <li className='text-2xl'>Bootstrap</li>
                    <li className='text-2xl'>React Router</li>
                    <li className='text-2xl'>Node JS</li>
                    <li className='text-2xl'>Express Js</li>
                    <li className='text-2xl'>MongoDB</li>
                    <li className='text-2xl'>React Hooks</li>
                </ul>
                <h1 className='text-center font-bold text-3xl'>Here Are 3 Projects of Mine:</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-x-2 gap-y-2">
                    <div className="card max-w-96 bg-base-100 min-h-[300px] shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary font-bold">John Dealership</h2>
                            <p>A website where you can manage car stocks.</p>
                            <p><span className='font-bold'>Technologies:</span> React Js,React Router, Bootstrap, Node Js, MongoDB, Express Js.</p>
                            <div className="card-actions justify-end">
                                <a className="btn btn-primary text-white" href='https://john-dealership.web.app/'>Live Link</a>
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-96 bg-base-100 min-h-[300px] shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary font-bold">Space Tourism</h2>
                            <p>A website where you can learn about space.</p>
                            <p><span className='font-bold'>Technologies:</span> React Js,Tailwind CSS,React Router.</p>
                            <div className="card-actions justify-end">
                                <a className="btn btn-primary text-white" href='https://space-tourism-fhrc.netlify.app/'>Live Link</a>
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-96 bg-base-100 min-h-[300px]  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary font-bold">Toddlu</h2>
                            <p>A website where you can make today's list.</p>
                            <p><span className='font-bold'>Technologies:</span> React Js,Node Js, Express JS.Firebase Authentication,JWT.</p>
                            <div className="card-actions justify-end">
                                <a className="btn btn-primary text-white" href='https://toddlu.netlify.app/'>Live Link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default MyPortfolio;