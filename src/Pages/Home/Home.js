import React from 'react';
import { motion } from "framer-motion"
import Banner from './Banner/Banner';
import Arrivals from './Arrivals/Arrivals';
import HomeTools from './HomeTools/HomeTools';
import Summary from './Summary/Summary';
const Home = () => {
    return (
        <div className='-z-20 flex flex-col gap-y-[100px] bg-base-200'>
            <Banner />
            <Arrivals />
            <HomeTools />
            <Summary />
        </div>
    );
};

export default Home;