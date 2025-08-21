import React, { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PricingHeader from '../../../components/common/PricingHeader';
import PricingCard from '../../../components/common/PricingCard';

const pricingData = {
    'my': { standard: 'RM50', premium: 'RM100', pro: 'RM200', standard_cost: '≈ 15.0 sen per recipient', premium_cost: 'Only ≈ 13.0 sen per recipient', pro_cost: 'Only ≈ 10.0 sen per recipient' },
    'id': { standard: 'Rp 192,000', premium: 'Rp 383,000', pro: 'Rp 766,000', standard_cost: '≈ Rp 577 per recipient', premium_cost: 'Only ≈ Rp 498 per recipient', pro_cost: 'Only ≈ Rp 383 per recipient' },
    'sg': { standard: 'S$15', premium: 'S$29', pro: 'S$58', standard_cost: '≈ 4.5¢ per recipient', premium_cost: 'Only ≈ 3.8¢ per recipient', pro_cost: 'Only ≈ 2.9¢ per recipient' },
    'bn': { standard: 'B$15', premium: 'B$29', pro: 'B$58', standard_cost: '≈ 4.5¢ per recipient', premium_cost: 'Only ≈ 3.8¢ per recipient', pro_cost: 'Only ≈ 2.9¢ per recipient' },
    'au': { standard: 'A$16', premium: 'A$32', pro: 'A$64', standard_cost: '≈ 4.8¢ per recipient', premium_cost: 'Only ≈ 4.2¢ per recipient', pro_cost: 'Only ≈ 3.2¢ per recipient' }
};

const Price = () => {
    const [selectedCountry, setSelectedCountry] = useState('my');
    const [prices, setPrices] = useState(pricingData.my);

    useEffect(() => {
        setPrices(pricingData[selectedCountry]);
    }, [selectedCountry]);

    return (
        <div className="bg-gradient-to-br from-primary-dark to-primary text-white">
            <Header />
            <main className="pt-24">
                <PricingHeader onCountryChange={setSelectedCountry} />
                <section className="pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <PricingCard
                                plan={{ title: 'Starter Pack' }}
                                price="14-day free"
                                tokens="Free 20 tokens"
                                cost={{ main: '1 token per recipient' }}
                                features={[
                                    'Unlimited Certificates', 'Unlimited Templates', 'Unlimited Logos',
                                    'Unlimited Super Admins', 'Unlimited Issuers', 'Unlimited Verifiers',
                                    'Unlimited Signatories', '20 Certificate Recipients', 'QR Code Embedded'
                                ]}
                                buttonText="Start Free Trial"
                                buttonLink="/sign-up"
                            />
                            <PricingCard
                                plan={{ title: 'Basic Pack' }}
                                price={prices.standard}
                                tokens="333 tokens"
                                cost={{ main: prices.standard_cost }}
                                features={['All the same features are available on the Trial Plan.', '333 Certificate Recipients']}
                                buttonText="Get Started"
                                buttonLink="/sign-up"
                            />
                            <PricingCard
                                plan={{ title: 'Value Pack' }}
                                price={prices.premium}
                                tokens="769 tokens"
                                cost={{ main: 'Save 13%', sub: prices.premium_cost }}
                                features={['All the same features are available on the Trial Plan.', '769 Certificate Recipients']}
                                buttonText="Get Started"
                                buttonLink="/sign-up"
                                isPopular={true}
                            />
                            <PricingCard
                                plan={{ title: 'Mega Pack' }}
                                price={prices.pro}
                                tokens="2,000 tokens"
                                cost={{ main: 'Save 33%', sub: prices.pro_cost }}
                                features={['All the same features are available on the Trial Plan.', '2,000 Certificate Recipients']}
                                buttonText="Get Started"
                                buttonLink="/sign-up"
                                isSuperSave={true}
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
