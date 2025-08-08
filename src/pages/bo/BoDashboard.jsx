// src/pages/bo/BoDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoStatsCard from '../../components/bo/BoStatsCard';
import BoMonthlySalesCard from '../../components/bo/BoMonthlySalesCard';
import BoRecentActivitiesCard from '../../components/bo/BoRecentActivitiesCard';
import BoSalesSummaryCard from '../../components/bo/BoSalesSummaryCard';

const BoDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Effect to apply theme class to html element
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }, [theme]);

    // Toggle theme
    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'
                    }`}
            >
                <BoNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={handleThemeToggle} />
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hello, Fikri Nabil!</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, here's a summary of the latest activities.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <BoStatsCard
                                title="Certificates Issued"
                                value="15,432"
                                icon="ri-award-fill"
                                iconBgColor="bg-teal-100 dark:bg-teal-950 shadow-md"
                                iconTextColor="text-primary"
                            />
                            <BoStatsCard
                                title="Ready Templates"
                                value="280"
                                icon="ri-file-text-fill"
                                iconBgColor="bg-purple-100 dark:bg-purple-950 shadow-md"
                                iconTextColor="text-purple-500"
                            />
                            <BoStatsCard
                                title="Registered Organizations"
                                value="356"
                                icon="ri-school-fill"
                                iconBgColor="bg-indigo-100 dark:bg-indigo-950 shadow-md"
                                iconTextColor="text-indigo-500"
                            />
                            <BoStatsCard
                                title="Active Users"
                                value="5,200"
                                icon="ri-user-fill"
                                iconBgColor="bg-yellow-100 dark:bg-yellow-950 shadow-md"
                                iconTextColor="text-yellow-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <BoSalesSummaryCard />
                            <BoMonthlySalesCard theme={theme} />
                            <BoRecentActivitiesCard />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BoDashboard;