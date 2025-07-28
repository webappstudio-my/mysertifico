// src/components/common/PricingPageHeader.jsx
import React from 'react';

const PricingHeader = ({ title, description, country, onCountryChange }) => {
    return (
        <section className="py-16">
            <div className="container mx-auto text-center px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{title}</h1>
                <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">{description}</p>
                {/* Country Price Checker */}
                <div className="mt-8 max-w-xs mx-auto">
                    <label htmlFor="country-select" className="block text-sm font-medium text-teal-200 mb-2">Check the price for your country:</label>
                    <select
                        id="country-select"
                        className="w-full bg-white/20 border-white/30 rounded-lg py-2 px-4 text-white focus:ring-accent focus:border-accent"
                        value={country}
                        onChange={(e) => onCountryChange(e.target.value)}
                    >
                        <option value="my" className='text-primary font-semibold'>Malaysia</option>
                        <option value="id" className='text-primary font-semibold'>Indonesia</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default PricingHeader;