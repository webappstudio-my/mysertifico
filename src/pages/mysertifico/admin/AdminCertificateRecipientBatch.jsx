import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Pagination from '../../../components/common/Pagination';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import SearchInput from '../../../components/common/SearchInput';

const AdminCertificateRecipientBatch = ({ theme, onThemeToggle }) => {
    // Layout states
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [theme, setTheme] = useState(() => {
    //     if (typeof window !== 'undefined') {
    //         return localStorage.getItem('theme') || 'light';
    //     }
    //     return 'light';
    // });

    // Search states as requested
    const [searchTerm, setSearchTerm] = useState(''); 
    // const [searchInput, setSearchInput] = useState('');
    
    // Data and pagination states
    const [allRecipientsInBatch, setAllRecipientsInBatch] = useState([
        { name: 'Ahmad bin Abdullah', id: '080101-03-5287', class: '5 Amanah' },
        { name: 'Siti Nurhaliza binti Kamal', id: '081230-01-4452', class: '5 Amanah' },
    ]);
    
    const [filteredRecipients, setFilteredRecipients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Modal states
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, recipient: null });
    const [addModal, setAddModal] = useState({ isOpen: false });
    
    // Add recipient modal states
    const [recipientSearch, setRecipientSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Master recipient list for adding new recipients
    const masterRecipientList = [
        ...allRecipientsInBatch,
        { name: 'Lee Wei Chong', id: '080315-10-1121', class: '5 Bestari' },
        { name: 'Anusha a/p Muthu', id: '080522-07-3456', class: '5 Cekal' },
        { name: 'Badrul Hisham bin Zulkifli', id: '081101-03-9987', class: '5 Bestari' },
        { name: 'Cheryl Tan', id: '080214-14-1234', class: '5 Cekal' },
        { name: 'David Lee', id: '080404-08-4321', class: '4 Amanah' },
        { name: 'Farah Adibah', id: '080606-05-6543', class: '4 Bestari' },
        { name: 'Goh Liu Ying', id: '080808-01-8888', class: '4 Cekal' },
        { name: 'Harith Iskander', id: '080910-10-9101', class: '3 Amanah' },
        { name: 'Indah Ruhaila', id: '081111-11-1111', class: '3 Bestari' },
        { name: 'Jamal Abdillah', id: '081212-12-1212', class: '3 Cekal' },
    ];

    // Theme management (you were missing this function)
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    // Sidebar management
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        // No need to use searchInput here, it's for the SearchInput component
        setIsSidebarOpen(false);
    };

    // Filter recipients based on search term (only when search is performed)
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredRecipients([...allRecipientsInBatch]);
        } else {
            const filtered = allRecipientsInBatch.filter(recipient => 
                recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipient.id.includes(searchTerm) ||
                recipient.class.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecipients(filtered);
        }
        setCurrentPage(1);
    }, [searchTerm, allRecipientsInBatch]);

    // Initialize filtered recipients
    useEffect(() => {
        setFilteredRecipients([...allRecipientsInBatch]);
    }, [allRecipientsInBatch]);

    // Handle delete recipient
    const handleDeleteRecipient = (recipient) => {
        setDeleteModal({ isOpen: true, recipient });
    };

    const confirmDelete = () => {
        if (deleteModal.recipient) {
            setAllRecipientsInBatch(prev => 
                prev.filter(r => r.name !== deleteModal.recipient.name)
            );
        }
        setDeleteModal({ isOpen: false, recipient: null });
    };

    // Handle add recipient search
    useEffect(() => {
        if (recipientSearch.length < 2) {
            setSearchResults([]);
            return;
        }

        const results = masterRecipientList.filter(student => 
            (student.name.toLowerCase().includes(recipientSearch.toLowerCase()) || 
             student.id.includes(recipientSearch)) &&
            !allRecipientsInBatch.some(r => r.id === student.id)
        );
        setSearchResults(results);
    }, [recipientSearch, allRecipientsInBatch]);

    // Handle add recipient
    const handleAddRecipient = () => {
        if (selectedStudent) {
            setAllRecipientsInBatch(prev => [...prev, selectedStudent]);
            setAddModal({ isOpen: false });
            setSelectedStudent(null);
            setRecipientSearch('');
            setSearchResults([]);
        }
    };

    // Handle print
    const handlePrint = () => {
        window.print();
    };

    // Calculate pagination
    const totalItems = filteredRecipients.length;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRecipients = filteredRecipients.slice(startIndex, endIndex);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Custom Tailwind Configuration */}
            <style>{`
                :root {
                    --color-primary: #0d9488;
                    --color-primary-dark: #0f766e;
                }
                .bg-primary { background-color: var(--color-primary); }
                .bg-primary-dark { background-color: var(--color-primary-dark); }
                .text-primary { color: var(--color-primary); }
                .border-primary { border-color: var(--color-primary); }
                .ring-primary { --tw-ring-color: var(--color-primary); }
                .focus\\:ring-primary:focus { --tw-ring-color: var(--color-primary); }
                .focus\\:border-primary:focus { border-color: var(--color-primary); }
                .hover\\:bg-primary-dark:hover { background-color: var(--color-primary-dark); }
                @media print {
                    body * { visibility: hidden; }
                    #printable-area, #printable-area * { visibility: visible; }
                    #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; }
                    .no-print, .no-print * { display: none !important; }
                    .print-only-text { visibility: visible !important; color: #000 !important; }
                    .bg-white { background-color: white !important; }
                }
            `}</style>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeSidebar}></div>
            )}

            {/* Main Content */}
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Navbar */}
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />

                {/* Page Content */}
                <main className="p-6 sm:p-8">
                    <div id="printable-area" className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white print-only-text">
                                    Recipient List
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 print-only-text">
                                    For: School Completion Certificate 2025 (BATCH-001)
                                </p>
                            </div>
                            <Link to="/admin/certificate-list">
                                <button 
                                    className="no-print px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex-shrink-0 self-start sm:self-center flex items-center gap-2 text-sm font-medium"
                                >
                                    <i className="ri-arrow-left-line"></i>
                                    <span>Back</span>
                                </button>
                            </Link>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="no-print flex flex-col sm:flex-row items-center justify-between mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                                    Manage recipients for this batch.
                                </p>
                                <div className="flex space-x-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => setAddModal({ isOpen: true })}
                                        className="flex-1 sm:flex-initial justify-center px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 flex items-center transition-colors"
                                        title="Add Recipient"
                                    >
                                        <i className="ri-user-add-line mr-2"></i>Add
                                    </button>
                                    <button 
                                        onClick={handlePrint}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        title="Print or Save as PDF"
                                    >
                                        <i className="ri-printer-line"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="no-print flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                                <SearchInput
                                    onSearchChange={setSearchTerm}
                                    onPageReset={() => setCurrentPage(1)}
                                    placeholder="Search recipient..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-1/2"
                                />
                            </div>

                            {totalItems > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">#</th>
                                                    <th scope="col" className="px-6 py-3">Recipient Details</th>
                                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">National ID</th>
                                                    <th scope="col" className="px-6 py-3 hidden lg:table-cell">Class</th>
                                                    <th scope="col" className="px-6 py-3 hidden print:table-cell">Notes</th>
                                                    <th scope="col" className="px-6 py-3 text-right no-print">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRecipients.map((recipient, index) => (
                                                    <tr key={recipient.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="px-6 py-4">{startIndex + index + 1}</td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="font-bold">{recipient.name}</div>
                                                            <div className="font-normal text-sm text-gray-500 dark:text-gray-400 md:hidden">
                                                                <span>{recipient.id}</span> · <span>{recipient.class}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 hidden md:table-cell">{recipient.id}</td>
                                                        <td className="px-6 py-4 hidden lg:table-cell">{recipient.class}</td>
                                                        <td className="px-6 py-4 border-l dark:border-gray-700 hidden print:table-cell" contentEditable></td>
                                                        <td className="px-6 py-4 text-right no-print">
                                                            <button 
                                                                onClick={() => handleDeleteRecipient(recipient)}
                                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                                title="Delete Recipient"
                                                            >
                                                                <i className="ri-delete-bin-line"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {/*<div className="no-print flex flex-col md:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 md:space-y-0"> 
                                        {/*<span className="text-sm text-gray-700 dark:text-gray-400">
                                            Showing <span className="font-semibold text-gray-900 dark:text-white">{totalItems > 0 ? startIndex + 1 : 0}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(endIndex, totalItems)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> Recipients
                                        </span>*/}
                                    <div className="flex justify-center">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalItems={totalItems}
                                            itemsPerPage={rowsPerPage}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                    <i className="ri-user-search-line text-5xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Recipients Found</h3>
                                    <p className="mt-2">
                                        {searchTerm ? 'Your search did not match any recipients in this batch.' : 'No recipients in this batch yet.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, recipient: null })}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete recipient '${deleteModal.recipient?.name}' from this batch?`}
                iconClass="ri-delete-bin-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />

            {/* Add Recipient Modal */}
            {addModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-xl shadow-lg transform transition-all">
                        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Recipient to Batch</h3>
                            <button 
                                onClick={() => {
                                    setAddModal({ isOpen: false });
                                    setSelectedStudent(null);
                                    setRecipientSearch('');
                                    setSearchResults([]);
                                }}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Search for Recipient
                                </label>
                                <div className="relative">
                                    <input 
                                        type="search" 
                                        value={recipientSearch}
                                        onChange={(e) => setRecipientSearch(e.target.value)}
                                        placeholder="Search by Name, ID, or Class..." 
                                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 pl-10"
                                    />
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto space-y-2 p-1 border rounded-md dark:border-gray-600">
                                {recipientSearch.length < 2 ? (
                                    <p className="text-center text-gray-500 p-4">Start typing to search for recipients.</p>
                                ) : searchResults.length === 0 ? (
                                    <p className="text-center text-gray-500 p-4">No matching recipients found.</p>
                                ) : (
                                    searchResults.map(student => (
                                        <div 
                                            key={student.id}
                                            onClick={() => setSelectedStudent(student)}
                                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                                selectedStudent?.id === student.id ? 'bg-primary/20 dark:bg-primary/30' : ''
                                            }`}
                                        >
                                            <p className="font-semibold text-gray-800 dark:text-white">{student.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{student.id} - {student.class}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                            <button 
                                onClick={() => {
                                    setAddModal({ isOpen: false });
                                    setSelectedStudent(null);
                                    setRecipientSearch('');
                                    setSearchResults([]);
                                }}
                                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddRecipient}
                                disabled={!selectedStudent}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-500"
                            >
                                Add Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCertificateRecipientBatch;