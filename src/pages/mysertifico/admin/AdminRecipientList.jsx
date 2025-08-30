import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';
import SearchInput from '../../../components/common/SearchInput';
import Pagination from '../../../components/common/Pagination';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const AdminRecipientList = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [classFilter, setClassFilter] = useState('All Classes');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, recipientName: '' });
    const [activeMenuRow, setActiveMenuRow] = useState(null);

    const itemsPerPage = 10;

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside any action menu
            const actionMenus = document.querySelectorAll('[data-action-menu]');
            let clickedOutside = true;
            
            actionMenus.forEach(menu => {
                if (menu.contains(event.target)) {
                    clickedOutside = false;
                }
            });
            
            if (clickedOutside && activeMenuRow !== null) {
                setActiveMenuRow(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeMenuRow]);

    const recipients = [
        {
            id: 1,
            name: 'Ahmad bin Abdullah',
            nationalId: '080101-03-5287',
            class: '5 Amanah',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Siti Nurhaliza binti Tarudin',
            nationalId: '080512-10-1234',
            class: '5 Bestari',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Lee Chong Wei',
            nationalId: '081020-01-4321',
            class: '5 Amanah',
            status: 'Inactive'
        }
    ];

    const filteredRecipients = recipients.filter(recipient => {
        const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             recipient.nationalId.includes(searchTerm);
        const matchesClass = classFilter === 'All Classes' || recipient.class === classFilter;
        const matchesStatus = statusFilter === 'All Status' || recipient.status === statusFilter;
        return matchesSearch && matchesClass && matchesStatus;
    });

    const totalItems = filteredRecipients.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRecipients = filteredRecipients.slice(startIndex, endIndex);

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (recipientName) => {
        setDeleteModal({ isOpen: true, recipientName });
        setActiveMenuRow(null);
    };

    const handleDeleteConfirm = () => {
        setDeleteModal({ isOpen: false, recipientName: '' });
    };

    const ActionMenu = ({ recipient, isOpen, onToggle }) => {
        return (
            <div className="relative inline-block" data-action-menu>
                <button 
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={() => onToggle(recipient.id)}
                >
                    <i className="ri-more-2-fill"></i>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                        <Link 
                            to={`/admin/view-recipient/${recipient.id}`}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setActiveMenuRow(null)}
                        >
                            <i className="ri-eye-line mr-3"></i>View
                        </Link>
                        <Link 
                            to="/admin/edit-recipient"
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setActiveMenuRow(null)}
                        >
                            <i className="ri-pencil-line mr-3"></i>Edit
                        </Link>
                        <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleDeleteClick(recipient.name)}
                        >
                            <i className="ri-delete-bin-line mr-3"></i>Delete
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const StatusBadge = ({ status }) => {
        const isActive = status === 'Active';
        return (
            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
                isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
                {status}
            </span>
        );
    };

    return (
        <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />

                {/* ===== Page Content Start ===== */}
                <main className="p-6 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                            Recipient Management
                        </h1>
                        <div className="flex space-x-2 w-full md:w-auto">
                            <Link 
                                to="/admin/add-recipient"
                                className="flex-1 md:flex-initial justify-center px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 flex items-center transition-colors"
                                title="Add Recipient"
                            >
                                <i className="ri-add-line mr-2"></i>Add Recipient
                            </Link>
                            <Link 
                                to="/admin/import-recipients"
                                className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                title="Import from CSV"
                            >
                                <i className="ri-upload-2-line"></i>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                            <div className="w-full md:w-1/3">
                                <SearchInput
                                    onSearchChange={handleSearchChange}
                                    placeholder="Search by name or ID..."
                                    showClearButton={true}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                                <select 
                                    className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
                                    value={classFilter}
                                    onChange={(e) => setClassFilter(e.target.value)}
                                >
                                    <option>All Classes</option>
                                    <option>5 Amanah</option>
                                    <option>5 Bestari</option>
                                </select>
                                <select 
                                    className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>

                        {filteredRecipients.length === 0 ? (
                            <div className="text-center py-16">
                                <i className="ri-user-search-line text-5xl text-gray-400 mb-4"></i>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Recipients Found</h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Your search did not match any recipients. Please try again.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table View */}
                                <div className="overflow-x-auto hidden md:block">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <input 
                                                        type="checkbox" 
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-3">Name</th>
                                                <th scope="col" className="px-6 py-3">National ID</th>
                                                <th scope="col" className="px-6 py-3">Class</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                                <th scope="col" className="px-6 py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRecipients.map((recipient) => (
                                                <tr 
                                                    key={recipient.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td className="p-4">
                                                        <input 
                                                            type="checkbox" 
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {recipient.name}
                                                    </th>
                                                    <td className="px-6 py-4">{recipient.nationalId}</td>
                                                    <td className="px-6 py-4">{recipient.class}</td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={recipient.status} />
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <ActionMenu 
                                                            recipient={recipient}
                                                            isOpen={activeMenuRow === recipient.id}
                                                            onToggle={(id) => setActiveMenuRow(activeMenuRow === id ? null : id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile List View */}
                                <div className="space-y-4 md:hidden">
                                    {currentRecipients.map((recipient) => (
                                        <div 
                                            key={recipient.id}
                                            className="bg-white dark:bg-gray-700/50 p-4 rounded-lg shadow flex items-center justify-between"
                                        >
                                            <div className="space-y-1">
                                                <p className="font-bold text-gray-900 dark:text-white text-base">
                                                    {recipient.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    <span>{recipient.nationalId}</span>
                                                    <span className="mx-1">·</span>
                                                    <span>{recipient.class}</span>
                                                </p>
                                                <div>
                                                    <StatusBadge status={recipient.status} />
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 ml-4">
                                                <ActionMenu 
                                                    recipient={recipient}
                                                    isOpen={activeMenuRow === recipient.id}
                                                    onToggle={(id) => setActiveMenuRow(activeMenuRow === id ? null : id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalItems > itemsPerPage && (
                                    <div className="flex flex-col md:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 md:space-y-0">
                                        <span className="text-sm text-gray-700 dark:text-gray-400">
                                            Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{' '}
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {Math.min(endIndex, totalItems)}
                                            </span>{' '}
                                            of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> Recipients
                                        </span>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalItems={totalItems}
                                            itemsPerPage={itemsPerPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    </div>
                </main>
                {/* ===== Page Content End ===== */}
            </div>

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, recipientName: '' })}
                onConfirm={handleDeleteConfirm}
                title="Confirm Deletion"
                message={`Are you sure you want to delete recipient '${deleteModal.recipientName}'? This action cannot be undone.`}
                iconClass="ri-delete-bin-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />
        </div>
    );
};

export default AdminRecipientList;