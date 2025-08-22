// src/pages/mysertifico/DashboardPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/dashboard/Sidebar';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import StatCard from '../../../components/dashboard/StatCard';
import RecentActivityItem from '../../../components/dashboard/RecentActivityItem';
import QuickActionItem from '../../../components/dashboard/QuickActionItem';

const Dashboard = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />

                {/* ===== Page Content Start ===== */}
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, Fikri Nabil!</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Here's a summary of your organization's activity.</p>
                        </div>

                        {/* Call to Action: Create Certificate */}
                        <div className="mb-8">
                            <Link to="/dashboard/create-certificate" className="block w-full text-center p-8 bg-gradient-to-r from-accent to-yellow-400 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <i className="ri-add-circle-fill text-5xl"></i>
                                    <div>
                                        <h2 className="text-2xl font-bold">Create New Certificate</h2>
                                        <p className="text-yellow-100">Start issuing new certificates to your recipients now.</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Available Tokens"
                                value="8,750"
                                iconClass="ri-copper-coin-line"
                                iconBgColor="bg-white/10"
                                iconTextColor="text-teal-100 opacity-80"
                                footerText="Top-up Tokens"
                                footerLink="/dashboard/topup-token"
                                gradient={true}
                            />
                            <StatCard
                                title="Certificates Issued"
                                value="1,250"
                                iconClass="ri-award-line"
                                iconBgColor="bg-blue-100 dark:bg-blue-900/50"
                                iconTextColor="text-blue-500"
                                footerText="+15% from last month"
                            />
                            <StatCard
                                title="Total Recipients"
                                value="4,820"
                                iconClass="ri-group-line"
                                iconBgColor="bg-green-100 dark:bg-green-900/50"
                                iconTextColor="text-green-500"
                                footerText="+82 new recipients"
                            />
                            <StatCard
                                title="Active Templates"
                                value="12"
                                iconClass="ri-layout-grid-line"
                                iconBgColor="bg-yellow-100 dark:bg-yellow-900/50"
                                iconTextColor="text-yellow-500"
                                footerText="of 25 templates"
                            />
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <RecentActivityItem
                                        iconClass="ri-file-add-line"
                                        iconColor="text-primary"
                                        text={<strong>150 certificates</strong> + ' were issued for "Digital Marketing Webinar".'}
                                        time="2 hours ago"
                                    />
                                    <RecentActivityItem
                                        iconClass="ri-user-add-line"
                                        iconColor="text-green-500"
                                        text={<strong>50 new recipients</strong> + ' were added via CSV import.'}
                                        time="1 day ago"
                                    />
                                    <RecentActivityItem
                                        iconClass="ri-award-line"
                                        iconColor="text-blue-500"
                                        text={'Certificate for ' + <strong>Ahmad Zaki</strong> + ' was viewed.'}
                                        time="3 days ago"
                                    />
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <QuickActionItem
                                        iconClass="ri-user-add-line"
                                        iconColor="text-green-500"
                                        text="Add Recipients"
                                        link="/dashboard/settings/recipients"
                                    />
                                    <QuickActionItem
                                        iconClass="ri-gallery-line"
                                        iconColor="text-yellow-500"
                                        text="View Templates"
                                        link="/dashboard/templates"
                                    />
                                    <QuickActionItem
                                        iconClass="ri-image-line"
                                        iconColor="text-purple-500"
                                        text="View Logos & Badges"
                                        link="/dashboard/logos-badges"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* ===== Page Content End ===== */}
            </div>
        </div>
    );
};

export default Dashboard;
