// src/components/dashboard/DashboardNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png'; // Adjust the path as necessary

const DashboardNavbar = ({ onSidebarToggle, theme, onThemeToggle }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const profileMenuButton = document.getElementById('profile-menu-button');
            const profileMenu = document.getElementById('profile-menu');
            if (profileMenu && !profileMenu.contains(event.target) && profileMenuButton && !profileMenuButton.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        // In a real application, clear authentication tokens/session
        navigate('/'); // Redirect to home page
    };

    return (
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
                        <button id="profile-menu-button" className="flex items-center space-x-2" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                            <img className="h-9 w-9 rounded-full object-cover" src="https://i.pravatar.cc/150?u=admin" alt="Admin" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/0d9488/ffffff?text=A'; }} />
                            <div className="hidden md:block text-left">
                                <div className="text-sm font-semibold text-gray-800 dark:text-white">Fikri Nabil</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                            </div>
                        </button>
                        <div id="profile-menu" className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileMenuOpen ? '' : 'hidden'}`}>
                            <div className="py-1">
                                <Link to="/dashboard/my-profile" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
                                    <i className="ri-user-line mr-3"></i>My Profile
                                </Link>
                                <Link to="/dashboard/change-password" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileMenuOpen(false)}>
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

export default DashboardNavbar;