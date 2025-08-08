import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoUsersTable from '../../components/bo/BoUsersTable';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoAddUserModal from '../../components/bo/BoAddUserModal';

const initialUserData = [
    { id: 301, name: 'Masta Rob', email: 'rob@webapp.studio', role: 'Super Admin', dateJoined: '2023-01-01', status: 'Active' },
    { id: 302, name: 'Ali bin Abu', email: 'ali@webapp.studio', role: 'Admin', dateJoined: '2023-02-15', status: 'Active' },
    { id: 303, name: 'Jane Doe', email: 'jane@webapp.studio', role: 'Manager', dateJoined: '2023-03-10', status: 'Inactive' },
    { id: 304, name: 'Siti Saleha', email: 'siti@webapp.studio', role: 'Admin', dateJoined: '2023-04-05', status: 'Active' },
    { id: 305, name: 'David Copperfield', email: 'david@webapp.studio', role: 'Manager', dateJoined: '2023-05-20', status: 'Active' },
    { id: 306, name: 'Aisyah Humaira', email: 'aisyah@webapp.studio', role: 'Admin', dateJoined: '2023-06-18', status: 'Active' },
    { id: 307, name: 'John Smith', email: 'john@webapp.studio', role: 'Admin', dateJoined: '2023-07-01', status: 'Inactive' },
    { id: 308, name: 'Emily White', email: 'emily@webapp.studio', role: 'Manager', dateJoined: '2023-08-10', status: 'Active' },
    { id: 309, name: 'Michael Brown', email: 'michael@webapp.studio', role: 'Super Admin', dateJoined: '2023-09-05', status: 'Active' },
    { id: 310, name: 'Sarah Green', email: 'sarah@webapp.studio', role: 'Admin', dateJoined: '2023-10-22', status: 'Inactive' },
    { id: 311, name: 'Chris Black', email: 'chris@webapp.studio', role: 'Manager', dateJoined: '2023-11-11', status: 'Active' },
    { id: 312, name: 'Jessica Blue', email: 'jessica@webapp.studio', role: 'Admin', dateJoined: '2023-12-01', status: 'Active' },
];

const itemsPerPage = 10;

const BoUsers = () => {
    // Correctly initialize and manage sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [userData, setUserData] = useState(initialUserData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [userToUpdateId, setUserToUpdateId] = useState(null);

    // Filter and paginate users whenever dependencies change
    useEffect(() => {
        const filteredData = userData.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole === 'all' || user.role === selectedRole;
            return matchesSearch && matchesRole;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedUsers(filteredData.slice(startIndex, endIndex));
    }, [userData, searchTerm, selectedRole, currentPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedRole]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleToggleStatus = (userId) => {
        const user = userData.find(u => u.id === userId);
        if (!user) return;

        setUserToUpdateId(userId);
        const isActivating = user.status === 'Inactive';

        setModalConfig({
            iconClass: isActivating ? 'ri-checkbox-circle-line text-green-600 dark:text-green-400' : 'ri-close-circle-line text-red-600 dark:text-red-400',
            title: isActivating ? 'Activate User?' : 'Deactivate User?',
            message: `Are you sure you want to set "${user.name}" to ${isActivating ? 'Active' : 'Inactive'}?`,
            confirmButtonText: isActivating ? 'Yes, Activate' : 'Yes, Deactivate',
            confirmButtonClass: isActivating ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white',
        });
        setIsConfirmationModalOpen(true);
    };

    const confirmStatusChange = () => {
        setUserData(prevUserData =>
            prevUserData.map(user =>
                user.id === userToUpdateId
                    ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                    : user
            )
        );
        setIsConfirmationModalOpen(false);
        setUserToUpdateId(null);
    };

    const closeModal = () => {
        setIsConfirmationModalOpen(false);
        setUserToUpdateId(null);
    };

    const handleAddUser = ({ fullName, email, role }) => {
        const newUser = {
            id: Date.now(), // Simple unique ID
            name: fullName,
            email: email,
            role: role,
            dateJoined: new Date().toISOString().slice(0, 10),
            status: 'Active', // New users are active by default
        };
        setUserData(prevUserData => [newUser, ...prevUserData]);
    };

    const totalFilteredItems = userData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    }).length;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            {/* Sidebar component with state management props */}
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                {/* Navbar component with state management prop */}
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Staff Users</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all internal staff users for the back office.</p>
                            </div>
                            <div>
                                <button
                                    id="add-user-button"
                                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                                    onClick={() => setIsAddUserModalOpen(true)}
                                >
                                    <i className="ri-add-line"></i>
                                    <span>Add New User</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search by name or email..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <select
                                    id="role-filter"
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                >
                                    <option value="all">All Roles</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>
                            <BoUsersTable users={displayedUsers} onToggleStatus={handleToggleStatus} />
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                                <BoPagination
                                    currentPage={currentPage}
                                    totalItems={totalFilteredItems}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <BoConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                iconClass={modalConfig.iconClass}
                confirmButtonText={modalConfig.confirmButtonText}
                confirmButtonClass={modalConfig.confirmButtonClass}
                onConfirm={confirmStatusChange}
            />
            <BoAddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onAddUser={handleAddUser}
            />
        </div>
    );
};

export default BoUsers;
