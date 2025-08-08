// src/components/bo/BoSalesSummaryCard.jsx
import React from 'react';

// A simple reusable card for the subscription summaries
const SalesSummaryItem = ({ title, value, change, changeColor, icon, iconBgColor, iconTextColor }) => (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center gap-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className={`p-4 rounded-full flex items-center justify-center ${iconBgColor}`}>
            <i className={`${icon} text-2xl ${iconTextColor}`}></i>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
        </div>
    </div>
);

const BoSalesSummaryCard = () => {
    return (
        <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md lg:col-span-3">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">This Month's Sales Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SalesSummaryItem
                    icon="ri-shopping-cart-2-fill"
                    iconBgColor="bg-blue-100 dark:bg-blue-950 shadow-md"
                    iconTextColor="text-blue-500"
                    title="MySertifico Subscriptions"
                    value="RM 18,750"
                    change="▲ 12.5% vs. previous month"
                    changeColor="text-green-500"
                />
                <SalesSummaryItem
                    icon="ri-wallet-3-fill"
                    iconBgColor="bg-pink-100 dark:bg-pink-950 shadow-md"
                    iconTextColor="text-pink-500"
                    title="MyWall Subscriptions"
                    value="RM 10,250"
                    change="▲ 8.1% vs. previous month"
                    changeColor="text-green-500"
                />
            </div>
        </div>
    );
};

export default BoSalesSummaryCard;