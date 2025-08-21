import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard = ({ plan, isPopular, isSuperSave, price, tokens, cost, features, buttonText, buttonLink }) => (
    <div className={`rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 relative ${isPopular ? 'bg-primary text-white' : 'bg-white text-gray-800'}`}>
        {isPopular && <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">POPULAR</span>}
        {isSuperSave && <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">SUPER SAVE!</span>}

        <p className="my-2"><span className={`text-2xl font-bold ${isPopular ? 'text-white' : 'text-primary'}`}>{plan.title}</span></p>
        <p className="my-2"><span className={`text-2xl font-bold ${isPopular ? 'text-white' : 'text-primary'}`}>{price}</span></p>
        <h2 className={`text-lg font-semibold ${isPopular ? 'text-gray-200' : 'text-gray-700'} mb-10`}>{tokens}</h2>

        <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
            <p className="font-bold">{cost.main}</p>
            {cost.sub && <p className="text-sm font-medium">{cost.sub}</p>}
        </div>

        <ul className="space-y-3 text-sm flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>{feature}</li>
            ))}
        </ul>
        <Link to={buttonLink} className={`mt-8 w-full block text-center py-2 px-4 rounded-lg font-semibold ${isPopular ? 'bg-white text-primary hover:bg-accent hover:text-white' : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}>
            {buttonText}
        </Link>
    </div>
);

export default PricingCard;
