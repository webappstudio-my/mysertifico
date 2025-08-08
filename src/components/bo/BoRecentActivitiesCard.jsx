// src/components/bo/BoRecentActivitiesCard.jsx
import React from 'react';

const activities = [
    { id: 1, text: 'New user registered', user: 'John Doe', time: '1 min ago', icon: 'ri-user-add-line', iconColor: 'text-green-500' },
    { id: 2, text: 'New organisation added', user: 'Tech Solutions', time: '5 hours ago', icon: 'ri-school-line', iconColor: 'text-blue-500' },
    { id: 3, text: 'Subscription payment processed', user: 'Acme Corp', time: '1 day ago', icon: 'ri-money-dollar-circle-line', iconColor: 'text-yellow-500' },
    { id: 4, text: 'New template created', user: 'Jane Smith', time: '2 days ago', icon: 'ri-file-add-line', iconColor: 'text-purple-500' },
    { id: 5, text: 'API key generated', user: 'Dev Team', time: '3 days ago', icon: 'ri-key-2-line', iconColor: 'text-gray-500' },
];

const BoRecentActivitiesCard = () => {
    return (
        <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md md:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {activities.map(activity => (
                    <li key={activity.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <i className={`${activity.icon} text-xl ${activity.iconColor}`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{activity.text}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.user}</p>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoRecentActivitiesCard;