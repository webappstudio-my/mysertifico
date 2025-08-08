// src/components/bo/BoStatsCard.jsx
import React from 'react';

const BoStatsCard = ({ title, value, icon, iconBgColor, iconTextColor }) => {
    return (
        <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md flex items-center gap-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className={`p-4 rounded-full flex items-center justify-center ${iconBgColor}`}>
                <i className={`${icon} text-2xl ${iconTextColor}`}></i>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

export default BoStatsCard;