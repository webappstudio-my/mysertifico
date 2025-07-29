// src/components/dashboard/RecentActivityItem.jsx
import React from 'react';

const RecentActivityItem = ({ iconClass, iconColor, text, time }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                <i className={`${iconClass} ${iconColor}`}></i>
            </div>
            <div className="flex-grow">
                <p className="text-gray-800 dark:text-white">{text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
            </div>
        </div>
    );
};

export default RecentActivityItem;