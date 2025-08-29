import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';
import SearchInput from '../../../components/common/SearchInput';
import Pagination from '../../../components/common/Pagination';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 ease-in-out z-[100]">
            <i className="ri-checkbox-circle-fill text-2xl"></i>
            <span>{message}</span>
        </div>
    );
};

const UserModal = ({ isOpen, onClose, onConfirm, title, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || ''
            });
        } else {
            setFormData({ name: '', email: '', role: '' });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-1/3 p-6 transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    <button type="button" className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
                        <i className="ri-close-line text-bo-bg-dark dark:text-white"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select 
                            id="role" 
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        >
                            <option value="">Choose a role</option>
                            <option value="Issuer">Issuer</option>
                            <option value="Signatory">Signatory</option>
                            <option value="Super Admin">Super Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Save User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ActionMenu = ({ user, onEdit, onDelete, position, onClose }) => {
    if (!position) return null;

    return (
        <div 
            className="absolute w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-600"
            style={{ top: position.y, left: position.x }}
        >
            <button
                onClick={() => { onEdit(user); onClose(); }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <i className="ri-pencil-line mr-2 text-gray-600 dark:text-gray-400"></i>
                Edit
            </button>
            <button
                onClick={() => { onDelete(user); onClose(); }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <i className="ri-delete-bin-line mr-2"></i>
                Delete
            </button>
        </div>
    );
};

const AdminUserList = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [actionMenu, setActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [allUsersData, setAllUsersData] = useState([
        { name: 'Fikri Nabil', email: 'fikri@example.com', role: 'Super Admin', status: 'Active' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'Signatory', status: 'Inactive' },
        { name: 'John Doe', email: 'john@example.com', role: 'Issuer', status: 'Active' },
        { name: 'Emily White', email: 'emily@example.com', role: 'Verifier', status: 'Active' }
    ]);

    const filteredUsers = allUsersData.filter(user => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        const searchMatch = name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
        const roleMatch = roleFilter === '' || user.role === roleFilter;
        const statusMatch = statusFilter === '' || user.status === statusFilter;
        
        return searchMatch && roleMatch && statusMatch;
    });

    // Calculate pagination
    const totalItems = filteredUsers.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Reset to first page when search/filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter, statusFilter]);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsUserModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsUserModalOpen(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleUserSubmit = (formData) => {
        if (editingUser) {
            setAllUsersData(prev => prev.map(user => 
                user.email === editingUser.email ? { ...user, ...formData } : user
            ));
            showToast('User updated successfully!');
        } else {
            const newUser = { ...formData, status: 'Active' };
            setAllUsersData(prev => [...prev, newUser]);
            showToast('New user added successfully!');
        }
        setIsUserModalOpen(false);
        setEditingUser(null);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            setAllUsersData(prev => prev.filter(user => user.email !== userToDelete.email));
            showToast(`User '${userToDelete.name}' has been deleted.`);
            setUserToDelete(null);
        }
        setIsDeleteModalOpen(false);
    };

    const handleActionMenu = (e, user) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setActionMenu({
            user,
            position: {
                x: rect.left - 120,
                y: rect.bottom + window.scrollY + 5
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (actionMenu && !e.target.closest('.action-menu-dropdown')) {
                setActionMenu(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [actionMenu]);

    const UserTableRow = ({ user, index }) => {
        const statusClass = user.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                        <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                    </div>
                </th>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full ${statusClass}`}>{user.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                        <button 
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            onClick={(e) => handleActionMenu(e, user)}
                            title="More actions"
                        >
                            <i className="ri-more-2-fill text-lg"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    const UserCard = ({ user }) => {
        const statusClass = user.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

        return (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="flex items-center mb-2">
                        <img className="w-10 h-10 rounded-full mr-3" src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    <div className="text-xs flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                            Role: <span className="font-medium text-gray-800 dark:text-gray-200">{user.role}</span>
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full ${statusClass}`}>{user.status}</span>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                    <div className="relative">
                        <button 
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            onClick={(e) => handleActionMenu(e, user)}
                            title="More actions"
                        >
                            <i className="ri-more-2-fill text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            <Toast message={toastMessage} show={!!toastMessage} />
            
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {isSidebarOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsSidebarOpen(false)}>
                </div>
            )}
            
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <DashboardNavbar 
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    theme={theme}
                    onThemeToggle={onThemeToggle}
                />
                
                <main className="p-6 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all users in your organisation.</p>
                        </div>
                        <button 
                            onClick={handleAddUser}
                            className="w-full sm:w-auto px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center"
                        >
                            <i className="ri-add-line mr-2"></i>Add New User
                        </button>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                            <SearchInput
                                onSearchChange={setSearchTerm}
                                placeholder="Search by name or email..."
                                className="w-full md:w-1/3"
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                                <select 
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">All Roles</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Issuer">Issuer</option>
                                    <option value="Verifier">Verifier</option>
                                    <option value="Signatory">Signatory</option>
                                </select>
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 hidden md:table">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 w-12">#</th>
                                        <th scope="col" className="px-6 py-3">User</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user, index) => (
                                        <UserTableRow key={user.email} user={user} index={startIndex + index} />
                                    ))}
                                </tbody>
                            </table>

                            <div className="space-y-4 md:hidden">
                                {paginatedUsers.map((user) => (
                                    <UserCard key={user.email} user={user} />
                                ))}
                            </div>

                            {filteredUsers.length === 0 && (
                                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                    No users found matching your criteria.
                                </div>
                            )}

                            {filteredUsers.length > 0 && (
                                <div className="flex justify-center mt-6">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            </div>

            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onConfirm={handleUserSubmit}
                title={editingUser ? `Edit User: ${editingUser.name}` : 'Add New User'}
                user={editingUser}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={userToDelete ? `Are you sure you want to delete user '${userToDelete.name}'?` : ''}
                iconClass="ri-error-warning-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />

            {actionMenu && (
                <div className="action-menu-dropdown">
                    <ActionMenu
                        user={actionMenu.user}
                        position={actionMenu.position}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                        onClose={() => setActionMenu(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminUserList;