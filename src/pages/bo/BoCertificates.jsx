import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoCertificatePreviewModal from '../../components/bo/BoCertificatePreviewModal'; // New component for preview

const initialCertificateData = [
    { id: 1, name: 'Certificate of Completion', recipient: 'John Doe', organization: 'Code Academy', dateIssued: '2024-05-15', status: 'Issued', template: 'Tpl-101' },
    { id: 2, name: 'Web Development Mastery', recipient: 'Jane Smith', organization: 'Tech Innovators', dateIssued: '2024-05-20', status: 'Draft', template: 'Tpl-202' },
    { id: 3, name: 'Data Science Fundamentals', recipient: 'Alice Johnson', organization: 'Data Minds', dateIssued: '2024-05-22', status: 'Revoked', template: 'Tpl-101' },
    { id: 4, name: 'Cybersecurity Expert', recipient: 'Bob Williams', organization: 'SecureNet', dateIssued: '2024-05-25', status: 'Issued', template: 'Tpl-303' },
    { id: 5, name: 'Digital Marketing Pro', recipient: 'Charlie Brown', organization: 'MarketWise', dateIssued: '2024-05-28', status: 'Draft', template: 'Tpl-202' },
    { id: 6, name: 'UI/UX Design Course', recipient: 'Eve Davis', organization: 'Design Hub', dateIssued: '2024-06-01', status: 'Issued', template: 'Tpl-101' },
    { id: 7, name: 'Project Management', recipient: 'Frank White', organization: 'PM Solutions', dateIssued: '2024-06-05', status: 'Issued', template: 'Tpl-303' },
    { id: 8, name: 'Cloud Computing Basics', recipient: 'Grace Wilson', organization: 'Cloud Ninjas', dateIssued: '2024-06-08', status: 'Draft', template: 'Tpl-202' },
    { id: 9, name: 'AI & Machine Learning', recipient: 'Heidi Clark', organization: 'AI Frontier', dateIssued: '2024-06-10', status: 'Issued', template: 'Tpl-101' },
    { id: 10, name: 'Financial Analysis', recipient: 'Ivan Lewis', organization: 'Finance Pros', dateIssued: '2024-06-12', status: 'Issued', template: 'Tpl-303' },
    { id: 11, name: 'Business Strategy', recipient: 'Judy Harris', organization: 'Biz Solutions', dateIssued: '2024-06-14', status: 'Issued', template: 'Tpl-202' },
    { id: 12, name: 'Python for Beginners', recipient: 'Kyle Walker', organization: 'Code Academy', dateIssued: '2024-06-16', status: 'Draft', template: 'Tpl-101' },
    { id: 13, name: 'Graphic Design', recipient: 'Liam King', organization: 'Design Hub', dateIssued: '2024-06-18', status: 'Issued', template: 'Tpl-303' },
];

const itemsPerPage = 10;

const BoCertificates = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [certificates, setCertificates] = useState(initialCertificateData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedCertificates, setDisplayedCertificates] = useState([]);

    // State for confirmation modal
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [certificateToUpdate, setCertificateToUpdate] = useState(null);

    // State for preview modal
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    // Filter and paginate certificates whenever dependencies change
    useEffect(() => {
        const filteredData = certificates.filter(cert => {
            const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) || cert.recipient.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedCertificates(filteredData.slice(startIndex, endIndex));
    }, [certificates, searchTerm, selectedStatus, currentPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedStatus]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteCertificate = (certificateId) => {
        const certificate = certificates.find(c => c.id === certificateId);
        if (!certificate) return;

        setCertificateToUpdate(certificate);
        setModalConfig({
            iconClass: 'ri-delete-bin-line text-red-600 dark:text-red-400',
            title: 'Delete Certificate?',
            message: `Are you sure you want to delete the certificate for "${certificate.recipient}"? This action cannot be undone.`,
            confirmButtonText: 'Yes, Delete',
            confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
        });
        setIsConfirmationModalOpen(true);
    };

    const confirmDelete = () => {
        setCertificates(prevCertificates =>
            prevCertificates.filter(cert => cert.id !== certificateToUpdate.id)
        );
        setIsConfirmationModalOpen(false);
        setCertificateToUpdate(null);
    };

    const openPreviewModal = (certificateId) => {
        const certificate = certificates.find(c => c.id === certificateId);
        if (certificate) {
            setSelectedCertificate(certificate);
            setIsPreviewModalOpen(true);
        }
    };

    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
        setSelectedCertificate(null);
    };

    const closeModal = () => {
        setIsConfirmationModalOpen(false);
        setCertificateToUpdate(null);
    };

    // Calculate summary data
    const totalCertificateBatches = new Set(certificates.map(cert => cert.name)).size;
    const totalRecipients = new Set(certificates.map(cert => cert.recipient)).size;

    const totalFilteredItems = certificates.filter(cert => {
        const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) || cert.recipient.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;
        return matchesSearch && matchesStatus;
    }).length;

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Generated Certificates</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor all certificates generated by organizations.</p>
                            </div>
                            {/* <div>
                                <button
                                    id="add-certificate-button"
                                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                                >
                                    <i className="ri-add-line"></i>
                                    <span>New Certificate</span>
                                </button>
                            </div> */}
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {/* Total Certificate Batches */}
                            <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 gap-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="p-4 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-md">
                                        <i className="ri-award-fill text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Certificate Batches</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCertificateBatches}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Total Recipients */}
                            <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 gap-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="p-4 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 shadow-md">
                                        <i className="ri-team-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Recipients</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRecipients}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md">
                            {/* Toolbar: Search & Filter */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search by recipient or certificate name..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <select
                                    id="status-filter"
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="Issued">Issued</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Revoked">Revoked</option>
                                </select>
                            </div>

                            {/* Certificates List */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-bo-surface-light dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Certificate Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Recipient
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                                                Organization
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                                                Date Issued
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-bo-surface-light dark:bg-bo-surface-dark divide-y divide-gray-200 dark:divide-gray-700">
                                        {displayedCertificates.length > 0 ? (
                                            displayedCertificates.map((cert) => (
                                                <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                                                                <i className="ri-file-text-line text-lg"></i>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {cert.name}
                                                                </div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Template: {cert.template}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-white">{cert.recipient}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                        <div className="text-sm text-gray-900 dark:text-white">{cert.organization}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                                                        {cert.dateIssued}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cert.status === 'Issued' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                                cert.status === 'Draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                            }`}>
                                                            {cert.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button onClick={() => openPreviewModal(cert.id)} className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                <i className="ri-eye-line text-lg"></i>
                                                            </button>
                                                            {/* <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                <i className="ri-edit-line text-lg"></i>
                                                            </a> */}
                                                            <button onClick={() => handleDeleteCertificate(cert.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors">
                                                                <i className="ri-delete-bin-line text-lg"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                                                    No certificates found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
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

            {/* Confirmation Modal */}
            <BoConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                iconClass={modalConfig.iconClass}
                confirmButtonText={modalConfig.confirmButtonText}
                confirmButtonClass={modalConfig.confirmButtonClass}
                onConfirm={confirmDelete}
            />

            {/* Certificate Preview Modal */}
            {selectedCertificate && (
                <BoCertificatePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closePreviewModal}
                    certificate={selectedCertificate}
                />
            )}
        </div>
    );
};

export default BoCertificates;
