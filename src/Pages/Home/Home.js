import React from 'react';
import { motion } from "framer-motion"
import Banner from './Banner/Banner';
import Arrivals from './Arrivals/Arrivals';
import HomeTools from './HomeTools/HomeTools';
import Summary from './Summary/Summary';
import Footer from '../Shared/Footer/Footer';
import Reviews from './Reviews/Reviews';
import CompanyPolicy from './CompanyPolicy/CompanyPolicy';
import Contact from './Contact/Contact';
const Home = () => {
    return (
        <div className='-z-20 flex flex-col gap-y-[100px] bg-base-100'>
            <Banner />
            <Arrivals />
            <CompanyPolicy />
            <HomeTools />
            <Summary />
            <Reviews />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;