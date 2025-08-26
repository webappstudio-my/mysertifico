import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png'; // Adjust the path as necessary
import BoConfirmationModal from './BoConfirmationModal'; // Assuming the modal is in the same components folder

// Simple Toast Notification Component
const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-14 right-6 bg-green-800/50 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3 shadow-md z-[150]">
            {message}
        </div>
    );
};

const BoSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [openSubmenus, setOpenSubmenus] = useState({
        'submenu-admin': true,
        'submenu-plans': true,
    });
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
            navigate('/bo/sign-in');
        }, 2000); // Wait 2 seconds before redirecting
    };

    const getNavLinkClass = ({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded-lg transition-colors ${isActive
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`;

    const getSubmenuLinkClass = ({ isActive }) =>
        `flex items-center gap-3 block py-2 px-4 rounded-lg text-sm transition-colors w-full ${isActive
            ? 'bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        }`;

    const getNestedSubmenuLinkClass = ({ isActive }) =>
        `block py-2 px-4 rounded-lg text-xs transition-colors w-full ${isActive
            ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/50 dark:text-teal-300'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        }`;


    return (
        <>
            <Toast message={toastMessage} show={!!toastMessage} />
            <aside
                id="sidebar"
                className={`sidebar fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidebar Header */}
                <div className={`flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700`}>
                    <Link to="/bo/dashboard" className="flex items-center gap-3">
                        <img src={logo} className="h-8 w-8 rounded-lg" alt="Logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/32x32/0d9488/ffffff?text=M'; }} />
                        <h2 className="font-poppins text-xl font-bold text-teal-600">MySertifico</h2>
                    </Link>
                    <button id="close-sidebar" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white lg:hidden" onClick={onClose}>
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        <li className="px-4 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider my-4">Menu</li>
                        <li>
                            <NavLink to="/bo/dashboard" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-dashboard-3-line mr-3 text-lg"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/bo/templates" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-layout-3-line mr-3 text-lg"></i>
                                <span>Templates</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/bo/logos-badges" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-medal-line mr-3 text-lg"></i>
                                <span>Logos & Badges</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/bo/certificates" className={getNavLinkClass} onClick={onClose}>
                                <i className="ri-award-line mr-3 text-lg"></i>
                                <span>Certificates</span>
                            </NavLink>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => toggleSubmenu('submenu-users')}
                            >
                                <span className="flex items-center"><i className="ri-group-line mr-3 text-lg"></i><span>Users</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-users'] ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-users" className={`${openSubmenus['submenu-users'] ? '' : 'hidden'} py-1 space-y-1 pl-4`}>
                                <li><NavLink to="/bo/users/organizations" className={getSubmenuLinkClass} onClick={onClose}><i className="ri-school-line"></i><span>Organizations</span></NavLink></li>
                                <li><NavLink to="/bo/users/organization-users" className={getSubmenuLinkClass} onClick={onClose}><i className="ri-user-2-line"></i><span>Organization Users</span></NavLink></li>
                                <li><NavLink to="/bo/users/mywall-users" className={getSubmenuLinkClass} onClick={onClose}><i className="ri-user-star-line"></i><span>MyWall Users</span></NavLink></li>
                            </ul>
                        </li>
                        <li className="px-4 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider pt-6 pb-2">Administration</li>
                        <li>
                            <button
                                type="button"
                                className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => toggleSubmenu('submenu-admin')}
                            >
                                <span className="flex items-center"><i className="ri-settings-3-line mr-3 text-lg"></i><span>Settings</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-admin'] ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-admin" className={`${openSubmenus['submenu-admin'] ? '' : 'hidden'} py-1 space-y-1 pl-4`}>
                                <li><NavLink to="/bo/admin/staff" className={getSubmenuLinkClass} onClick={onClose}><i className="ri-group-line"></i><span>Staff</span></NavLink></li>

                                <li>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-between py-2 px-4 rounded-lg text-sm text-left text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                        onClick={() => toggleSubmenu('submenu-plans')}
                                    >
                                        <span className="flex items-center gap-3 whitespace-nowrap"><i className="ri-price-tag-3-line"></i><span>Plans & Subscriptions</span></span>
                                        <i className={`ri-arrow-down-s-line transition-transform duration-200 ${openSubmenus['submenu-plans'] ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    <ul id="submenu-plans" className={`${openSubmenus['submenu-plans'] ? '' : 'hidden'} py-1 space-y-1 pl-4`}>
                                        <li>
                                            <NavLink to="/bo/admin/mysertifico-plans" className={getNestedSubmenuLinkClass} onClick={onClose}>
                                                <i className="ri-shopping-cart-2-line"></i>
                                                <span className='ml-2'>MySertifico Plans</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/bo/admin/mywall-plans" className={getNestedSubmenuLinkClass} onClick={onClose}>
                                                <i className="ri-wallet-3-line"></i>
                                                <span className='ml-2'>MyWall Plans</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>

                                <li><NavLink to="/bo/admin/support-help" className={getSubmenuLinkClass} onClick={onClose}><i className="ri-customer-service-2-line"></i><span>Support & Help</span></NavLink></li>
                            </ul>
                        </li>
                        <li className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            <a href="#" id="logout-sidebar" className="flex items-center py-2.5 px-4 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors" onClick={handleLogout}>
                                <i className="ri-logout-box-r-line mr-3 text-lg"></i>
                                <span>Log Out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
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

export default BoSidebar;
