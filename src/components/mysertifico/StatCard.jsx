// src/components/dashboard/StatCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, iconClass, iconBgColor, iconTextColor, footerText, footerLink, gradient = false }) => {
    const cardClasses = gradient
        ? "bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl shadow-lg flex flex-col justify-between"
        : "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md";

    const titleClasses = gradient ? "text-teal-100 opacity-80" : "text-gray-600 dark:text-gray-400";
    const valueClasses = gradient ? "text-white" : "text-gray-800 dark:text-white";
    const footerClasses = gradient ? "text-white bg-white/20 hover:bg-white/30" : "text-gray-500 dark:text-gray-400";

    return (
        <div className={cardClasses}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-lg ${titleClasses}`}>{title}</h3>
                    {iconClass && (
                        <div className={`p-2 rounded-lg ${iconBgColor}`}>
                            <i className={`${iconClass} text-xl ${iconTextColor}`}></i>
                        </div>
                    )}
                </div>
                <p className={`text-3xl font-bold mt-2 ${valueClasses}`}>{value}</p>
            </div>
            {footerText && (
                <div className="mt-4">
                    {footerLink ? (
                        <Link to={footerLink} className={`block text-center text-sm font-semibold py-2 px-4 rounded-lg transition-colors ${footerClasses}`}>
                            {footerText}
                        </Link>
                    ) : (
                        <p className={`text-sm mt-1 ${footerClasses}`}>{footerText}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatCard;