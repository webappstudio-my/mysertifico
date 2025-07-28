// src/components/common/PricingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard = ({
    plan,
    price,
    tokens,
    description,
    saveText, // e.g., "Save 13%"
    perRecipientText, // e.g., "≈ 0.15 sen per recipient"
    features,
    buttonText,
    buttonLink,
    isPopular = false,
    isPro = false, // To handle the "SUPER SAVE!" tag
}) => {
    const cardClasses = isPopular
        ? "bg-primary text-white rounded-xl shadow-2xl p-6 flex flex-col relative transform hover:-translate-y-2 transition-transform duration-300"
        : "bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform hover:-translate-y-2 transition-transform duration-300";

    const buttonClasses = isPopular
        ? "mt-8 w-full block text-center bg-white text-primary py-2 px-4 rounded-lg hover:bg-accent hover:text-white font-semibold"
        : "mt-8 w-full block text-center border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white font-semibold";

    const textColor = isPopular ? "text-white" : "text-primary";
    const featureTextColor = isPopular ? "text-white" : "text-gray-600"; // Adjust based on HTML

    return (
        <div className={cardClasses}>
            {isPopular && (
                <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">POPULAR</span>
            )}
            {isPro && ( // Only for Pro plan
                <span className="absolute top-0 right-4 bg-accent text-white text-xs px-3 py-1 rounded-b-lg font-bold">SUPER SAVE!</span>
            )}

            <p className="my-2"><span className={`text-2xl font-bold ${textColor}`}>{plan}</span></p>
            {price && <p className="my-2"><span className={`text-2xl font-bold ${textColor}`}>{price}</span></p>}
            {tokens && <h2 className={`text-lg font-semibold mb-10 ${isPopular ? "text-white" : "text-gray-700"}`}>{tokens}</h2>}
            {description && <p className={`text-sm ${isPopular ? "text-teal-100" : "text-gray-500"} mb-6`}>{description}</p>}

            {(saveText || perRecipientText) && (
                <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-6 shadow-md">
                    {saveText && <p className="font-bold">{saveText}</p>}
                    {perRecipientText && <p className="text-sm font-medium">{perRecipientText}</p>}
                </div>
            )}

            <ul className={`space-y-3 text-sm ${featureTextColor} flex-grow`}>
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center"><i className="ri-checkbox-circle-fill text-accent mr-2"></i>{feature}</li>
                ))}
            </ul>
            <Link to={buttonLink} className={buttonClasses}>
                {buttonText}
            </Link>
        </div>
    );
};

export default PricingCard;