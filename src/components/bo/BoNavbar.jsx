import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Added a new prop 'headerTitle' to the component
const BoNavbar = ({ onSidebarToggle, headerTitle }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Refs for detecting clicks outside the profile menu
    const profileMenuRef = useRef(null);
    const profileMenuButtonRef = useRef(null);

    // Effect for handling the theme
    useEffect(() => {
        // Apply the theme class to the document's root element
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Save the theme to local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect for handling clicks outside the profile menu
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // If the profile menu is open and the click is outside of the menu and the button, close the menu.
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

        // Add the event listener to the document
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isProfileMenuOpen]);

    const handleLogout = (e) => {
        e.preventDefault();
        // In a real app, you would clear auth tokens, user data, etc.
        navigate('/');
    };

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    {/* Sidebar Toggle Button */}
                    <button
                        id="sidebar-toggle"
                        className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                        onClick={onSidebarToggle}
                    >
                        <i className="ri-menu-line text-2xl"></i>
                    </button>
                    {/* Logo/Brand Name now shows the dynamic headerTitle */}
                    <div className="flex items-center gap-x-2">
                        <span className="hidden md:block font-poppins text-2xl font-bold text-gray-800 dark:text-white">
                            {headerTitle || 'Dashboard'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
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

                    {/* Profile Dropdown */}
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
                                <Link to="/bo/dashboard/my-profile" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
                                    <i className="ri-user-line mr-3"></i>My Profile
                                </Link>
                                <Link to="/bo/dashboard/change-password" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
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
    );
};

export default BoNavbar;