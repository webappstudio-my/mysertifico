import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoCertificatePreviewModal from '../../components/bo/BoCertificatePreviewModal';
import BoSearchInput from '../../components/bo/BoSearchInput';

// Updated initialCertificateData with organization status
const initialCertificateData = [
    { id: 101, certificateName: 'Sijil Tamat Sekolah Kohort 2025', recipient: '55 Recipients', organization: 'SEKOLAH MENENGAH KEBANGSAAN PINGGIRAN CYBERJAYA', dateIssued: '2025-08-01', orgStatus: 'Active' },
    { id: 102, certificateName: 'English Debate Competition', recipient: '12 Recipients', organization: 'SMK Taman Indah', dateIssued: '2025-07-28', orgStatus: 'Active' },
    { id: 103, certificateName: 'Science Fair Participants', recipient: '30 Recipients', organization: 'SK Seri Mutiara', dateIssued: '2025-07-25', orgStatus: 'Active' },
    { id: 104, certificateName: 'Prefectorial Board Appointment', recipient: '40 Recipients', organization: 'SMK Taman Indah', dateIssued: '2025-07-22', orgStatus: 'Active' },
    { id: 105, certificateName: 'Automotive Course Completion', recipient: '25 Recipients', organization: 'Kolej Vokasional Maju', dateIssued: '2025-07-20', orgStatus: 'Blocked' },
    { id: 106, certificateName: 'Graduation Day Class of 2025', recipient: '120 Recipients', organization: 'SK Seri Mutiara', dateIssued: '2025-07-18', orgStatus: 'Active' },
    { id: 107, certificateName: 'Cross Country Championship', recipient: '250 Recipients', organization: 'SMK Taman Indah', dateIssued: '2025-07-15', orgStatus: 'Active' },
    { id: 108, certificateName: 'Baking Workshop', recipient: '18 Recipients', organization: 'Kolej Vokasional Maju', dateIssued: '2025-07-12', orgStatus: 'Blocked' },
    { id: 109, certificateName: 'Best Attendance Award', recipient: '15 Recipients', organization: 'SK Seri Mutiara', dateIssued: '2025-07-10', orgStatus: 'Active' },
    { id: 110, certificateName: 'Inter-Class Football', recipient: '80 Recipients', organization: 'SMK Taman Indah', dateIssued: '2025-07-08', orgStatus: 'Active' },
    { id: 111, certificateName: 'Welding Course Completion', recipient: '22 Recipients', organization: 'Kolej Vokasional Maju', dateIssued: '2025-07-05', orgStatus: 'Blocked' },
    { id: 112, certificateName: 'Library Prefects 2025', recipient: '35 Recipients', organization: 'SK Seri Mutiara', dateIssued: '2025-07-02', orgStatus: 'Active' },
    { id: 113, certificateName: 'Kenji Tanaka', recipient: '1 Recipient', organization: 'SMK Taman Indah', dateIssued: '2025-06-30', orgStatus: 'Active' },
];

const itemsPerPage = 10;

