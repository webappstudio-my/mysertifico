import React from 'react';
import Header from '../../../components/mywall/Header';
import HeroSection from '../../../components/mywall/HeroSection';
import Footer from '../../../components/mywall/Footer';

const MyWallHome = () => {
    return (
        <div className="bg-gray-50 text-gray-800 overflow-x-hidden">
            <Header />
            <main>
                <HeroSection />
            </main>
            <Footer />
        </div>
    );
};

export default MyWallHome;