import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/dashboard/Sidebar';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import Pagination from '../../../components/common/Pagination';
import SearchInput from '../../../components/common/SearchInput';

const AdminCertificateList = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const certificateData = [
        { id: 'cert001', name: 'Sijil Graduasi 2025', creator: 'Fikri Nabil', createdDate: '31-12-2025', status: 'pending', recipients: 127, category: 'graduation' },
        { id: 'cert002', name: 'Kejohanan Merentas Desa 2025', creator: 'Mirza Amirul Rashid', createdDate: '15-03-2025', status: 'completed', recipients: 450, category: 'participation' },
        { id: 'cert003', name: 'Annual Sports Day 2024', creator: 'Fikri Nabil', createdDate: '2024-11-05', status: 'canceled', recipients: 300, category: 'participation' },
        { id: 'cert004', name: 'Science Fair Winners 2025', creator: 'Jane Doe', createdDate: '2025-06-30', status: 'completed', recipients: 15, category: 'graduation' },
        { id: 'cert005', name: 'Debate Club Participation', creator: 'Mirza Amirul Rashid', createdDate: '2025-05-20', status: 'completed', recipients: 32, category: 'participation' },
        { id: 'cert006', name: 'Art Competition 2025', creator: 'Jane Doe', createdDate: '2025-08-01', status: 'pending', recipients: 88, category: 'participation' },
    ];

    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        canceled: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
    };

    // Filter logic
    const filteredData = certificateData.filter(cert => {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = cert.name.toLowerCase().includes(query);
        const statusMatch = (statusFilter === 'all') || (cert.status === statusFilter);
        const categoryMatch = (categoryFilter === 'all') || (cert.category === categoryFilter);
        return nameMatch && statusMatch && categoryMatch;
    });

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    const handleSearch = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchTerm('');
        setStatusFilter('all');
        setCategoryFilter('all');
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
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
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Certificate Issuance</h1>
                            <a href="#" className="w-full md:w-auto justify-center px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 flex items-center transition-colors" title="Issue Certificate">
                                <i className="ri-add-line mr-2"></i>Create New Certificate
                            </a>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                                <SearchInput
                                    onSearchChange={(value) => {
                                        setSearchInput(value);
                                        setSearchTerm(value);
                                    }}
                                    onPageReset={() => setCurrentPage(1)}
                                    placeholder="Search by certificate name..."
                                    className="w-full md:w-1/3"
                                    initialValue={searchInput}
                                />
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                                    <select
                                        value={categoryFilter}
                                        onChange={handleCategoryFilterChange}
                                        className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="graduation">Graduation</option>
                                        <option value="participation">Participation</option>
                                    </select>
                                    <select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <div className="overflow-x-auto">
                                    {filteredData.length > 0 ? (
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">#</th>
                                                    <th scope="col" className="px-6 py-3">Certificate Name</th>
                                                    <th scope="col" className="px-6 py-3">Category</th>
                                                    <th scope="col" className="px-6 py-3">Recipients</th>
                                                    <th scope="col" className="px-6 py-3">Status</th>
                                                    <th scope="col" className="px-6 py-3 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedItems.map((cert, index) => {
                                                    const itemNumber = startIndex + index + 1;
                                                    const statusClass = statusClasses[cert.status] || statusClasses.canceled;
                                                    const statusText = cert.status.charAt(0).toUpperCase() + cert.status.slice(1);
                                                    
                                                    return (
                                                        <tr key={cert.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-4">{itemNumber}</td>
                                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cert.name}</td>
                                                            <td className="px-6 py-4 capitalize">{cert.category}</td>
                                                            <td className="px-6 py-4">{cert.recipients}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${statusClass}`}>
                                                                    {statusText}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Link
                                                                    to="/admin/view-certificate-batch/:id"
                                                                    className="font-medium text-primary hover:text-primary-dark p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 inline-block"
                                                                >
                                                                    <i className="ri-eye-line text-lg"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                            <i className="ri-search-eye-line text-5xl mb-4"></i>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Certificates Found</h3>
                                            <p className="mt-2">Your search or filter did not match any certificate batches.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="block md:hidden space-y-4">
                                {filteredData.length > 0 ? (
                                    paginatedItems.map((cert) => {
                                        const statusClass = statusClasses[cert.status] || statusClasses.canceled;
                                        const statusText = cert.status.charAt(0).toUpperCase() + cert.status.slice(1);
                                        
                                        return (
                                            <div key={cert.id} className="flex justify-between items-center p-4 border-b dark:border-gray-700 last:border-b-0">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{cert.category} &bull; {cert.recipients} Recipients</p>
                                                    <div className="mt-2">
                                                        <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${statusClass}`}>
                                                            {statusText}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 ml-4">
                                                    <Link
                                                        to="/admin/view-certificate-batch/:id"
                                                        className="font-medium text-primary hover:text-primary-dark p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 inline-block"
                                                    >
                                                        <i className="ri-eye-line text-lg"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                        <i className="ri-search-eye-line text-5xl mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Certificates Found</h3>
                                        <p className="mt-2">Your search or filter did not match any certificate batches.</p>
                                    </div>
                                )}
                            </div>
                            
                            {filteredData.length > 0 && (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <Pagination
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
        </div>
    );
};

export default AdminCertificateList;