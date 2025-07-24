import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const About = ({ navigate }) => {
    return (
        <>
            <Navbar navigate={navigate} />
            <main className="pt-24">
                {/* Page Header Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">About MySertifico</h1>
                        <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">A trusted platform for simple, secure, and smart certificate management.</p>
                    </div>
                </section>

                {/* The Problem Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-4">The Challenge with Traditional Certificates</h2>
                            <p className="text-teal-200 mb-12">The traditional method of managing physical certificates is outdated and comes with significant challenges for both institutions and individuals.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Problem Card 1 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-file-damage-line text-4xl text-red-400 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">Lost & Damaged</h3>
                                <p className="text-teal-200 text-sm">Physical certificates are easily lost, misplaced, or damaged by water and time, making it hard to prove achievements.</p>
                            </div>
                            {/* Problem Card 2 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-timer-flash-line text-4xl text-yellow-400 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">Slow Verification</h3>
                                <p className="text-teal-200 text-sm">Verifying a certificate's authenticity is a manual, time-consuming process for schools and potential employers.</p>
                            </div>
                            {/* Problem Card 3 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-shield-cross-line text-4xl text-orange-400 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">Risk of Fraud</h3>
                                <p className="text-teal-200 text-sm">Physical documents can be easily forged, undermining the credibility of the issuing institution and the holder.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Solution Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-4">Our Solution: The MySertifico Ecosystem</h2>
                            <p className="text-teal-200 mb-12">MySertifico revolutionizes certificate management with a secure, centralized, and verifiable digital platform.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Solution Card 1 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-qr-scan-2-line text-4xl text-accent mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">Instant Verification</h3>
                                <p className="text-teal-200 text-sm">Every certificate comes with a unique QR code. A quick scan is all it takes for anyone to verify its authenticity instantly.</p>
                            </div>
                            {/* Solution Card 2 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-lock-2-fill text-4xl text-accent mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">Secure & Permanent</h3>
                                <p className="text-teal-200 text-sm">Stored securely in the cloud, digital certificates are tamper-proof and protected from loss or damage, forever.</p>
                            </div>
                            {/* Solution Card 3 */}
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <i className="ri-wallet-3-line text-4xl text-accent mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2 text-white">MyWall Digital Wallet</h3>
                                <p className="text-teal-200 text-sm">Recipients get a lifelong digital wallet to access, manage, and share all their achievements from one single place.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6 text-center max-w-4xl">
                        <img src="https://placehold.co/112x112/ffffff/0d9488?text=M" className="mx-auto h-28 w-28 mb-6 rounded-full bg-white/40" alt="MySertifico Icon" />
                        <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                        <p className="mt-4 text-xl text-teal-100 italic">
                            “We envision a future where every certificate is instantly verifiable, tamper-proof, and digitally archived. Our goal is to become the national standard for academic and co-curricular certificate management across Malaysia and beyond.”
                        </p>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default About;
