import React, { useState, useEffect } from 'react';

const Dashboard = ({ navigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isGallerySubMenuOpen, setIsGallerySubMenuOpen] = useState(false);
    const [isSettingsSubMenuOpen, setIsSettingsSubMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initialize dark mode based on localStorage or system preference
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }

        // Close profile menu when clicking outside
        const handleOutsideClick = (e) => {
            if (isProfileMenuOpen && !e.target.closest('#profile-menu') && !e.target.closest('#profile-menu-button')) {
                setIsProfileMenuOpen(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isProfileMenuOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileMenu = (e) => {
        e.stopPropagation(); // Prevent click from bubbling to window and closing immediately
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (newIsDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            {/* Sidebar */}
            <aside id="sidebar" className={`sidebar fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 dark:bg-gray-950 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto lg:translate-x-0 lg:static lg:h-auto`}>
                <div className="flex items-center justify-between p-6">
                    <h2 className="font-poppins text-2xl font-bold text-white">Menu</h2>
                    <button id="close-sidebar" className="text-gray-400 hover:text-white lg:hidden" onClick={toggleSidebar}>
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" onClick={() => navigate('dashboard')} className="flex items-center py-2.5 px-4 rounded-lg bg-primary-dark text-white">
                                <i className="ri-dashboard-3-line mr-3 text-lg"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white" onClick={() => setIsGallerySubMenuOpen(!isGallerySubMenuOpen)}>
                                <span className="flex items-center"><i className="ri-gallery-line mr-3 text-lg"></i><span>Gallery</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isGallerySubMenuOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-gallery" className={`${isGallerySubMenuOpen ? 'block' : 'hidden'} py-2 space-y-1 pl-8`}>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Templates</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Logos & Badges</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white">
                                <i className="ri-award-line mr-3 text-lg"></i>
                                <span>Certificates</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white" onClick={() => setIsSettingsSubMenuOpen(!isSettingsSubMenuOpen)}>
                                <span className="flex items-center"><i className="ri-settings-3-line mr-3 text-lg"></i><span>Settings</span></span>
                                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isSettingsSubMenuOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            <ul id="submenu-settings" className={`${isSettingsSubMenuOpen ? 'block' : 'hidden'} py-2 space-y-1 pl-8`}>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Organisation</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Logos</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Users</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Templates</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Recipients</a></li>
                                <li><a href="#" className="block py-2 px-4 rounded-lg text-sm hover:bg-gray-700">Account</a></li>
                            </ul>
                        </li>
                        <li className="pt-4 mt-4 border-t border-gray-700">
                            <a href="#" onClick={() => navigate('signIn')} className="flex items-center py-2.5 px-4 rounded-lg text-red-500 hover:bg-gray-700 hover:text-white">
                                <i className="ri-logout-box-r-line mr-3 text-lg"></i>
                                <span>Log Out</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {isSidebarOpen && <div id="sidebar-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar}></div>}

            {/* Main Content */}
            <div id="main-content" className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Navbar */}
                <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <button id="sidebar-toggle" className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none lg:hidden" onClick={toggleSidebar}>
                                <i className="ri-menu-line text-2xl"></i>
                            </button>
                            <a href="#" onClick={() => navigate('dashboard')} className="flex items-center gap-x-2">
                                <img src="https://placehold.co/32x32/0d9488/ffffff?text=M" alt="MySertifico Logo" className="h-8 w-8 rounded-lg" />
                                <span className="font-poppins text-2xl font-bold text-primary hidden sm:block">MySertifico</span>
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button id="theme-toggle" className="text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleTheme}>
                                <i className={`ri-moon-line ${isDarkMode ? 'hidden' : 'block'}`}></i>
                                <i className={`ri-sun-line ${isDarkMode ? 'block' : 'hidden'}`}></i>
                            </button>
                            <div className="relative">
                                <button id="profile-menu-button" className="flex items-center space-x-2" onClick={toggleProfileMenu}>
                                    <img className="h-9 w-9 rounded-full object-cover" src="https://i.pravatar.cc/150?u=admin" alt="Admin" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/0d9488/ffffff?text=A'; }} />
                                    <div className="hidden md:block text-left">
                                        <div className="text-sm font-semibold text-gray-800 dark:text-white">Fikri Nabil</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Super Admin</div>
                                    </div>
                                </button>
                                <div id="profile-menu" className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileMenuOpen ? 'block' : 'hidden'}`}>
                                    <div className="py-1">
                                        <a href="#" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-user-line mr-3"></i>My Profile</a>
                                        <a href="#" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-lock-password-line mr-3"></i>Change Password</a>
                                        <hr className="border-gray-200 dark:border-gray-700 my-1" />
                                        <a href="#" onClick={() => navigate('signIn')} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-logout-box-r-line mr-3"></i>Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, Fikri Nabil!</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Here's a summary of your organization's activity.</p>
                        </div>

                        {/* Call to Action: Create Certificate */}
                        <div className="mb-8">
                            <a href="#" className="block w-full text-center p-8 bg-gradient-to-r from-accent to-yellow-400 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <i className="ri-add-circle-fill text-5xl"></i>
                                    <div>
                                        <h2 className="text-2xl font-bold">Create New Certificate</h2>
                                        <p className="text-yellow-100">Start issuing new certificates to your recipients now.</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                            {/* Available Tokens */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg text-primary-100">Available Tokens</h3>
                                        <i className="ri-copper-coin-line text-4xl text-primary-200 opacity-70"></i>
                                    </div>
                                    <p className="text-4xl font-bold mt-2">8,750</p>
                                </div>
                                <a href="#" className="mt-4 block text-center text-sm font-semibold text-white bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition-colors">Top-up Tokens</a>
                            </div>
                            {/* Certificates Issued */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-600 dark:text-gray-400">Certificates Issued</h3>
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg"><i className="ri-award-line text-xl text-blue-500"></i></div>
                                </div>
                                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">1,250</p>
                                <p className="text-sm text-green-500 mt-1">+15% from last month</p>
                            </div>
                            {/* Total Recipients */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-600 dark:text-gray-400">Total Recipients</h3>
                                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg"><i className="ri-group-line text-xl text-green-500"></i></div>
                                </div>
                                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">4,820</p>
                                <p className="text-sm text-green-500 mt-1">+82 new recipients</p>
                            </div>
                            {/* Templates Used */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-600 dark:text-gray-400">Templates Used</h3>
                                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg"><i className="ri-layout-grid-line text-xl text-yellow-500"></i></div>
                                </div>
                                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">12</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Active templates</p>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"><i className="ri-file-add-line text-primary"></i></div>
                                        <div className="flex-grow">
                                            <p className="text-gray-800 dark:text-white"><strong>150 certificates</strong> were issued for "Webinar Digital Marketing".</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"><i className="ri-user-add-line text-green-500"></i></div>
                                        <div className="flex-grow">
                                            <p className="text-gray-800 dark:text-white"><strong>50 new recipients</strong> were added via CSV import.</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"><i className="ri-award-line text-blue-500"></i></div>
                                        <div className="flex-grow">
                                            <p className="text-gray-800 dark:text-white">Certificate for <strong>Ahmad Zaki</strong> was viewed.</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">3 days ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <a href="#" className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                        <i className="ri-user-add-line text-green-500 text-xl"></i>
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">Add Recipients</span>
                                    </a>
                                    <a href="#" className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                        <i className="ri-gallery-line text-yellow-500 text-xl"></i>
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">View Templates</span>
                                    </a>
                                    <a href="#" className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                        <i className="ri-image-line text-purple-500 text-xl"></i>
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">View Logos & Badges</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
