// src/components/dashboard/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../common/ConfirmationModal';

// Simple Toast Notification Component
const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-14 right-6 bg-green-800/50 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3 shadow-md z-[150]">
            {message}
        </div>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [openSubmenus, setOpenSubmenus] = useState({});
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(''); // State for toast message

    const toggleSubmenu = (menuId) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [menuId]: !prev[menuId],
        }));
    };

    const handleLogout = (e) => {
        e.preventDefault();
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

    const getNavLinkClass = ({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded-lg transition-colors ${
            isActive
                ? 'bg-primary text-white dark:bg-primary-dark shadow-md' // Updated for both modes
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700' // Now theme-aware
        }`;

    const getSubmenuLinkClass = ({ isActive }) =>
        `block py-2 px-4 rounded-lg text-sm transition-colors ${
            isActive
                ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' // Now theme-aware
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700' // Now theme-aware
        }`;

    return (
        <>
            <Toast message={toastMessage} show={!!toastMessage} />
            <aside
                id="sidebar"
                className={`sidebar fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`} // Sidebar now has a light background by default
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6">
                    <h2 className="font-poppins text-2xl font-bold text-gray-800 dark:text-white">Menu</h2>
                    <button id="close-sidebar" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white lg:hidden" onClick={onClose}>
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                {/* Sidebar Navigation */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="/dashboard" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-dashboard-3-line mr-3 text-lg"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => toggleSubmenu('submenu-gallery')}
                            >
                                <span className="flex items-center"><i className="ri-gallery-line mr-3 text-lg"></i><span>Gallery</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-gallery'] ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-gallery" className={`${openSubmenus['submenu-gallery'] ? '' : 'hidden'} py-2 space-y-1 pl-8`}>
                                <li><NavLink to="/template-list" className={getSubmenuLinkClass} onClick={onClose}>Templates</NavLink></li>
                                <li><NavLink to="/logos-badges" className={getSubmenuLinkClass} onClick={onClose}>Logos & Badges</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="/admin/certificate-list" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-award-line mr-3 text-lg"></i>
                                <span>Certificates</span>
                            </NavLink>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => toggleSubmenu('submenu-settings')}
                            >
                                <span className="flex items-center"><i className="ri-settings-3-line mr-3 text-lg"></i><span>Settings</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-settings'] ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-settings" className={`${openSubmenus['submenu-settings'] ? '' : 'hidden'} py-2 space-y-1 pl-8`}>
                                <li><NavLink to="/settings/organization-settings" className={getSubmenuLinkClass} onClick={onClose}>Organization</NavLink></li>
                                <li><NavLink to="/dashboard/settings/logos" className={getSubmenuLinkClass} onClick={onClose}>Logos</NavLink></li>
                                <li><NavLink to="/dashboard/settings/users" className={getSubmenuLinkClass} onClick={onClose}>Users</NavLink></li>
                                <li><NavLink to="/dashboard/settings/templates" className={getSubmenuLinkClass} onClick={onClose}>Templates</NavLink></li>
                                <li><NavLink to="/dashboard/settings/recipients" className={getSubmenuLinkClass} onClick={onClose}>Recipients</NavLink></li>
                                <li><NavLink to="/dashboard/settings/account" className={getSubmenuLinkClass} onClick={onClose}>Account</NavLink></li>
                            </ul>
                        </li>
                        <li className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            <a href="#" id="logout-sidebar" className="flex items-center py-2.5 px-4 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors" onClick={handleLogout}>
                                <i className="ri-logout-box-r-line mr-3 text-lg"></i>
                                <span>Log Out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
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

export default Sidebar;
