// src/components/dashboard/DashboardNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png'; // Adjust the path as necessary
import ConfirmationModal from '../common/ConfirmationModal'; // Assuming the modal is in the same components folder

// Simple Toast Notification Component
const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-14 right-6 bg-green-600/50 border border-green-500/30 text-green-900 dark:text-green-200 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3 shadow-md z-[150]">
            {message}
        </div>
    );
};

const DashboardNavbar = ({ onSidebarToggle, theme, onThemeToggle }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(''); // State for toast message

    const profileMenuRef = useRef(null);
    const profileMenuButtonRef = useRef(null);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                isProfileMenuOpen &&
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                profileMenuButtonRef.current &&
                !profileMenuButtonRef.current.contains(event.target)
            ) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isProfileMenuOpen]);

    const handleLogout = (e) => {
        e.preventDefault();
        setIsProfileMenuOpen(false);
        setIsLogoutModalOpen(true);
    };

    // Updated performLogout to show toast before navigating
    const performLogout = () => {
        setIsLogoutModalOpen(false);
        setToastMessage('You have been logged out successfully. Redirecting to Sign In...');

        // In a real app, you would clear auth tokens here.

        setTimeout(() => {
            setToastMessage('');
            navigate('/auth/sign-in');
        }, 2000); // Wait 2 seconds before redirecting
    };

    return (
        <>
            <Toast message={toastMessage} show={!!toastMessage} />
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <button id="sidebar-toggle" className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" onClick={onSidebarToggle}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                        <Link to="/dashboard" className="flex items-center gap-x-2">
                            <img src={logo} alt="MySertifico Logo" className="h-8 w-8 rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/32x32/0d9488/ffffff?text=M'; }} />
                            <span className="font-poppins text-2xl font-bold text-primary hidden sm:block">MySertifico</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button id="theme-toggle" className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={onThemeToggle}>
                            <i className={`ri-moon-line text-2xl ${theme === 'dark' ? 'hidden' : 'block'}`}></i>
                            <i className={`ri-sun-line text-2xl ${theme === 'dark' ? 'block' : 'hidden'}`}></i>
                        </button>
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button ref={profileMenuButtonRef} id="profile-menu-button" className="flex items-center space-x-2" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                                
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-semibold text-gray-800 dark:text-white">Fikri Nabil</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                                </div>
                            </button>
                            <div ref={profileMenuRef} id="profile-menu" className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileMenuOpen ? '' : 'hidden'}`}>
                                <div className="py-1">
                                    <Link to="/my-profile" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
                                        <i className="ri-user-line mr-3"></i>My Profile
                                    </Link>
                                    <Link to="/change-password" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
                                        <i className="ri-lock-password-line mr-3"></i>Change Password
                                    </Link>
                                    <hr className="border-gray-200 dark:border-gray-700 my-1" />
                                    <a href="#" id="logout-navbar" className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLogout}>
                                        <i className="ri-logout-box-r-line mr-3"></i>Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={performLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
                iconClass="ri-logout-box-r-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Log Out"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />
        </>
    );
};

export default DashboardNavbar;
