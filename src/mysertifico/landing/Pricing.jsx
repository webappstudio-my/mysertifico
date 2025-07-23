import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Pricing = ({ navigate }) => {
    const [country, setCountry] = useState('my'); // Default to Malaysia

    const pricingData = {
        'my': {
            standard: 'RM50',
            premium: 'RM100',
            super: 'RM200'
        },
        'id': {
            standard: 'Rp76,600',
            premium: 'Rp191,600',
            super: 'Rp383,200'
        }
    };

    return (
        <>
            <Navbar navigate={navigate} />
            <main className="pt-24">
                {/* Page Header Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Organisation Pricing Plans</h1>
                        <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">Choose the plan that best fits your institution's needs.<br />Subscription prices may vary by country.</p>
                        {/* Country Price Checker */}
                        <div className="mt-8 max-w-xs mx-auto">
                            <label htmlFor="country-select" className="block text-sm font-medium text-teal-200 mb-2">Check the price for your country:</label>
                            <select
                                id="country-select"
                                className="w-full bg-white/20 border-white/30 rounded-lg py-2 px-4 text-white focus:ring-accent focus:border-accent"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="my">Malaysia</option>
                                <option value="id">Indonesia</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Trial Plan */}
                            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <p className="my-2"><span className="text-2xl font-bold text-primary">Trial Plan</span></p>
                                <p className="my-2"><span className="text-2xl font-bold text-primary">14-day free</span></p>
                                <h2 className="text-lg font-semibold text-gray-700">Free 20 tokens</h2>
                                <p className="text-sm text-gray-500 mb-6">No payment or credit card required</p>
                                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                    <p className="font-bold">1 token per recipient</p>
                                </div>
                                <ul className="space-y-3 text-sm flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Certificates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Templates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Logos</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Recipients</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Super Admins</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Isuers</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Verifiers</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>Unlimited Signatories</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>QR Code Embedded</li>
                                </ul>
                                <button onClick={() => navigate('signUp')} className="mt-8 w-full block text-center border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white font-semibold">Start Free Trial</button>
                            </div>

                            {/* Standard Plan */}
                            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <p className="my-2"><span className="text-2xl font-bold text-primary">Standard Plan</span></p>
                                <p className="my-2"><span id="standard-price" className="text-2xl font-bold text-primary">{pricingData[country].standard}</span></p>
                                <h2 className="text-lg font-semibold text-gray-700 mb-10">333 tokens</h2>
                                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                    <p className="font-bold">≈ 0.15 sen per recipient</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>All the same features are available on the Trial Plan.</li>
                                </ul>
                                <button onClick={() => navigate('signUp')} className="mt-8 w-full block text-center border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white font-semibold">Register Now</button>
                            </div>

                            {/* Premium Plan */}
                            <div className="bg-primary text-white rounded-xl shadow-2xl p-6 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300">
                                <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">POPULAR</span>
                                <p className="my-2"><span className="text-2xl font-bold text-white">Premium Plan</span></p>
                                <p className="my-2"><span id="premium-price" className="text-2xl font-bold">{pricingData[country].premium}</span></p>
                                <h2 className="text-lg font-semibold mb-10">769 tokens</h2>
                                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                    <p className="font-bold">Save 13%</p>
                                    <p className="text-sm font-medium">Only ≈ 0.13 sen per recipient</p>
                                </div>
                                <ul className="space-y-3 text-sm flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>All the same features are available on the Trial Plan.</li>
                                </ul>
                                <button onClick={() => navigate('signUp')} className="mt-8 w-full block text-center bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold">Register Now</button>
                            </div>

                            {/* Pro Plan */}
                            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">SUPER SAVE!</span>
                                <p className="my-2"><span className="text-2xl font-bold text-primary">Pro Plan</span></p>
                                <p className="my-2"><span id="super-price" className="text-2xl font-bold text-primary">{pricingData[country].super}</span></p>
                                <h2 className="text-lg font-semibold text-gray-700 mb-10">2,000 tokens</h2>
                                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                    <p className="font-bold">Save 33%</p>
                                    <p className="text-sm font-medium">Only ≈ 0.10 sen per recipient</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>All the same features are available on the Trial Plan.</li>
                                </ul>
                                <button onClick={() => navigate('signUp')} className="mt-8 w-full block text-center border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white font-semibold">Register Now</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default Pricing;
