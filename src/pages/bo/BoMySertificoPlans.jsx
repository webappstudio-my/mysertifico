import React, { useState, useEffect, useMemo, useRef } from 'react'; // <-- FIX IS HERE
import BoSidebar from '../../components/bo/BoSidebar'; // Assuming you have these components
import BoNavbar from '../../components/bo/BoNavbar';   // Assuming you have these components
import BoSearchInput from '../../components/bo/BoSearchInput';

const initialPlanData = [
    { id: 1, countryCode: 'MY', currency: 'RM', planName: 'Standard Plan', price: 50, pricePerToken: 0.15, status: 'Active' },
    { id: 2, countryCode: 'MY', currency: 'RM', planName: 'Premium Plan', price: 100, pricePerToken: 0.13, status: 'Active' },
    { id: 3, countryCode: 'MY', currency: 'RM', planName: 'Pro Plan', price: 200, pricePerToken: 0.10, status: 'Active' },
    { id: 4, countryCode: 'ID', currency: 'IDR', planName: 'Standard Plan', price: 150000, pricePerToken: 450.45, status: 'Active' },
    { id: 5, countryCode: 'ID', currency: 'IDR', planName: 'Premium Plan', price: 300000, pricePerToken: 390.11, status: 'Active' },
    { id: 6, countryCode: 'ID', currency: 'IDR', planName: 'Pro Plan', price: 600000, pricePerToken: 300.00, status: 'Inactive' },
    { id: 7, countryCode: 'SG', currency: 'SGD', planName: 'Standard Plan', price: 20, pricePerToken: 0.06, status: 'Active' },
    { id: 8, countryCode: 'SG', currency: 'SGD', planName: 'Premium Plan', price: 40, pricePerToken: 0.05, status: 'Active' },
    { id: 9, countryCode: 'SG', currency: 'SGD', planName: 'Pro Plan', price: 80, pricePerToken: 0.04, status: 'Active' },
];

const ITEMS_PER_PAGE = 10;

const BoMySertificoPlans = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [plans, setPlans] = useState(initialPlanData);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [countryFilter, setCountryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal States
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null); // null for 'add' mode, plan object for 'edit' mode
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);

    // Memoized filtering logic
    const filteredPlans = useMemo(() => {
        return plans.filter(plan => {
            const matchesSearch = plan.planName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCountry = countryFilter === 'all' || plan.countryCode === countryFilter;
            return matchesSearch && matchesCountry;
        });
    }, [plans, searchTerm, countryFilter]);

    // Memoized pagination logic
    const paginatedPlans = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPlans.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredPlans, currentPage]);

    const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, countryFilter]);

    // --- Handlers ---
    const handleAddPlan = () => {
        setEditingPlan(null);
        setIsPlanModalOpen(true);
    };

    const handleEditPlan = (plan) => {
        setEditingPlan(plan);
        setIsPlanModalOpen(true);
    };

    const handleDeletePlan = (plan) => {
        setPlanToDelete(plan);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        setPlans(prevPlans => prevPlans.filter(p => p.id !== planToDelete.id));
        setIsConfirmModalOpen(false);
        setPlanToDelete(null);
    };

    const handleSavePlan = (formData) => {
        if (formData.id) { // Edit mode
            setPlans(prevPlans => prevPlans.map(p => p.id === formData.id ? { ...p, ...formData } : p));
        } else { // Add mode
            const newId = Math.max(...plans.map(p => p.id), 0) + 1;
            const newPlan = {
                ...formData,
                id: newId,
                status: 'Active' // Default status for new plans
            };
            setPlans(prevPlans => [...prevPlans, newPlan]);
        }
        setIsPlanModalOpen(false);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchTerm('');
        setCurrentPage(1);
    }

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    headerTitle="MySertifico Plans"
                />

                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Subscription Plans</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage MySertifico subscription plans and pricing for each country.</p>
                            </div>
                            <button onClick={handleAddPlan} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors w-full sm:w-auto">
                                <i className="ri-add-line"></i>
                                <span>Add New Plan</span>
                            </button>
                        </div>

                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md">
                            {/* Toolbar: Search & Filter */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                                {/* BoSearchInput component */}
                                <div className="flex-1 w-full md:max-w-80">
                                    <BoSearchInput
                                        value={searchInput}
                                        onChange={setSearchInput}
                                        onSearch={handleSearchSubmit}
                                        onClear={handleClearSearch}
                                        placeholder="Search by plan name..."
                                        activeSearchTerm={searchTerm}
                                        className="w-full md:w-auto"
                                    />
                                </div>

                                {/*} Previous search input
                                <div className="relative w-full md:w-80">
                                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        placeholder="Search by plan name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                </div>
                                */}
                                <select
                                    value={countryFilter}
                                    onChange={(e) => setCountryFilter(e.target.value)}
                                    className="w-full md:w-auto py-2.5 px-4 text-gray-700 dark:text-slate-200 border border-gray-400 dark:border-gray-500 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="all">All Countries</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="SG">Singapore</option>
                                </select>
                            </div>

                            {/* Plans List */}
                            <PlansTable
                                plans={paginatedPlans}
                                onEdit={handleEditPlan}
                                onDelete={handleDeletePlan}
                                page={currentPage}
                            />

                            {/* Pagination */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            <PlanModal
                isOpen={isPlanModalOpen}
                onClose={() => setIsPlanModalOpen(false)}
                onSave={handleSavePlan}
                plan={editingPlan}
            />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                plan={planToDelete}
            />
        </div>
    );
};

