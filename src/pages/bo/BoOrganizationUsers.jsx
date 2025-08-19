import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoOrganizationUsers = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);
    
    const itemsPerPage = 10;

    // Sample user data
    const [userData, setUserData] = useState([
        { id: 1, name: 'Ahmad bin Ali', email: 'ahmad.ali@example.com', organizationName: 'SK Seri Mutiara', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@example.com', organizationName: 'SMK Taman Indah', role: 'Creator', status: 'Active' },
        { id: 3, name: 'John Doe', email: 'john.doe@example.com', organizationName: 'SK Seri Mutiara', role: 'Verifier', status: 'Inactive' },
        { id: 4, name: 'Lee Wei', email: 'lee.wei@example.com', organizationName: 'SMK Taman Indah', role: 'Signatory', status: 'Active' },
        { id: 5, name: 'Muthu Samy', email: 'muthu.samy@example.com', organizationName: 'Kolej Vokasional Maju', role: 'Creator', status: 'Active' },
        { id: 6, name: 'Jane Smith', email: 'jane.smith@example.com', organizationName: 'SK Seri Mutiara', role: 'Creator', status: 'Active' },
        { id: 7, name: 'David Chen', email: 'david.chen@example.com', organizationName: 'SMK Taman Indah', role: 'Super Admin', status: 'Inactive' },
        { id: 8, name: 'Fatima Zahra', email: 'fatima.zahra@example.com', organizationName: 'Kolej Vokasional Maju', role: 'Verifier', status: 'Active' },
        { id: 9, name: 'Michael Brown', email: 'michael.brown@example.com', organizationName: 'SK Seri Mutiara', role: 'Signatory', status: 'Active' },
        { id: 10, name: 'Priya Sharma', email: 'priya.sharma@example.com', organizationName: 'SMK Taman Indah', role: 'Creator', status: 'Active' },
        { id: 11, name: 'Omar Abdullah', email: 'omar.abdullah@example.com', organizationName: 'Kolej Vokasional Maju', role: 'Super Admin', status: 'Active' },
    ]);

    // Filter data based on search and filters
    const filteredData = userData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStatusToggle = (userId) => {
        const user = userData.find(u => u.id === userId);
        if (user) {
            setUserToUpdate(user);
            setIsModalOpen(true);
        }
    };

    const confirmStatusChange = () => {
        if (userToUpdate) {
            setUserData(prevData => 
                prevData.map(user => 
                    user.id === userToUpdate.id 
                        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                        : user
                )
            );
        }
        setIsModalOpen(false);
        setUserToUpdate(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUserToUpdate(null);
    };

    const getStatusBadgeClass = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    const getToggleIconClass = (status) => {
        return status === 'Active'
            ? 'ri-toggle-fill text-teal-600 text-3xl'
            : 'ri-toggle-line text-gray-500 text-3xl';
    };

    const getModalConfig = () => {
        if (!userToUpdate) return {};
        
        const isActivating = userToUpdate.status === 'Inactive';
        
        return {
            title: isActivating ? 'Activate User?' : 'Deactivate User?',
            message: `Are you sure you want to set "${userToUpdate.name}" to ${isActivating ? 'Active' : 'Inactive'}?`,
            iconClass: isActivating 
                ? 'ri-checkbox-circle-line text-green-600 dark:text-green-400'
                : 'ri-close-circle-line text-red-600 dark:text-red-400',
            confirmButtonText: isActivating ? 'Yes, Activate' : 'Yes, Deactivate',
            confirmButtonClass: isActivating 
                ? 'text-white bg-green-600 hover:bg-green-700'
                : 'text-white bg-red-600 hover:bg-red-700'
        };
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

    const modalConfig = getModalConfig();

    return (
        <div className="min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            {/* Sidebar */}
            <BoSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
            
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                    onClick={handleCloseSidebar}>
                </div>
            )}

            {/* Main Content */}
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Navbar */}
                <BoNavbar 
                    onSidebarToggle={handleSidebarToggle}
                    headerTitle="Organization Users"
                />

                {/* Page Content */}
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Organization Users</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    View and manage all users from subscribed organizations.
                                </p>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md">
                            {/* Toolbar: Search & Filter */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by subject or email..."
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
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900 dark:text-white"
                                    />
                                </div>*/}
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900 dark:text-white"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Creator">Creator</option>
                                    <option value="Verifier">Verifier</option>
                                    <option value="Signatory">Signatory</option>
                                </select>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900 dark:text-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            
                            {/* Users List */}
                            <div>
                                {filteredData.length === 0 ? (
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
                                                        <th className="px-6 py-3">Organization</th>
                                                        <th className="px-6 py-3">Role</th>
                                                        <th className="px-6 py-3">Status</th>
                                                        <th className="px-6 py-3 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedData.map((user, index) => (
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
                                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                {user.organizationName}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                {user.role}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                                                                    {user.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={() => handleStatusToggle(user.id)}
                                                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                    title={user.status === 'Active' ? 'Set to Inactive' : 'Set to Active'}
                                                                >
                                                                    <i className={getToggleIconClass(user.status)}></i>
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
                                                {paginatedData.map((user) => (
                                                    <div key={user.id} className="p-4 flex justify-between items-center">
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {user.organizationName} • {user.role}
                                                            </div>
                                                            <div className="mt-1">
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                                                                    {user.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick={() => handleStatusToggle(user.id)}
                                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                title={user.status === 'Active' ? 'Set to Inactive' : 'Set to Active'}
                                                            >
                                                                <i className={getToggleIconClass(user.status)}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {/* Pagination */}
                            {filteredData.length > 0 && (
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                                    <BoPagination
                                        currentPage={currentPage}
                                        totalItems={filteredData.length}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <BoConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                iconClass={modalConfig.iconClass}
                confirmButtonText={modalConfig.confirmButtonText}
                confirmButtonClass={modalConfig.confirmButtonClass}
                onConfirm={confirmStatusChange}
            />
        </div>
    );
};

export default BoOrganizationUsers;