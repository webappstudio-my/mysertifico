import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoConfirmationModal from './BoConfirmationModal'; // Assuming the modal is in the same components folder

// Simple Toast Notification Component
const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-14 right-6 bg-green-600/50 border border-green-500/30 text-green-900 dark:text-green-200 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3 shadow-md z-[150]">
            {message}
        </div>
    );
};

const BoNavbar = ({ onSidebarToggle, headerTitle }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [toastMessage, setToastMessage] = useState(''); // State for toast message

    const profileMenuRef = useRef(null);
    const profileMenuButtonRef = useRef(null);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

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
            navigate('/bo/sign-in');
        }, 2000); // Wait 2 seconds before redirecting
    };

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            <Toast message={toastMessage} show={!!toastMessage} />
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <button
                            id="sidebar-toggle"
                            className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={onSidebarToggle}
                        >
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                        <div className="flex items-center gap-x-2">
                            <span className="hidden md:block font-poppins text-2xl font-bold text-gray-800 dark:text-white">
                                {headerTitle || 'Dashboard'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                            onClick={toggleTheme}
                        >
                            {theme === 'light' ? (
                                <i className="ri-moon-line text-2xl"></i>
                            ) : (
                                <i className="ri-sun-line text-2xl"></i>
                            )}
                        </button>

                        <div className="relative">
                            <button
                                id="profile-menu-button"
                                className="flex items-center space-x-2"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                ref={profileMenuButtonRef}
                            >
                                <img className="h-9 w-9 rounded-full object-cover" src="https://i.pravatar.cc/150?u=admin" alt="Admin" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/0d9488/ffffff?text=A'; }} />
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-semibold text-gray-800 dark:text-white">Fikri Nabil</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                                </div>
                            </button>
                            <div
                                id="profile-menu"
                                ref={profileMenuRef}
                                className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileMenuOpen ? '' : 'hidden'}`}
                            >
                                <div className="py-1">
                                    <Link to="/bo/my-profile" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
                                        <i className="ri-user-line mr-3"></i>My Profile
                                    </Link>
                                    <Link to="/bo/change-password" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
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
            <BoConfirmationModal
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

export default BoNavbar;
