import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

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

// All components are defined within this single file as per the React one-file mandate.
const Header = () => (
    <header className="fixed w-full z-50 bg-primary-dark/80 backdrop-blur-sm shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-white">MySertifico</div>
            <div className="hidden md:flex space-x-6 text-white">
                <a href="#" className="hover:text-blue-300 transition-colors duration-300">Home</a>
                <a href="#" className="hover:text-blue-300 transition-colors duration-300">About</a>
                <a href="#" className="hover:text-blue-300 transition-colors duration-300">Pricing</a>
                <a href="#" className="hover:text-blue-300 transition-colors duration-300">Contact</a>
            </div>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">Get Started</a>
        </nav>
    </header>
);

const Footer = () => (
    <footer className="bg-primary-dark/80 text-white py-8">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 MySertifico. All rights reserved.</p>
        </div>
    </footer>
);

const PricingHeader = ({ onCountryChange, selectedCountry }) => (
    <section className="text-center pt-32 pb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Pricing Plans</h1>
        <p className="text-xl text-gray-300 mb-8">Choose the best plan for your needs.</p>
        <div className="inline-flex bg-gray-700 rounded-full p-1">
            <button
                onClick={() => onCountryChange('my')}
                className={`py-2 px-4 rounded-full transition-all duration-300 font-semibold ${selectedCountry === 'my' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                MY
            </button>
            <button
                onClick={() => onCountryChange('id')}
                className={`py-2 px-4 rounded-full transition-all duration-300 font-semibold ${selectedCountry === 'id' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                ID
            </button>
            <button
                onClick={() => onCountryChange('sg')}
                className={`py-2 px-4 rounded-full transition-all duration-300 font-semibold ${selectedCountry === 'sg' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                SG
            </button>
            <button
                onClick={() => onCountryChange('bn')}
                className={`py-2 px-4 rounded-full transition-all duration-300 font-semibold ${selectedCountry === 'bn' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                BN
            </button>
            <button
                onClick={() => onCountryChange('au')}
                className={`py-2 px-4 rounded-full transition-all duration-300 font-semibold ${selectedCountry === 'au' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-600'}`}
            >
                AU
            </button>
        </div>
    </section>
);

const PricingCard = ({ plan, price, tokens, cost, features, buttonText, buttonLink, isPopular, isSuperSave }) => (
    <div className={`relative bg-gray-800 p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-105 border ${isPopular ? 'border-blue-500' : isSuperSave ? 'border-purple-500' : 'border-transparent'}`}>
        {isPopular && (
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-500 text-white text-xs font-bold uppercase rounded-full px-3 py-1 shadow-lg">
                Popular
            </div>
        )}
        {isSuperSave && (
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-purple-500 text-white text-xs font-bold uppercase rounded-full px-3 py-1 shadow-lg">
                Super Save
            </div>
        )}
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">{plan.title}</h2>
            <p className="text-xl text-gray-400">{tokens}</p>
        </div>
        <div className="text-center mb-8">
            <div className="text-5xl font-extrabold">{price}</div>
            <p className="text-md text-gray-400 mt-2">{cost.main}</p>
            {cost.sub && <p className="text-sm text-gray-400">{cost.sub}</p>}
        </div>
        <ul className="space-y-4 mb-8 text-gray-300">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <a href={buttonLink} className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg">
            {buttonText}
        </a>
    </div>
);

const Price = () => {
    const [selectedCountry, setSelectedCountry] = useState('my');

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

    const starterPackFeatures = [
        'Unlimited Certificates', 'Unlimited Templates', 'Unlimited Logos',
        'Unlimited Super Admins', 'Unlimited Issuers', 'Unlimited Verifiers',
        'Unlimited Signatories', '20 Certificate Recipients', 'QR Code Embedded'
    ];
    const otherPlanFeatures = ['All the same features are available on the Trial Plan.'];
    const basicPlanFeatures = [...otherPlanFeatures, '333 Certificate Recipients'];
    const valuePlanFeatures = [...otherPlanFeatures, '769 Certificate Recipients'];
    const megaPlanFeatures = [...otherPlanFeatures, '2,000 Certificate Recipients'];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-xl">Loading pricing plans...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p className="text-xl text-red-500">Error: {error.message}. Please check if the backend is running.</p>
            </div>
        );
    }
    
    // Dynamically retrieve plans for the selected country
    const basicPlan = getPlanData('Basic Pack', selectedCountry);
    const valuePlan = getPlanData('Value Pack', selectedCountry);
    const megaPlan = getPlanData('Mega Pack', selectedCountry);

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen font-sans">
            <Header />
            <main className="pt-24">
                <PricingHeader onCountryChange={setSelectedCountry} selectedCountry={selectedCountry} />
                <section className="pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <PricingCard
                                plan={{ title: 'Starter Pack' }}
                                price="14-day free"
                                tokens="Free 20 tokens"
                                cost={{ main: '1 token per recipient' }}
                                features={starterPackFeatures}
                                buttonText="Start Free Trial"
                                buttonLink="/sign-up"
                            />
                            {basicPlan && (
                                <PricingCard
                                    plan={{ title: basicPlan.plan_name }}
                                    price={formatCurrency(basicPlan.price, basicPlan.country_code)}
                                    tokens={`${basicPlan.token_allocation} tokens`}
                                    cost={{ main: formatCost(basicPlan.price_pertoken, basicPlan.country_code) }}
                                    features={basicPlanFeatures}
                                    buttonText="Get Started"
                                    buttonLink="/sign-up"
                                />
                            )}
                            {valuePlan && (
                                <PricingCard
                                    plan={{ title: valuePlan.plan_name }}
                                    price={formatCurrency(valuePlan.price, valuePlan.country_code)}
                                    tokens={`${valuePlan.token_allocation} tokens`}
                                    cost={{ main: 'Save 13%', sub: formatCost(valuePlan.price_pertoken, valuePlan.country_code) }}
                                    features={valuePlanFeatures}
                                    buttonText="Get Started"
                                    buttonLink="/sign-up"
                                    isPopular={true}
                                />
                            )}
                            {megaPlan && (
                                <PricingCard
                                    plan={{ title: megaPlan.plan_name }}
                                    price={formatCurrency(megaPlan.price, megaPlan.country_code)}
                                    tokens={`${megaPlan.token_allocation.toLocaleString()} tokens`}
                                    cost={{ main: 'Save 33%', sub: formatCost(megaPlan.price_pertoken, megaPlan.country_code) }}
                                    features={megaPlanFeatures}
                                    buttonText="Get Started"
                                    buttonLink="/sign-up"
                                    isSuperSave={true}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

// The main application component wrapped with QueryClientProvider
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Price />
        </QueryClientProvider>
    );
};

export default App;
