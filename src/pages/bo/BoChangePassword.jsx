import React, { useState } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';

const BoChangePassword = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // State variables for password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage('');

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setIsError(true);
            setErrorMessage('All fields are required.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setIsError(true);
            setErrorMessage("New passwords don't match. Please try again.");
            return;
        }

        if (currentPassword === newPassword) {
            setIsError(true);
            setErrorMessage("New password cannot be the same as the current password.");
            return;
        }

        // Simulate an API call to change the password
        console.log('Changing password...');
        setTimeout(() => {
            console.log('Password changed successfully!');
            setIsSuccess(true);
            // Clear form fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }, 1500);
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

            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} headerTitle="Change Password" />

                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md p-6 sm:p-8 max-w-xl mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 mb-5">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Update Your Password</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">Ensure your account is using a long, random password to stay secure</p>
                                    </div>
                                </div>
                                {isSuccess && (
                                    <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3">
                                        <i className="ri-checkbox-circle-line text-md mt-0.5"></i>
                                        <span>Password has been successfully changed!</span>
                                    </div>
                                )}
                                {isError && (
                                    <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3">
                                        <i className="ri-alert-line text-md mt-0.5"></i>
                                        <span>{errorMessage}</span>
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10" // Add padding for the icon
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                            >
                                                <i className={`ri-${showCurrentPassword ? 'eye' : 'eye-off'}-line`}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                id="newPassword"
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                            >
                                                <i className={`ri-${showNewPassword ? 'eye' : 'eye-off'}-line`}></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmNewPassword ? 'text' : 'password'}
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                            >
                                                <i className={`ri-${showConfirmNewPassword ? 'eye' : 'eye-off'}-line`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        id="change-password-button"
                                        className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition-colors"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BoChangePassword;