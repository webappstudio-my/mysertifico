import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/mywall/Header';
import Footer from '../../../components/mywall/Footer';

const MyWallPrice = () => {
    const [selectedCountry, setSelectedCountry] = useState('my');

    const pricingData = {
        my: { 
            standard: 'RM10', 
            premium: 'RM20', 
            parent: 'RM30' 
        },
        id: { 
            standard: 'Rp25.000', 
            premium: 'Rp50.000', 
            parent: 'Rp150.000' 
        },
        sg: { 
            standard: 'S$5', 
            premium: 'S$10', 
            parent: 'S$15' 
        },
        bn: { 
            standard: 'B$5', 
            premium: 'B$10', 
            parent: 'B$15' 
        },
        th: { 
            standard: '฿100', 
            premium: '฿200', 
            parent: '฿300' 
        },
        usd: { 
            standard: '$3', 
            premium: '$6', 
            parent: '$9' 
        }
    };

    const currentPrices = pricingData[selectedCountry];

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white overflow-x-hidden">
            <Header />
            
            <main className="pt-24 pb-12">
                {/* Page Header Section */}
                <section className="py-16 text-center">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-poppins mb-4">MyWall Pricing Plans</h1>
                        <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">Choose an affordable yearly plan that best fits your needs. Subscription prices may vary by country.</p>
                        
                        {/* Country & Billing Controls */}
                        <div className="mt-10 flex justify-center items-center gap-2">
                            <label htmlFor="country-select-mywall" className="text-sm font-medium text-primary-mywall-200">Currency:</label>
                            <select 
                                id="country-select-mywall" 
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="bg-white/20 border-white/30 rounded-lg py-1.5 px-3 text-white focus:ring-accent-mywall focus:border-accent-mywall text-sm [&>option]:bg-white [&>option]:text-black"
                            >
                                <option value="my">MYR (Malaysia)</option>
                                <option value="id">IDR (Indonesia)</option>
                                <option value="sg">SGD (Singapore)</option>
                                <option value="bn">BND (Brunei)</option>
                                <option value="th">THB (Thailand)</option>
                                <option value="usd">USD (International)</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Trial Plan */}
                            <div className="bg-white/10 backdrop-blur-sm text-white rounded-xl shadow-lg p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <h2 className="text-xl font-bold">Trial Plan</h2>
                                <p className="text-2xl font-extrabold my-4">Free</p>
                                <p className="text-sm text-primary-mywall-200 mb-6 h-10">14-Day Trial, no card required.</p>
                                <Link to="/mywall/auth/sign-up" className="mt-8 w-full block text-center bg-white text-primary-mywall-600 py-3 px-4 rounded-lg hover:bg-primary-mywall-50 font-semibold transition-colors">Start Free Trial</Link>
                                <div className="border-t border-white/20 my-6"></div>
                                <ul className="space-y-3 text-sm flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Access all certificates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>3 Tokens</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Upload 3 external certs</li>
                                    <li className="flex items-center text-primary-mywall-300"><i className="ri-close-circle-line mr-2"></i>Top-up disabled</li>
                                </ul>
                            </div>

                            {/* Standard Plan */}
                            <div className="bg-white/10 backdrop-blur-sm text-white rounded-xl shadow-lg p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <h2 className="text-xl font-bold">Standard Plan</h2>
                                <div className="flex items-baseline my-4">
                                    <span className="text-4xl font-extrabold">{currentPrices.standard}</span>
                                    <span className="text-primary-mywall-200 ml-1.5">/year</span>
                                </div>
                                <p className="text-sm text-primary-mywall-200 mb-6 h-10">Perfect for individuals getting started.</p>
                                <Link to="/mywall/auth/sign-up" className="mt-8 w-full block text-center bg-white text-primary-mywall-600 py-3 px-4 rounded-lg hover:bg-primary-mywall-50 font-semibold transition-colors">Get Started</Link>
                                <div className="border-t border-white/20 my-6"></div>
                                <ul className="space-y-3 text-sm flex-grow">
                                     <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Access all certificates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>25 Tokens</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Upload 25 external certs</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Top-up enabled</li>
                                </ul>
                            </div>

                            {/* Premium Plan (POPULAR) */}
                            <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300 scale-105">
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-sm px-4 py-1.5 rounded-full font-bold shadow-lg">POPULAR</span>
                                 <h2 className="text-xl font-bold text-primary-900">Premium Plan</h2>
                                <div className="flex items-baseline my-4">
                                    <span className="text-4xl font-extrabold text-primary-mywall">{currentPrices.premium}</span>
                                    <span className="text-gray-500 ml-1.5">/year</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6 h-10">For power users and professionals.</p>
                                <Link to="/mywall/auth/sign-up" className="mt-8 w-full block text-center bg-primary-mywall text-white py-3 px-4 rounded-lg hover:bg-primary-mywall-600 font-semibold transition-colors">Get Started</Link>
                                <div className="border-t my-6"></div>
                                <ul className="space-y-3 text-sm flex-grow">
                                     <li className="flex items-center"><i className="ri-checkbox-circle-line text-primary mr-2"></i>Access all certificates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-primary mr-2"></i>100 Tokens</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-primary mr-2"></i>Upload 100 external certs</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-primary mr-2"></i>Top-up enabled</li>
                                </ul>
                            </div>

                            {/* Parent Plan */}
                            <div className="bg-white/10 backdrop-blur-sm text-white rounded-xl shadow-lg p-8 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                 <h2 className="text-xl font-bold">Basic Parent Plan</h2>
                                <div className="flex items-baseline my-4">
                                    <span className="text-4xl font-extrabold">{currentPrices.parent}</span>
                                    <span className="text-primary-mywall-200 ml-1.5">/year</span>
                                </div>
                                <p className="text-sm text-primary-mywall-200 mb-6 h-10">For the whole family, manage multiple accounts.</p>
                                <Link to="/mywall/auth/sign-up" className="mt-8 w-full block text-center bg-white text-primary-mywall-600 py-3 px-4 rounded-lg hover:bg-primary-mywall-50 font-semibold transition-colors">Get Started</Link>
                                <div className="border-t border-white/20 my-6"></div>
                                <ul className="space-y-3 text-sm flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Access own & child's certs</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>75 Tokens</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Upload 75 external certs</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-line text-accent mr-2"></i>Top-up enabled</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MyWallPrice;