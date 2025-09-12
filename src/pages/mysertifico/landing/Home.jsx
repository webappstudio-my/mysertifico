// src/pages/mysertifico/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import heroImage from '../../../assets/images/frontend/hero-image.png'; // Adjust the path as necessary

const Home = () => {
    return (
        <div className="bg-gray-50 text-gray-800 overflow-x-hidden">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-dark to-primary text-white pt-32 pb-20">
                    <div className="container mx-auto text-center px-6">
                        {/* Title container with badge */}
                        <div className="relative inline-block mb-4">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">MySertifico</h1>
                            {/* Version Badge */}
                            <span className="absolute top-0 -right-4 md:top-1 md:-right-12 transform -translate-y-1/2 rotate-12 bg-accent text-white text-xs md:text-base font-bold px-3 py-1 rounded-full shadow-lg">1.0</span>
                        </div>
                        <p className="text-lg md:text-xl text-teal-100 mb-10 max-w-3xl mx-auto">Official digital certificates for everyone — simple, secure, and fully trusted.</p>

                        {/* The image path has been updated to reflect the public folder structure */}
                        <img
                            src={heroImage}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1024x576/ffffff/9ca3af?text=Image+Error'; }}
                            alt="Hero Image"
                            className="mx-auto max-w-full md:max-w-3xl mb-12 rounded-lg shadow-2xl"
                        />

                        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
                            <Link to="/auth/sign-in" className="bg-white text-primary font-semibold py-3 px-8 rounded-lg w-full sm:w-auto transform hover:scale-105 transition-transform">Sign In</Link>
                            <Link to="/auth/sign-up" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg w-full sm:w-auto transform hover:scale-105 transition-transform">Try for Free!</Link>
                        </div>
                    </div>
                </section>
                {/* Other sections will go here later */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;