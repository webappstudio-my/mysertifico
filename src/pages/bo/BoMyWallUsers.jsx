// src/pages/bo/BoMyWallUsers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoMyWallUsers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [planFilter, setPlanFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [manageModalOpen, setManageModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalStatus, setModalStatus] = useState('Active');
    const [modalPlan, setModalPlan] = useState('');
    
    const itemsPerPage = 10;

    // Sample user data
    const [userData, setUserData] = useState([
        { id: 201, name: 'Amirul Hafiz', email: 'amirul.hafiz@mail.com', role: 'Student', plan: 'Trial', dateJoined: '2025-08-01', status: 'Active' },
        { id: 202, name: 'Badrul Hisham (Parent)', email: 'badrul.h@mail.com', role: 'Parent', plan: 'Standard', dateJoined: '2025-08-01', status: 'Active' },
        { id: 203, name: 'Chan Mei Ling', email: 'meiling.chan@mail.com', role: 'Student', plan: 'Pilot', dateJoined: '2025-07-30', status: 'Inactive' },
        { id: 204, name: 'Devi a/p Murugan', email: 'devi.m@mail.com', role: 'Student', plan: 'Premium', dateJoined: '2025-07-29', status: 'Active' },
        { id: 205, name: 'Elaine Tan (Parent)', email: 'elaine.tan@mail.com', role: 'Parent', plan: 'Pilot', dateJoined: '2025-07-29', status: 'Active' },
        { id: 206, name: 'Farid Kamil', email: 'farid.kamil@mail.com', role: 'Student', plan: 'Pro', dateJoined: '2025-07-28', status: 'Active' },
        { id: 207, name: 'Goh Wei Han', email: 'weihan.goh@mail.com', role: 'Student', plan: 'Trial', dateJoined: '2025-07-27', status: 'Active' },
        { id: 208, name: 'Halim Othman (Parent)', email: 'halim.o@mail.com', role: 'Parent', plan: 'Trial', dateJoined: '2025-07-27', status: 'Inactive' },
        { id: 209, name: 'Irfan Hadi', email: 'irfan.hadi@mail.com', role: 'Student', plan: 'Standard', dateJoined: '2025-07-26', status: 'Active' },
        { id: 210, name: 'Jasmine Kaur', email: 'jasmine.kaur@mail.com', role: 'Student', plan: 'Premium', dateJoined: '2025-07-25', status: 'Active' },
        { id: 211, name: 'Kamala a/p Ramasamy (Parent)', email: 'kamala.r@mail.com', role: 'Parent', plan: 'Pro', dateJoined: '2025-07-25', status: 'Active' },
    ]);

    // Filter users based on search and filters
    const filteredUsers = userData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesPlan = planFilter === 'all' || user.plan === planFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesPlan && matchesStatus;
    });

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, planFilter, statusFilter]);

    const getPlanBadge = (plan) => {
        const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
        switch (plan) {
            case 'Trial': return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
            case 'Standard': return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
            case 'Premium': return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300`;
            case 'Pro': return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
            case 'Pilot': return `${baseClasses} bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300`;
            default: return baseClasses;
        }
    };

    const getStatusBadge = (status) => {
        return status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    const handleManageUser = (user) => {
        setSelectedUser(user);
        setModalStatus(user.status);
        setModalPlan(user.plan);
        setManageModalOpen(true);
    };

    const handleSaveChanges = () => {
        if (selectedUser) {
            const updatedUsers = userData.map(user => 
                user.id === selectedUser.id 
                    ? { ...user, plan: modalPlan, status: modalStatus }
                    : user
            );
            setUserData(updatedUsers);
        }
        setManageModalOpen(false);
        setSelectedUser(null);
    };

    const closeManageModal = () => {
        setManageModalOpen(false);
        setSelectedUser(null);
    };

    //For BoSearchInput variables
    const handleSearchSubmit = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

    return (
        <div className="min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            {/* Sidebar */}
            <BoSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Navbar */}
                <BoNavbar 
                    onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} 
                    headerTitle="MyWall Users"
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">MyWall Users</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    View and manage all public users (Students & Parents).
                                </p>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            {/* Toolbar: Search & Filter */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by name or email..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                                />
                                {/*<div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>*/}
                                <select 
                                    value={planFilter}
                                    onChange={(e) => setPlanFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Plans</option>
                                    <option value="Trial">Trial</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Pro">Pro</option>
                                    <option value="Pilot">Pilot</option>
                                </select>
                                <select 
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="Student">Student</option>
                                    <option value="Parent">Parent</option>
                                </select>
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Users List */}
                            {filteredUsers.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="flex flex-col items-center">
                                        <i className="ri-user-search-line text-6xl text-gray-400 mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Users Found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                                            Your search or filter did not match any users.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop Table */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3">#</th>
                                                    <th className="px-6 py-3">User</th>
                                                    <th className="px-6 py-3">Role</th>
                                                    <th className="px-6 py-3">Plan</th>
                                                    <th className="px-6 py-3">Date Joined</th>
                                                    <th className="px-6 py-3">Status</th>
                                                    <th className="px-6 py-3 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedUsers.map((user, index) => (
                                                    <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                            {startIndex + index + 1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.role}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={getPlanBadge(user.plan)}>{user.plan}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.dateJoined}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button 
                                                                onClick={() => handleManageUser(user)}
                                                                className="p-2 text-gray-500 hover:text-primary dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                title="Manage User"
                                                            >
                                                                <i className="ri-settings-3-line"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile List */}
                                    <div className="block md:hidden">
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {paginatedUsers.map(user => (
                                                <div key={user.id} className="p-4 flex justify-between items-start">
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {user.role} • Joined: {user.dateJoined}
                                                        </div>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <span className={getPlanBadge(user.plan)}>{user.plan}</span>
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                                                {user.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleManageUser(user)}
                                                        className="p-2 text-gray-500 hover:text-primary dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        title="Manage User"
                                                    >
                                                        <i className="ri-settings-3-line text-lg"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Pagination */}
                            {filteredUsers.length > 0 && (
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                                    <BoPagination
                                        currentPage={currentPage}
                                        totalItems={filteredUsers.length}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Manage User Modal */}
            {manageModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
                                Manage MyWall User
                            </h3>
                            <button 
                                onClick={closeManageModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-semibold text-xl text-gray-900 dark:text-white">
                                    {selectedUser.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedUser.email}
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="user-plan-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Subscription Plan
                                    </label>
                                    <select 
                                        id="user-plan-select"
                                        value={modalPlan}
                                        onChange={(e) => setModalPlan(e.target.value)}
                                        className="mt-1 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value={selectedUser.plan}>{selectedUser.plan}</option>
                                        {selectedUser.plan !== 'Pilot' && <option value="Pilot">Pilot</option>}
                                        {selectedUser.plan === 'Pilot' && <option value="Trial">Trial</option>}
                                    </select>
                                    {modalPlan === 'Pilot' && (
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <i className="ri-information-line"></i> <b>Pilot Plan:</b> Free lifetime access for selected users helping test MySertifico.
                                        </p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Account Status
                                    </label>
                                    <div className="mt-2 flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                                        <span className={`font-semibold ${modalStatus === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {modalStatus}
                                        </span>
                                        <button 
                                            onClick={() => setModalStatus(modalStatus === 'Active' ? 'Inactive' : 'Active')}
                                            className="p-2 rounded-lg"
                                        >
                                            <i className={`text-3xl ${modalStatus === 'Active' ? 'ri-toggle-fill text-primary' : 'ri-toggle-line text-gray-500'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3 rounded-b-2xl">
                            <button 
                                onClick={closeManageModal}
                                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveChanges}
                                className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoMyWallUsers;