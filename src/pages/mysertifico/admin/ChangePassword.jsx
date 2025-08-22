import { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';

const ChangePassword = ({ theme, onThemeToggle }) => {
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

    // Password validate function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasSymbols = /[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        let strength = 0;
        let errors = [];

        if (password.length >= minLength) {
            strength += 25;
        } else {
            errors.push(`${minLength} characters long`);
        }

        if (hasSymbols) {
            strength += 25;
        } else {
            errors.push('one special character (@, #, $, etc.)');
        }

        if (hasUpperCase) {
            strength += 25;
        } else {
            errors.push('one uppercase letter');
        }

        if (hasLowerCase && hasNumbers) {
            strength += 25;
        } else if (!hasLowerCase) {
            errors.push('one lowercase letter');
        } else if (!hasNumbers) {
            errors.push('one number');
        }

        return { strength, errors, isValid: errors.length === 0 }
    };

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

        // Validate new password using the validatePassword function
        const newPasswordValidation = validatePassword(newPassword);
        if (!newPasswordValidation.isValid) {
            setIsError(true);
            setErrorMessage(`New password must have at least: ${newPasswordValidation.errors.join(', ')}`);
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

    // Calculate password strength for display
    const passwordStrength = newPassword ? validatePassword(newPassword).strength : 0;
    // const newPasswordErrors = newPassword ? validatePassword(newPassword).errors : [];

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Password strength text and color
    const getPasswordStrengthInfo = () => {
        if (passwordStrength <= 25) return { text: 'Weak', color: 'text-red-400' };
        if (passwordStrength <= 50) return { text: 'Fair', color: 'text-amber-400' };
        if (passwordStrength <= 75) return { text: 'Good', color: 'text-blue-400' };
        return { text: 'Strong', color: 'text-green-500' };
    };

    const strengthInfo = getPasswordStrengthInfo();

    // Helper function to determine strength bar color
    const getStrengthBarColor = (strength) => {
        if (strength === 0) return 'w-0';
        if (strength <= 25) return 'bg-red-500 w-1/4';
        if (strength <= 50) return 'bg-amber-500 w-2/4';
        if (strength <= 75) return 'bg-blue-500 w-3/4';
        return 'bg-green-500 w-full';
    };

    return (
        <div className="flex min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />

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
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
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
                                        {/* Password Strength Indicator and Requirements */}
                                        {newPassword && (
                                            <div className="mt-2">
                                                {/* Password Strength Bar */}
                                                <div className='flex justify-between items-center mb-1'>
                                                    <span className='text-xs font-medium text-gray-700 dark:text-gray-200'>Password Strength</span>
                                                    <span className={`text-xs font-medium ${strengthInfo.color}`}>
                                                        {strengthInfo.text}
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-300 rounded-full ${getStrengthBarColor(passwordStrength)}`}
                                                        style={{ width: `${passwordStrength}%` }}
                                                    ></div>
                                                </div>

                                                {/* Password Requirements */}
                                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <div className="space-y-1">
                                                        <div className="font-medium text-gray-700 dark:text-gray-200">Password must contain at least:</div>
                                                        <div className="ml-2 space-y-0.5">
                                                            <div className={newPassword?.length >= 8 ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                                                • 8 characters
                                                            </div>
                                                            <div className={/[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                                                • One uppercase letter
                                                            </div>
                                                            <div className={/[a-z]/.test(newPassword) ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                                                • One lowercase letter
                                                            </div>
                                                            <div className={/\d/.test(newPassword) ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                                                • One number
                                                            </div>
                                                            <div className={/[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword) ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}>
                                                                • One symbol (@, #, $, %, etc.)
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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

export default ChangePassword;