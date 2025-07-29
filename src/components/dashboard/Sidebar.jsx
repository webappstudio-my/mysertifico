// src/components/dashboard/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [openSubmenus, setOpenSubmenus] = useState({});

    useEffect(() => {
        // No longer need a specific resize handler here for closing on LG,
        // as the sidebar will always be hidden unless `isOpen` is true.
        // The `main-content` will handle the margin.
    }, []);

    const toggleSubmenu = (menuId) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [menuId]: !prev[menuId],
        }));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        // In a real application, clear authentication tokens/session
        navigate('/');
    };

    const getNavLinkClass = ({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded-lg transition-colors ${isActive
            ? 'bg-primary-dark text-white shadow-md'
            : 'hover:bg-gray-700 text-gray-300 hover:text-white'
        }`;

    const getSubmenuLinkClass = ({ isActive }) =>
        `block py-2 px-4 rounded-lg text-sm transition-colors ${isActive
            ? 'text-primary-light bg-gray-700'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`;

    return (
        <aside
            id="sidebar"
            className={`sidebar fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 dark:bg-gray-950 text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`} // Removed lg:translate-x-0
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6">
                <h2 className="font-poppins text-2xl font-bold text-white">Menu</h2>
                <button id="close-sidebar" className="text-gray-400 hover:text-white lg:hidden" onClick={onClose}>
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
                            className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            onClick={() => toggleSubmenu('submenu-gallery')}
                        >
                            <span className="flex items-center"><i className="ri-gallery-line mr-3 text-lg"></i><span>Gallery</span></span>
                            <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-gallery'] ? 'rotate-180' : ''}`}></i>
                        </button>
                        <ul id="submenu-gallery" className={`${openSubmenus['submenu-gallery'] ? '' : 'hidden'} py-2 space-y-1 pl-8`}>
                            <li><NavLink to="/dashboard/templates" className={getSubmenuLinkClass} onClick={onClose}>Templates</NavLink></li>
                            <li><NavLink to="/dashboard/logos-badges" className={getSubmenuLinkClass} onClick={onClose}>Logos & Badges</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to="/dashboard/certificates" className={getNavLinkClass} onClick={onClose}>
                            <i className="ri-award-line mr-3 text-lg"></i>
                            <span>Certificates</span>
                        </NavLink>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            onClick={() => toggleSubmenu('submenu-settings')}
                        >
                            <span className="flex items-center"><i className="ri-settings-3-line mr-3 text-lg"></i><span>Settings</span></span>
                            <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-settings'] ? 'rotate-180' : ''}`}></i>
                        </button>
                        <ul id="submenu-settings" className={`${openSubmenus['submenu-settings'] ? '' : 'hidden'} py-2 space-y-1 pl-8`}>
                            <li><NavLink to="/dashboard/settings/organisation" className={getSubmenuLinkClass} onClick={onClose}>Organisation</NavLink></li>
                            <li><NavLink to="/dashboard/settings/logos" className={getSubmenuLinkClass} onClick={onClose}>Logos</NavLink></li>
                            <li><NavLink to="/dashboard/settings/users" className={getSubmenuLinkClass} onClick={onClose}>Users</NavLink></li>
                            <li><NavLink to="/dashboard/settings/templates" className={getSubmenuLinkClass} onClick={onClose}>Templates</NavLink></li>
                            <li><NavLink to="/dashboard/settings/recipients" className={getSubmenuLinkClass} onClick={onClose}>Recipients</NavLink></li>
                            <li><NavLink to="/dashboard/settings/account" className={getSubmenuLinkClass} onClick={onClose}>Account</NavLink></li>
                        </ul>
                    </li>
                    <li className="pt-4 mt-4 border-t border-gray-700">
                        <a href="#" id="logout-sidebar" className="flex items-center py-2.5 px-4 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors" onClick={handleLogout}>
                            <i className="ri-logout-box-r-line mr-3 text-lg"></i>
                            <span>Log Out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;