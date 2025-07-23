import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Home = ({ navigate }) => {
    return (
        <>
            <Navbar navigate={navigate} />
            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-dark to-primary text-white pt-32 pb-20">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">MySertifico</h1>
                        <p className="text-lg md:text-xl text-teal-100 mb-10 max-w-3xl mx-auto">Official digital certificates for schools — simple, secure, and fully trusted.</p>

                        <img
                            src="https://placehold.co/1024x576/ffffff/9ca3af?text=Hero+Image"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1024x576/ffffff/9ca3af?text=Image+Error'; }}
                            alt="Hero Image"
                            className="mx-auto max-w-full md:max-w-3xl mb-12 rounded-lg shadow-2xl"
                        />

                        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
                            <button onClick={() => navigate('signIn')} className="bg-white text-primary font-semibold py-3 px-8 rounded-lg w-full sm:w-auto transform hover:scale-105 transition-transform">Sign In</button>
                            <button onClick={() => navigate('signUp')} className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg w-full sm:w-auto transform hover:scale-105 transition-transform">Try for Free!</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default Home;
