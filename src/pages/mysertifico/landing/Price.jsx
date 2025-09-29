import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import logo from '../../../assets/images/logos/logo.png';


// Helper function to format currency
const formatCurrency = (amount, countryCode) => {
    const prices = {
        'MY': 'RM',
        'ID': 'Rp',
        'SG': 'S$',
        'BN': 'B$',
        'AU': 'A$',
    };
    const currency = prices[countryCode.toUpperCase()] || '';
    return `${currency}${parseFloat(amount).toFixed(0)}`;
};

// Helper function to format cost
const formatCost = (cost, countryCode) => {
    const costs = {
        'MY': ' sen per recipient',
        'ID': ' per recipient',
        'SG': '¢ per recipient',
        'BN': '¢ per recipient',
        'AU': '¢ per recipient',
    };
    const currencyUnit = costs[countryCode.toUpperCase()] || '';
    return `≈ ${parseFloat(cost).toFixed(1)}${currencyUnit}`;
};

const Price = () => {
    const [selectedCountry, setSelectedCountry] = useState('my');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pricingPlans'],
        queryFn: async () => {
            const response = await axios.get('http://127.0.0.1:3000/api/plans/MySertifico');
            return response.data.data;
        },
    });

    const getPlanData = (planName, countryCode) => {
        if (!data) return null;
        const plan = data.find(p => p.plan_name === planName && p.country_code.toLowerCase() === countryCode);
        return plan;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-700 to-teal-600 text-white">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                <p className="ml-4 text-xl">Loading pricing plans...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-700 to-teal-600 text-white">
                <p className="text-xl text-red-300">Error: {error.message}. Please check if the backend is running.</p>
            </div>
        );
    }

    // Dynamically retrieve plans for the selected country
    const basicPlan = getPlanData('Basic Pack', selectedCountry);
    const valuePlan = getPlanData('Value Pack', selectedCountry);
    const megaPlan = getPlanData('Mega Pack', selectedCountry);

    return (
        <div className="bg-gradient-to-br from-teal-700 to-teal-600 text-white">
            {/* Header & Navbar */}
            <header className="bg-white shadow-md text-gray-800 fixed w-full top-0 z-50">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="home.html" className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="h-10 w-10" />
                            <span className="font-poppins font-bold text-2xl text-teal-600">MySertifico</span>
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="home.html" className="text-teal-600 font-semibold">Home</a>
                            <a href="about.html" className="hover:text-teal-600 font-medium">About</a>
                            <a href="price.html" className="hover:text-teal-600 font-medium">Pricing</a>
                            <a href="contact-us.html" className="hover:text-teal-600 font-medium">Contact Us</a>
                        </div>

                        {/* Login Buttons for Desktop */}
                        <div className="hidden md:flex items-center space-x-2">
                            <a href="../auth/sign-in.html" className="px-4 py-2 text-sm bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Sign In</a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none">
                                <i className={`ri-menu-line text-2xl ${mobileMenuOpen ? 'hidden' : ''}`}></i>
                                <i className={`ri-close-line text-2xl ${mobileMenuOpen ? '' : 'hidden'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden mt-4 ${mobileMenuOpen ? '' : 'hidden'}`}>
                        <a href="home.html" className="block py-2 text-sm text-teal-600 font-semibold">Home</a>
                        <a href="about.html" className="block py-2 text-sm hover:text-teal-600">About</a>
                        <a href="price.html" className="block py-2 text-sm hover:text-teal-600">Pricing</a>
                        <a href="contact-us.html" className="block py-2 text-sm hover:text-teal-600">Contact Us</a>
                        <div className="border-t my-4"></div>
                        <a href="../auth/sign-in.html" className="block w-full text-center py-2 text-sm bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Sign In</a>
                    </div>
                </nav>
            </header>

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
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className="w-full bg-white/20 border-white/30 rounded-lg py-2 px-4 text-white focus:ring-amber-500 focus:border-amber-500 [&>option]:text-black [&>option]:bg-white"
                            >
                                <option value="my">Malaysia</option>
                                <option value="id">Indonesia</option>
                                <option value="sg">Singapore</option>
                                <option value="bn">Brunei</option>
                                <option value="au">Australia</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Starter Pack */}
                            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <p className="my-2"><span className="text-2xl font-bold text-teal-600">Starter Pack</span></p>
                                <h2 className="text-lg font-semibold text-gray-700">Free 20 tokens</h2>
                                <p className="text-sm text-gray-500 mb-6">No payment or credit card required</p>
                                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                    <p className="font-bold">1 token per recipient</p>
                                </div>
                                <ul className="space-y-3 text-sm flex-grow">
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Templates</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Logos</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Super Admins</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Creators</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Verifiers</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>Unlimited Signatories</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>20 Certificate Recipients</li>
                                    <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>QR Code Embedded</li>
                                </ul>
                                <a href="../auth/sign-up.html" className="mt-8 w-full block text-center border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-600 hover:text-white font-semibold">Start Free Trial</a>
                            </div>

                            {/* Basic Pack */}
                            {basicPlan && (
                                <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                    <p className="my-2"><span className="text-2xl font-bold text-teal-600">{basicPlan.plan_name}</span></p>
                                    <p className="my-2"><span className="text-2xl font-bold text-teal-600">{formatCurrency(basicPlan.price, basicPlan.country_code)}</span></p>
                                    <h2 className="text-lg font-semibold text-gray-700 mb-10">{basicPlan.token_allocation} tokens</h2>
                                    <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                        <p className="font-bold">{formatCost(basicPlan.price_pertoken, basicPlan.country_code)}</p>
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>All the same features are available on the Trial Plan.</li>
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>{basicPlan.token_allocation} Certificate Recipients</li>
                                    </ul>
                                    <a href="../auth/sign-up.html" className="mt-8 w-full block text-center border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-600 hover:text-white font-semibold">Get Started</a>
                                </div>
                            )}

                            {/* Value Pack */}
                            {valuePlan && (
                                <div className="bg-teal-600 text-white rounded-xl shadow-2xl p-6 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300">
                                    <span className="absolute top-0 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-b-lg font-bold">POPULAR</span>
                                    <p className="my-2"><span className="text-2xl font-bold text-white">{valuePlan.plan_name}</span></p>
                                    <p className="my-2"><span className="text-2xl font-bold">{formatCurrency(valuePlan.price, valuePlan.country_code)}</span></p>
                                    <h2 className="text-lg font-semibold mb-10">{valuePlan.token_allocation} tokens</h2>
                                    <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                        <p className="font-bold">Save 13%</p>
                                        <p className="text-sm font-medium">Only {formatCost(valuePlan.price_pertoken, valuePlan.country_code)}</p>
                                    </div>
                                    <ul className="space-y-3 text-sm flex-grow">
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>All the same features are available on the Trial Plan.</li>
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>{valuePlan.token_allocation} Certificate Recipients</li>
                                    </ul>
                                    <a href="../auth/sign-up.html" className="mt-8 w-full block text-center bg-white text-teal-600 py-2 px-4 rounded-lg hover:bg-gray-100 font-semibold">Get Started</a>
                                </div>
                            )}

                            {/* Mega Pack */}
                            {megaPlan && (
                                <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300">
                                    <span className="absolute top-0 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-b-lg font-bold">SUPER SAVE!</span>
                                    <p className="my-2"><span className="text-2xl font-bold text-teal-600">{megaPlan.plan_name}</span></p>
                                    <p className="my-2"><span className="text-2xl font-bold text-teal-600">{formatCurrency(megaPlan.price, megaPlan.country_code)}</span></p>
                                    <h2 className="text-lg font-semibold text-gray-700 mb-10">{megaPlan.token_allocation.toLocaleString()} tokens</h2>
                                    <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                                        <p className="font-bold">Save 33%</p>
                                        <p className="text-sm font-medium">Only {formatCost(megaPlan.price_pertoken, megaPlan.country_code)}</p>
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>All the same features are available on the Trial Plan.</li>
                                        <li className="flex items-center"><i className="ri-checkbox-circle-fill text-amber-500 mr-2"></i>{megaPlan.token_allocation.toLocaleString()} Certificate Recipients</li>
                                    </ul>
                                    <a href="../auth/sign-up.html" className="mt-8 w-full block text-center border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-600 hover:text-white font-semibold">Get Started</a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Info */}
                    <div>
                        <h3 className="text-xl font-bold font-poppins mb-4">MySertifico</h3>
                        <p className="text-sm text-gray-400">MySertifico is a secure digital platform for managing official certificates for schools and institutions across Malaysia. Trusted. Simple. Digital.</p>
                    </div>
                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="home.html" className="hover:text-white">Home</a></li>
                            <li><a href="about.html" className="hover:text-white">About</a></li>
                            <li><a href="price.html" className="hover:text-white">Pricing</a></li>
                            <li><a href="contact-us.html" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    {/* Policies */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Terms & Policies</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="privacy-policy.html" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="terms-of-service.html" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="security-policy.html" className="hover:text-white">Security Policy</a></li>
                        </ul>
                    </div>
                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white text-xl" title="Facebook"><i className="ri-facebook-fill"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white text-xl" title="Instagram"><i className="ri-instagram-fill"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white text-xl" title="TikTok"><i className="ri-tiktok-fill"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white text-xl" title="YouTube"><i className="ri-youtube-fill"></i></a>
                        </div>
                    </div>
                </div>
                {/* Divider + Copyright */}
                <div className="border-t border-gray-700">
                    <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">&copy; 2025 MySertifico. All rights reserved by Webapp Studio Sdn. Bhd.</div>
                </div>
            </footer>
        </div>
    );
};

export default Price;
