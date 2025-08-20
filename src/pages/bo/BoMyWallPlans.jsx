// src/pages/bo/BoMyWallPlans.jsx
import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoMyWallPlans = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [planData, setPlanData] = useState([
        { id: 1, country: 'Malaysia', currency: 'MYR', name: 'Trial', totalPrice: 0, subscriptionFee: 0, pricePerToken: 0, tokenAllocation: 30, status: 'Active' },
        { id: 2, country: 'Malaysia', currency: 'MYR', name: 'Standard', totalPrice: 10, subscriptionFee: 5, pricePerToken: 0.20, tokenAllocation: 25, status: 'Active' },
        { id: 3, country: 'Malaysia', currency: 'MYR', name: 'Premium', totalPrice: 20, subscriptionFee: 5, pricePerToken: 0.18, tokenAllocation: 83, status: 'Active' },
        { id: 4, country: 'Malaysia', currency: 'MYR', name: 'Pro', totalPrice: 30, subscriptionFee: 5, pricePerToken: 0.15, tokenAllocation: 166, status: 'Active' },
        { id: 5, country: 'Malaysia', currency: 'MYR', name: 'Family', totalPrice: 30, subscriptionFee: 15, pricePerToken: 0.20, tokenAllocation: 75, status: 'Active' },
        { id: 6, country: 'Malaysia', currency: 'MYR', name: 'Pilot', totalPrice: 0, subscriptionFee: 0, pricePerToken: 0, tokenAllocation: 0, status: 'Inactive' },
    ]);
    
    const [filteredData, setFilteredData] = useState([...planData]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [countryFilter, setCountryFilter] = useState('all');
    const [planFilter, setPlanFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    
    // Form states
    const [formData, setFormData] = useState({
        id: null,
        country: 'Malaysia',
        name: 'Trial',
        totalPrice: 0,
        subscriptionFee: 0,
        pricePerToken: 0,
        tokenAllocation: 0,
        status: 'Active'
    });
    
    const countryCurrencyMap = {
        'Malaysia': 'MYR',
        'Singapore': 'SGD',
        'Indonesia': 'IDR',
        'Brunei': 'BND'
    };
    
    // Get unique countries and plan names for filters
    const countries = [...new Set(planData.map(p => p.country))].sort();
    const planNames = [...new Set(planData.map(p => p.name))].sort();
    
    // Calculate token fee and allocation
    const calculateValues = () => {
        const tokenFee = Math.max(0, formData.totalPrice - formData.subscriptionFee);
        const tokenAllocation = formData.pricePerToken > 0 ? Math.floor(tokenFee / formData.pricePerToken) : 0;
        return { tokenFee, tokenAllocation };
    };
    
    const { tokenFee, tokenAllocation } = calculateValues();
    
    // Apply filters
    useEffect(() => {
        let filtered = planData;
        
        if (searchTerm) {
            filtered = filtered.filter(plan => 
                plan.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (countryFilter !== 'all') {
            filtered = filtered.filter(plan => plan.country === countryFilter);
        }
        
        if (planFilter !== 'all') {
            filtered = filtered.filter(plan => plan.name === planFilter);
        }
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(plan => plan.status === statusFilter);
        }
        
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, countryFilter, planFilter, statusFilter, planData]);
    
    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const openAddModal = () => {
        setIsEditMode(false);
        setFormData({
            id: null,
            country: 'Malaysia',
            name: 'Trial',
            totalPrice: '',
            subscriptionFee: '',
            pricePerToken: '',
            tokenAllocation: 0,
            status: 'Active'
        });
        setIsModalOpen(true);
    };
    
    const openEditModal = (plan) => {
        setIsEditMode(true);
        setCurrentPlan(plan);
        setFormData({
            ...plan
        });
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPlan(null);
    };
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // if the name is value, then empty, if empty then empty, if not parse value
            [name]: name === 'totalPrice' || name === 'subscriptionFee' || name === 'pricePerToken' 
                ? value === '' ? '' : parseFloat(value) || 0
                : value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedPlan = {
            ...formData,
            currency: countryCurrencyMap[formData.country],
            tokenAllocation: tokenAllocation
        };
        
        if (isEditMode && currentPlan) {
            setPlanData(prev => prev.map(plan => 
                plan.id === currentPlan.id ? updatedPlan : plan
            ));
        } else {
            const newId = Math.max(0, ...planData.map(p => p.id)) + 1;
            setPlanData(prev => [...prev, { ...updatedPlan, id: newId }]);
        }
        
        closeModal();
    };
    // Search handlers
    const handleSearchSubmit = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchTerm('');
        setCurrentPage(1);
    };

    
    const openDeleteConfirmation = (plan) => {
        setPlanToDelete(plan);
        setIsConfirmModalOpen(true);
    };
    
    const handleDelete = () => {
        if (planToDelete) {
            setPlanData(prev => prev.filter(plan => plan.id !== planToDelete.id));
            setIsConfirmModalOpen(false);
            setPlanToDelete(null);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar onSidebarToggle={handleSidebarToggle} headerTitle="MyWall Plans" />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">MyWall Subscription Plans</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all MyWall subscription plans.</p>
                            </div>
                            <button 
                                onClick={openAddModal}
                                className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors w-full sm:w-auto"
                            >
                                <i className="ri-add-line"></i>
                                <span>Add New Plan</span>
                            </button>
                        </div>
                        
                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            {/* Filters */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by plan name..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                                />
                                {/*
                                <div className="relative w-full md:w-auto md:flex-grow">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Search by plan name..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                */}
                                <select 
                                    value={countryFilter}
                                    onChange={(e) => setCountryFilter(e.target.value)}
                                    className="w-full md:w-40 py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Countries</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <select 
                                    value={planFilter}
                                    onChange={(e) => setPlanFilter(e.target.value)}
                                    className="w-full md:w-40 py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Plans</option>
                                    {planNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full md:w-40 py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            
                            {/* Plans Table */}
                            {currentItems.length === 0 ? (
                                <div className="text-center py-16 px-4">
                                    <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Plans Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">Your search or filter did not match any plans.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop Table */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3">#</th>
                                                    <th className="px-6 py-3">Country</th>
                                                    <th className="px-6 py-3">Plan Name</th>
                                                    <th className="px-6 py-3">Total Price (per year)</th>
                                                    <th className="px-6 py-3">Subscription Fee</th>
                                                    <th className="px-6 py-3">Token Allocation</th>
                                                    <th className="px-6 py-3">Status</th>
                                                    <th className="px-6 py-3 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((plan, index) => (
                                                    <tr key={plan.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                                        <td className="px-6 py-4 text-black dark:text-white">{indexOfFirstItem + index + 1}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">{plan.country}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">{plan.name}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">{plan.currency} {plan.totalPrice.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">{plan.currency} {plan.subscriptionFee.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">{plan.tokenAllocation.toLocaleString()}</td>
                                                        <td className="px-6 py-4 text-black dark:text-white">
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                                plan.status === 'Active' 
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                            }`}>
                                                                {plan.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-x-1">
                                                                <button 
                                                                    onClick={() => openEditModal(plan)}
                                                                    className="p-2 text-gray-500 hover:text-primary dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                                                    title="Edit Plan"
                                                                >
                                                                    <i className="ri-pencil-line"></i>
                                                                </button>
                                                                <button 
                                                                    onClick={() => openDeleteConfirmation(plan)}
                                                                    className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10" 
                                                                    title="Delete Plan"
                                                                >
                                                                    <i className="ri-delete-bin-line"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {/* Mobile Cards */}
                                    <div className="block md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentItems.map(plan => (
                                            <div key={plan.id} className="p-4  flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {plan.name} ({plan.country})
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold ">{plan.currency} {plan.totalPrice.toFixed(2)}</span> | Tokens: {plan.tokenAllocation.toLocaleString()}
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            plan.status === 'Active' 
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        }`}>
                                                            {plan.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button 
                                                        onClick={() => openEditModal(plan)}
                                                        className="p-2" 
                                                        title="Edit Plan"
                                                    >
                                                        <i className="ri-pencil-line text-lg"></i>
                                                    </button>
                                                    <button 
                                                        onClick={() => openDeleteConfirmation(plan)}
                                                        className="p-2" 
                                                        title="Delete Plan"
                                                    >
                                                        <i className="ri-delete-bin-line text-lg text-red-500"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Pagination */}
                                    {filteredData.length > itemsPerPage && (
                                        <div className="flex justify-center p-4 border-t border-gray-200 dark:border-gray-700">
                                            <BoPagination
                                                currentPage={currentPage}
                                                totalItems={filteredData.length}
                                                itemsPerPage={itemsPerPage}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Add/Edit Plan Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all my-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
                                    {isEditMode ? 'Edit Plan' : 'Add New Plan'}
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Country
                                        </label>
                                        <select 
                                            name="country"
                                            value={formData.country}
                                            onChange={handleFormChange}
                                            className="w-full py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            {Object.keys(countryCurrencyMap).map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Plan Name
                                        </label>
                                        <select 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            className="w-full py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            <option value="Trial">Trial</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                            <option value="Pro">Pro</option>
                                            <option value="Family">Family</option>
                                            <option value="Pilot">Pilot</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Total Price ({countryCurrencyMap[formData.country]})
                                        </label>
                                        <input 
                                            type="number" 
                                            name="totalPrice"
                                            value={formData.totalPrice}
                                            onChange={handleFormChange}
                                            step="0.01" 
                                            className="w-full py-2 px-4 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Subscription Fee ({countryCurrencyMap[formData.country]})
                                        </label>
                                        <input 
                                            type="number" 
                                            name="subscriptionFee"
                                            value={formData.subscriptionFee}
                                            onChange={handleFormChange}
                                            step="0.01" 
                                            className="w-full py-2 px-4 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Token Fee (Calculated)
                                        </label>
                                        <input 
                                            type="text" 
                                            value={tokenFee.toFixed(2)}
                                            className="w-full py-2 px-4 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Price per Token ({countryCurrencyMap[formData.country]})
                                        </label>
                                        <input 
                                            type="number" 
                                            name="pricePerToken"
                                            value={formData.pricePerToken}
                                            onChange={handleFormChange}
                                            step="0.01" 
                                            className="w-full py-2 px-4 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Token Allocation (Calculated)
                                        </label>
                                        <input 
                                            type="text" 
                                            value={tokenAllocation.toLocaleString()}
                                            className="w-full py-2 px-4 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Status
                                        </label>
                                        <select 
                                            name="status"
                                            value={formData.status}
                                            onChange={handleFormChange}
                                            className="w-full py-2 px-3 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    {isEditMode ? 'Save Changes' : 'Add Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Confirmation Modal */}
            <BoConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Delete Plan?"
                message={`Are you sure you want to delete the "${planToDelete?.name}" plan? This action cannot be undone.`}
                iconClass="ri-delete-bin-line text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default BoMyWallPlans;