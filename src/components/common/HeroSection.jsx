// src/components/common/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-primary-dark to-primary text-white pt-32 pb-20">
            <div className="container mx-auto text-center px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">MySertifico</h1>
                <p className="text-lg md:text-xl text-teal-100 mb-10 max-w-3xl mx-auto">Official digital certificates for schools — simple, secure, and fully trusted.</p>

                {/* The image path has been updated to reflect the public folder structure */}
                <img
                    src="/assets/images/frontend/hero-image.png"
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
    );
};

export default HeroSection;