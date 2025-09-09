import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';
import heroImage from '../../../assets/images/frontend/mywall-showcase.png';

const MyWallAbout = () => {

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white overflow-x-hidden">
            <Header />
            
            <main className="pt-24 pb-12">
                {/* Hero Section */}
                <section className="py-16 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-poppins">About MyWall</h1>
                        <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">Empowering every individual to own, manage, and share their lifelong achievements through a secure and beautiful digital portfolio.</p>
                    </div>
                </section>

                {/* What is MyWall? Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:flex items-center gap-12">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-white mb-4">Your Digital Wall of Achievements</h2>
                                <p className="text-primary-mywall-200 mb-4">
                                    MyWall is more than just a certificate holder; it's your personal digital portfolio. In a world that's increasingly digital, we believe your qualifications and achievements should be too. MyWall provides a single, secure, and easily accessible place for all your certificates—from primary school awards to professional accreditations.
                                </p>
                                <p className="text-primary-mywall-200">
                                    Our mission is to give you full control over your accomplishments, allowing you to collect, organize, and share them with anyone, anywhere, at any time.
                                </p>
                            </div>
                            <div className="lg:w-1/2 mt-8 lg:mt-0">
                                <img src={heroImage} alt="Digital portfolio showcase" className="rounded-xl shadow-2xl w-full" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/14B8A6/FFFFFF?text=MyWall+Showcase'; }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose MyWall? Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-10">Why Choose MyWall?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-5xl text-accent mb-4"><i className="ri-shield-check-line"></i></div>
                                <h3 className="text-xl font-bold text-white mb-2">Secure & Trusted</h3>
                                <p className="text-primary-mywall-200">Your certificates are protected with top-tier security, ensuring they are authentic and tamper-proof.</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-5xl text-accent mb-4"><i className="ri-share-forward-line"></i></div>
                                <h3 className="text-xl font-bold text-white mb-2">Effortless Sharing</h3>
                                <p className="text-primary-mywall-200">Share your achievements with potential employers, universities, or on social media with a single, secure link.</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-5xl text-accent mb-4"><i className="ri-global-line"></i></div>
                                <h3 className="text-xl font-bold text-white mb-2">Lifelong Access</h3>
                                <p className="text-primary-mywall-200">From your first school prize to your latest professional skill, MyWall is your companion for a lifetime of learning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Digital Legacy?</h2>
                        <p className="text-primary-mywall-200 mb-8 max-w-2xl mx-auto">Join thousands of students and professionals who are taking control of their achievements.</p>
                        <Link to="/mywall/auth/sign-up" className="bg-accent text-white font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform hover:bg-accent-hover">
                            Create Your MyWall for Free
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MyWallAbout;