// --- Sub-components ---

const PlansTable = ({ plans, onEdit, onDelete, page }) => {
    if (plans.length === 0) {
        return (
            <div className="text-center py-16">
                <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Plans Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Your search or filter did not match any plans.</p>
            </div>
        );
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Country Code</th>
                            <th className="px-6 py-3">Plan</th>
                            <th className="px-6 py-3">Topup Price</th>
                            <th className="px-6 py-3">Price Per Token</th>
                            <th className="px-6 py-3">Tokens</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan, index) => <PlanRowDesktop key={plan.id} plan={plan} index={startIndex + index} onEdit={onEdit} onDelete={onDelete} />)}
                    </tbody>
                </table>
            </div>
            {/* Mobile List */}
            <div className="block md:hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {plans.map(plan => <PlanRowMobile key={plan.id} plan={plan} onEdit={onEdit} onDelete={onDelete} />)}
                </div>
            </div>
        </>
    );
};

const PlanRowDesktop = ({ plan, index, onEdit, onDelete }) => {
    const tokens = Math.floor(plan.price / plan.pricePerToken);
    const statusClass = plan.status === 'Active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{index + 1}</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{plan.countryCode}</td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{plan.planName}</td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{plan.currency} {plan.price.toLocaleString()}</td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{plan.currency} {plan.pricePerToken.toFixed(2)}</td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{tokens.toLocaleString()}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>{plan.status}</span>
            </td>
            <td className="px-6 py-4 text-right flex justify-end items-center gap-2">
                <button onClick={() => onEdit(plan)} className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit Plan"><i className="ri-pencil-line"></i></button>
                <button onClick={() => onDelete(plan)} className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500" title="Delete Plan"><i className="ri-delete-bin-line"></i></button>
            </td>
        </tr>
    );
};

