import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';

const ViewUser = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            
            <div className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <DashboardNavbar 
                    onSidebarToggle={handleSidebarToggle}
                    theme={theme}
                    onThemeToggle={onThemeToggle}
                />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">View User</h1>
                            <Link 
                                to="/dashboard/settings/users" 
                                className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex-shrink-0" 
                                title="Back"
                            >
                                <i className="ri-arrow-left-line text-xl"></i>
                            </Link>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h3>
                                    <div className="flex flex-col items-center">
                                        <img 
                                            src="https://i.pravatar.cc/300?u=robaei" 
                                            alt="Profile Picture" 
                                            className="w-48 h-48 rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Details</h3>
                                    <dl className="space-y-4 text-sm">
                                        <div>
                                            <dt className="font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                                            <dd className="mt-1 font-semibold text-gray-900 dark:text-white">Robaei Wan Mahmood</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                            <dd className="mt-1 text-gray-900 dark:text-white">robaei@example.com</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500 dark:text-gray-400">Position</dt>
                                            <dd className="mt-1 text-gray-900 dark:text-white">Super Admin</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                            <dd className="mt-1">
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                    Active
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <Link 
                                    to="/edit-user" 
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center" 
                                    title="Edit User"
                                >
                                    <i className="ri-pencil-line mr-2"></i>Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ViewUser;