// src/pages/mysertifico/LandingPage.jsx
import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import HeroSection from '../../../components/common/HeroSection'; // We'll create this next

const Home = () => {
    return (
        <div className="bg-gray-50 text-gray-800 overflow-x-hidden">
            <Header />
            <main>
                <HeroSection />
                {/* Other sections will go here later */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;