const PlanRowMobile = ({ plan, onEdit, onDelete }) => {
    const tokens = Math.floor(plan.price / plan.pricePerToken);
    const statusClass = plan.status === 'Active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

    return (
        <div className="p-4 flex justify-between items-center">
            <div>
                <div className="font-medium text-gray-900 dark:text-white">{plan.planName} ({plan.countryCode})</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{plan.currency} {plan.price.toLocaleString()} for {tokens.toLocaleString()} tokens</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">≈ {plan.currency} {plan.pricePerToken.toFixed(2)} per token</div>
                <div className="mt-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>{plan.status}</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button onClick={() => onEdit(plan)} className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit Plan"><i className="ri-pencil-line"></i></button>
                <button onClick={() => onDelete(plan)} className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500" title="Delete Plan"><i className="ri-delete-bin-line"></i></button>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <nav className="flex items-center gap-x-1">
                <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"><i className="ri-arrow-left-s-line"></i></button>
                {pages.map(page => (
                    <button key={page} type="button" onClick={() => onPageChange(page)} className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${currentPage === page ? 'bg-teal-600 text-white' : 'text-gray-800 hover:bg-gray-100'} py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`}>{page}</button>
                ))}
                <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"><i className="ri-arrow-right-s-line"></i></button>
            </nav>
        </div>
    );
};

const PlanModal = ({ isOpen, onClose, onSave, plan }) => {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState('');
    const modalPanelRef = useRef(null);

    const currencyMap = { MY: 'RM', ID: 'IDR', SG: 'SGD', '': '...' };

    useEffect(() => {
        if (plan) { // Edit mode
            setFormData({ ...plan });
        } else { // Add mode
            setFormData({
                id: null,
                countryCode: '',
                planName: '',
                price: '',
                pricePerToken: ''
            });
        }
        setFormError('');
    }, [plan, isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                modalPanelRef.current?.classList.remove('opacity-0', 'scale-95');
            }, 10);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { countryCode, planName, price, pricePerToken } = formData;
        if (!countryCode || !planName.trim() || !price || !pricePerToken || parseFloat(price) < 0 || parseFloat(pricePerToken) <= 0) {
            setFormError('All fields are required and must be valid numbers.');
            return;
        }
        onSave({
            ...formData,
            price: parseFloat(price),
            pricePerToken: parseFloat(pricePerToken),
            currency: currencyMap[countryCode]
        });
    };

    const handleClose = () => {
        modalPanelRef.current?.classList.add('opacity-0', 'scale-95');
        setTimeout(onClose, 200);
    };

    const calculatedTokens = useMemo(() => {
        const price = parseFloat(formData.price);
        const pricePerToken = parseFloat(formData.pricePerToken);
        if (!isNaN(price) && !isNaN(pricePerToken) && pricePerToken > 0) {
            return Math.floor(price / pricePerToken).toLocaleString();
        }
        return '';
    }, [formData.price, formData.pricePerToken]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
            <div ref={modalPanelRef} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all opacity-0 scale-95 my-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">{plan ? 'Edit Plan' : 'Add New Plan'}</h3>
                        <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><i className="ri-close-line text-2xl"></i></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                                <select id="countryCode" value={formData.countryCode || ''} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                    <option value="">Select Country</option>
                                    <option value="MY">Malaysia (MY)</option>
                                    <option value="ID">Indonesia (ID)</option>
                                    <option value="SG">Singapore (SG)</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="planName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan Name</label>
                                <input type="text" id="planName" value={formData.planName || ''} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700" placeholder="e.g., Enterprise Plan" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topup Price ({currencyMap[formData.countryCode]})</label>
                            <input type="number" id="price" step="any" value={formData.price || ''} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700" />
                        </div>
                        <div>
                            <label htmlFor="pricePerToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Per Token ({currencyMap[formData.countryCode]})</label>
                            <input type="number" id="pricePerToken" step="any" value={formData.pricePerToken || ''} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700" />
                        </div>
                        <div>
                            <label htmlFor="tokens-calculated" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tokens (Auto-calculated)</label>
                            <input type="text" id="tokens-calculated" value={calculatedTokens} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm bg-gray-200 dark:bg-gray-800/50 cursor-not-allowed" readOnly />
                        </div>
                        {formError && <small className="text-red-500">{formError}</small>}
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                        <button type="button" onClick={handleClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">{plan ? 'Save Changes' : 'Add Plan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, plan }) => {
    const modalPanelRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                modalPanelRef.current?.classList.remove('opacity-0', 'scale-95');
            }, 10);
        }
    }, [isOpen]);

    const handleClose = () => {
        modalPanelRef.current?.classList.add('opacity-0', 'scale-95');
        setTimeout(onClose, 200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[130] flex items-center justify-center p-4">
            <div ref={modalPanelRef} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all opacity-0 scale-95">
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
                        <i className="ri-error-warning-line text-4xl text-red-600 dark:text-red-400"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Delete Plan?</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete the "{plan?.planName}" for {plan?.countryCode}? This action cannot be undone.
                    </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
                    <button onClick={handleClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors w-full">Cancel</button>
                    <button onClick={onConfirm} className="text-white font-semibold py-2 px-4 rounded-lg w-full bg-red-600 hover:bg-red-700">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BoMySertificoPlans;