const BoCertificates = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [certificates, setCertificates] = useState(initialCertificateData);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedCertificates, setDisplayedCertificates] = useState([]);

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [orgToUpdate, setOrgToUpdate] = useState(null);
    const [actionType, setActionType] = useState(null);

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    useEffect(() => {
        const filteredData = certificates.filter(cert =>
            cert.certificateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.organization.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedCertificates(filteredData.slice(startIndex, endIndex));
    }, [certificates, searchTerm, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleBlockUnblockOrg = (organizationName, action) => {
        setOrgToUpdate(organizationName);
        setActionType(action);

        if (action === 'block') {
            setModalConfig({
                iconClass: 'ri-lock-line text-red-600 dark:text-red-400',
                title: 'Block Organization?',
                message: `Are you sure you want to block "${organizationName}"? They will no longer be able to generate new certificates.`,
                confirmButtonText: 'Yes, Block',
                confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
            });
        } else {
            setModalConfig({
                iconClass: 'ri-lock-unlock-line text-green-600 dark:text-green-400',
                title: 'Unblock Organization?',
                message: `Are you sure you want to unblock "${organizationName}"? They will be able to generate certificates again.`,
                confirmButtonText: 'Yes, Unblock',
                confirmButtonClass: 'bg-green-600 hover:bg-green-700 text-white',
            });
        }
        setIsConfirmationModalOpen(true);
    };

    const confirmAction = () => {
        setCertificates(prevCertificates =>
            prevCertificates.map(cert =>
                cert.organization === orgToUpdate ? { ...cert, orgStatus: actionType === 'block' ? 'Blocked' : 'Active' } : cert
            )
        );
        setIsConfirmationModalOpen(false);
        setOrgToUpdate(null);
        setActionType(null);
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
        setOrgToUpdate(null);
        setActionType(null);
    };

    // Calculate total certificates and recipients based on the new data
    const totalCertificateBatches = new Set(certificates.map(cert => cert.certificateName)).size;
    const totalRecipients = certificates.reduce((sum, cert) => sum + parseInt(cert.recipient.split(' ')[0]), 0);

    const totalFilteredItems = certificates.filter(cert =>
        cert.certificateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.organization.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} headerTitle="Certificates" />

                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Generated Certificates</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor all certificates generated by organizations.</p>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 gap-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="p-4 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-md">
                                        <i className="ri-award-fill text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Certificate Batches</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCertificateBatches}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 gap-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="p-4 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 shadow-md">
                                        <i className="ri-team-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Recipients</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalRecipients}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md">
                            {/* Toolbar: Search */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by certificate or organization..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                                />
                                {/*<div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search by certificate or organization..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-bo-bg-light dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>*/}
                            </div>

                            {/* Certificates List - Cards for Small Screens */}
                            <div className="p-4 space-y-4 md:hidden">
                                {displayedCertificates.length > 0 ? (
                                    displayedCertificates.map((cert) => (
                                        <div key={cert.id} className="bg-bo-bg-light dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{cert.certificateName}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {cert.organization}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cert.orgStatus === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {cert.orgStatus}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                                                <p>Recipients: {cert.recipient}</p>
                                                <p>Issued: {cert.dateIssued}</p>
                                            </div>
                                            <div className="flex justify-end space-x-2 mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                                                <button onClick={() => openPreviewModal(cert.id)} className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                    <i className="ri-eye-line text-lg"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleBlockUnblockOrg(cert.organization, cert.orgStatus === 'Active' ? 'block' : 'unblock')}
                                                    className={`${cert.orgStatus === 'Active' ? 'text-red-500 hover:text-red-700 dark:hover:text-red-400' : 'text-green-500 hover:text-green-700 dark:hover:text-green-400'} transition-colors`}
                                                >
                                                    <i className={`ri-${cert.orgStatus === 'Active' ? 'lock-line' : 'lock-unlock-line'} text-lg`}></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                                        No certificates found.
                                    </div>
                                )}
                            </div>

                            {/* Certificates List - Table for Medium and Larger Screens */}
                            <div className="overflow-x-auto hidden md:block">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-bo-surface-light dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Certificate Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Organization
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Recipients
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Issue Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-bo-surface-light dark:bg-bo-surface-dark divide-y divide-gray-200 dark:divide-gray-700">
                                        {displayedCertificates.length > 0 ? (
                                            displayedCertificates.map((cert) => (
                                                <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {cert.certificateName}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{cert.organization}</div>
                                                        <div className={`text-xs ${cert.orgStatus === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                                            {cert.orgStatus}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-white">{cert.recipient}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {cert.dateIssued}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button onClick={() => openPreviewModal(cert.id)} className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" title="View">
                                                                <i className="ri-eye-line text-lg"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleBlockUnblockOrg(cert.organization, cert.orgStatus === 'Active' ? 'block' : 'unblock')}
                                                                className={`${cert.orgStatus === 'Active' ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'text-green-500 hover:bg-green-500 hover:text-white'} p-2 rounded-lg transition-colors`}
                                                                title={`${cert.orgStatus === 'Active' ? 'Block Organization' : 'Unblock Organization'}`}
                                                            >
                                                                <i className={`ri-${cert.orgStatus === 'Active' ? 'lock-line' : 'lock-unlock-line'} text-lg`}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
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
                onConfirm={confirmAction}
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