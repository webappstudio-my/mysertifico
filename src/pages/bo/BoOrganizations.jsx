import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoOrganizations = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [modalPlan, setModalPlan] = useState('');
    const [modalStatus, setModalStatus] = useState('');
    
    const itemsPerPage = 10;

    // Sample data - in production, this would come from an API
    const [organizationData, setOrganizationData] = useState([
        { id: 1, name: 'SK Seri Mutiara', plan: 'Premium', tokenBalance: 1500, status: 'Active', dateJoined: '2024-01-15', certificatesGenerated: 1250 },
        { id: 2, name: 'SMK Taman Indah', plan: 'Standard', tokenBalance: 850, status: 'Active', dateJoined: '2024-02-20', certificatesGenerated: 875 },
        { id: 3, name: 'Kolej Vokasional Maju', plan: 'Trial', tokenBalance: 0, status: 'Inactive', dateJoined: '2024-03-01', certificatesGenerated: 320 },
        { id: 4, name: 'Universiti Teknologi Pintar', plan: 'Pro', tokenBalance: 5000, status: 'Active', dateJoined: '2024-03-10', certificatesGenerated: 10500 },
        { id: 5, name: 'SJK(C) Chung Hwa', plan: 'Pilot', tokenBalance: 450, status: 'Active', dateJoined: '2024-04-05', certificatesGenerated: 480 },
        { id: 6, name: 'SJK(T) Vivekananda', plan: 'Trial', tokenBalance: 20, status: 'Inactive', dateJoined: '2024-04-22', certificatesGenerated: 150 },
        { id: 7, name: 'Sekolah Menengah Sains', plan: 'Premium', tokenBalance: 2200, status: 'Active', dateJoined: '2024-05-18', certificatesGenerated: 2500 },
        { id: 8, name: 'Maktab Rendah Sains MARA', plan: 'Pro', tokenBalance: 3100, status: 'Active', dateJoined: '2024-05-30', certificatesGenerated: 4200 },
        { id: 9, name: 'Akademi Seni Kreatif', plan: 'Trial', tokenBalance: 75, status: 'Inactive', dateJoined: '2024-06-11', certificatesGenerated: 95 },
        { id: 10, name: 'Institut Kemahiran Belia Negara', plan: 'Standard', tokenBalance: 1250, status: 'Active', dateJoined: '2024-06-25', certificatesGenerated: 1800 },
        { id: 11, name: 'Pusat Tuisyen Cemerlang', plan: 'Standard', tokenBalance: 980, status: 'Active', dateJoined: '2024-07-02', certificatesGenerated: 650 },
    ]);

    // Filter data based on search and status
    const filteredData = organizationData.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Paginate filtered data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPlanBadge = (plan) => {
        const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
        switch (plan) {
            case 'Trial':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
            case 'Standard':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
            case 'Premium':
                return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300`;
            case 'Pro':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
            case 'Pilot':
                return `${baseClasses} bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300`;
            default:
                return baseClasses;
        }
    };

    const getStatusBadge = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    const openManageModal = (org) => {
        setSelectedOrg(org);
        setModalPlan(org.plan);
        setModalStatus(org.status);
        setIsManageModalOpen(true);
    };

    const closeManageModal = () => {
        setIsManageModalOpen(false);
        setSelectedOrg(null);
    };

    const handleSaveChanges = () => {
        if (selectedOrg) {
            const updatedData = organizationData.map(org => {
                if (org.id === selectedOrg.id) {
                    return { ...org, plan: modalPlan, status: modalStatus };
                }
                return org;
            });
            setOrganizationData(updatedData);
        }
        closeManageModal();
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
            <BoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar onSidebarToggle={handleSidebarToggle} headerTitle="Organizations" />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Registered Organizations
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    View and manage all subscribed organizations.
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
                                    placeholder="Search by organization name..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                                />
                                {/*<div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        placeholder="Search by organization name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                </div>*/}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full md:w-auto py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Organizations List */}
                            <div className="overflow-x-auto">
                                {filteredData.length === 0 ? (
                                    <div className="text-center py-16 px-4">
                                        <div className="flex flex-col items-center">
                                            <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                                No Organizations Found
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                                Your search or filter did not match any organizations.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Desktop Table */}
                                        <div className="hidden md:block">
                                            <table className="w-full text-sm text-left">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th className="px-6 py-3">#</th>
                                                        <th className="px-6 py-3">Organization</th>
                                                        <th className="px-6 py-3">Current Token Balance</th>
                                                        <th className="px-6 py-3">Certs Generated</th>
                                                        <th className="px-6 py-3">Status</th>
                                                        <th className="px-6 py-3">Date Joined</th>
                                                        <th className="px-6 py-3 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedData.map((org, index) => (
                                                        <tr key={org.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                {startIndex + index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                                {org.name}
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">
                                                                {org.tokenBalance.toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                {org.certificatesGenerated.toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(org.status)}`}>
                                                                    {org.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                                {org.dateJoined}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={() => openManageModal(org)}
                                                                    className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                    title="Manage"
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
                                                {paginatedData.map((org) => (
                                                    <div key={org.id} className="p-4 flex justify-between items-start">
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">
                                                                {org.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                Token: <span className="font-semibold">{org.tokenBalance.toLocaleString()}</span> | 
                                                                Certs: {org.certificatesGenerated.toLocaleString()}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                Joined: {org.dateJoined}
                                                            </div>
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <span className={getPlanBadge(org.plan)}>
                                                                    {org.plan}
                                                                </span>
                                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(org.status)}`}>
                                                                    {org.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => openManageModal(org)}
                                                            className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            title="Manage"
                                                        >
                                                            <i className="ri-settings-3-line text-lg"></i>
                                                        </button>
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

            {/* Manage Organization Modal */}
            {isManageModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all ${isManageModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                Manage Organization
                            </h3>
                            <button
                                type="button"
                                onClick={closeManageModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-semibold text-xl text-gray-900 dark:text-white">
                                    {selectedOrg?.name}
                                </h4>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="org-plan-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Subscription Plan
                                    </label>
                                    <select
                                        id="org-plan-select"
                                        value={modalPlan}
                                        onChange={(e) => setModalPlan(e.target.value)}
                                        className="mt-1 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    >
                                        <option value="Trial">Trial</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Pro">Pro</option>
                                        <option value="Pilot">Pilot</option>
                                    </select>
                                    {modalPlan === 'Pilot' && (
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <i className="ri-information-line"></i> <b>Pilot Plan:</b> Free lifetime access for selected organizations helping test MySertifico.
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
                                            <i className={`text-3xl ${modalStatus === 'Active' ? 'ri-toggle-fill text-teal-600' : 'ri-toggle-line text-gray-500'}`}></i>
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
                                className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
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

export default BoOrganizations;