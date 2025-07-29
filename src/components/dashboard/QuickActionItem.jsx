// src/components/dashboard/QuickActionItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionItem = ({ iconClass, iconColor, text, link }) => {
    return (
        <Link to={link} className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
            <i className={`${iconClass} ${iconColor} text-xl`}></i>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{text}</span>
        </Link>
    );
};

export default QuickActionItem;