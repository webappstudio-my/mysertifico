import React from 'react';

const PricingHeader = ({ onCountryChange }) => (
    <section className="py-16">
        <div className="container mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Organization Pricing Plans</h1>
            <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">Choose the plan that best fits your institution's needs.<br />Subscription prices may vary by country.</p>
            <div className="mt-8 max-w-xs mx-auto">
                <label htmlFor="country-select" className="block text-sm font-medium text-teal-200 mb-2">Check the price for your country:</label>
                <select
                    id="country-select"
                    onChange={(e) => onCountryChange(e.target.value)}
                    className="w-full bg-white/20 border-white/30 rounded-lg py-2 px-4 text-white focus:ring-accent focus:border-accent"
                >
                    <option className='text-primary font-medium' value="my">Malaysia</option>
                    <option className='text-primary font-medium' value="id">Indonesia</option>
                    <option className='text-primary font-medium' value="sg">Singapore</option>
                    <option className='text-primary font-medium' value="bn">Brunei</option>
                    <option className='text-primary font-medium' value="au">Australia</option>
                </select>
            </div>
        </div>
    </section>
);

export default PricingHeader;
