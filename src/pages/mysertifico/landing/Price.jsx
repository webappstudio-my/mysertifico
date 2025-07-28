// src/pages/mysertifico/PricePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PricingHeader from '../../../components/common/PricingHeader';
import PricingCard from '../../../components/common/PricingCard';

const pricingData = {
    'my': { // Malaysia
        standard: 'RM50',
        premium: 'RM100',
        pro: 'RM200',
    },
    'id': { // Indonesia
        standard: 'Rp76,600',
        premium: 'Rp191,600',
        pro: 'Rp383,200',
    },
};

const Price = () => {
    const [selectedCountry, setSelectedCountry] = useState('my'); // Default to Malaysia
    const [currentPrices, setCurrentPrices] = useState(pricingData['my']);

    useEffect(() => {
        setCurrentPrices(pricingData[selectedCountry]);
    }, [selectedCountry]);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };

    const commonFeatures = [
        'All the same features are available on the Trial Plan.',
    ];

    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24">
                <PricingHeader
                    title="Organisation Pricing Plans"
                    description="Choose the plan that best fits your institution's needs. Subscription prices may vary by country."
                    country={selectedCountry}
                    onCountryChange={handleCountryChange}
                />

                {/* Pricing Section */}
                <section className="pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Trial Plan */}
                            <PricingCard
                                plan="Trial Plan"
                                description="No payment or credit card required"
                                tokens="Free 20 tokens"
                                perRecipientText="1 token per recipient"
                                features={[
                                    'Unlimited Certificates',
                                    'Unlimited Templates',
                                    'Unlimited Logos',
                                    'Unlimited Recipients',
                                    'Unlimited Super Admins',
                                    'Unlimited Issuers',
                                    'Unlimited Verifiers',
                                    'Unlimited Signatories',
                                    'Unlimited Categories',
                                    'QR Code Embedded',
                                ]}
                                buttonText="Start Free Trial"
                                buttonLink="/auth/sign-up"
                            />

                            {/* Standard Plan */}
                            <PricingCard
                                plan="Standard Plan"
                                price={currentPrices.standard}
                                tokens="333 tokens"
                                perRecipientText="≈ 0.15 sen per recipient"
                                features={commonFeatures}
                                buttonText="Register Now"
                                buttonLink="/auth/sign-up"
                            />

                            {/* Premium Plan */}
                            <PricingCard
                                plan="Premium Plan"
                                price={currentPrices.premium}
                                tokens="769 tokens"
                                saveText="Save 13%"
                                perRecipientText="Only ≈ 0.13 sen per recipient"
                                features={commonFeatures}
                                buttonText="Register Now"
                                buttonLink="/auth/sign-up"
                                isPopular={true}
                            />

                            {/* Pro Plan */}
                            <PricingCard
                                plan="Pro Plan"
                                price={currentPrices.pro}
                                tokens="2,000 tokens"
                                saveText="Save 33%"
                                perRecipientText="Only ≈ 0.10 sen per recipient"
                                features={commonFeatures}
                                buttonText="Register Now"
                                buttonLink="/auth/sign-up"
                                isPro={true} // Special flag for "SUPER SAVE!"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Price;