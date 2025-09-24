import React, { useState, useEffect } from 'react';
import StudentNavbar from '../../../components/mywall/StudentNavbar';
import Toast from '../../../components/mywall/Toast';

const StudentMyAccount = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modals, setModals] = useState({
        confirmation: false,
        cancel: false,
        topUp: false,
        paymentCheckout: false,
        fpx: false,
        fpxLogin: false,
        qrCode: false,
        cardPayment: false,
        paymentResult: false
    });
    const [toast, setToast] = useState({ show: false, message: '', isError: false });
    const [currentPlanId, setCurrentPlanId] = useState('trial');
    const [targetPlanId, setTargetPlanId] = useState(null);
    const [currentUsage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastOrderData, setLastOrderData] = useState({
        label: '',
        grandTotal: 'RM 0.00',
        selectedBank: ''
    });
    const [selectedTopUpOption, setSelectedTopUpOption] = useState('25');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('fpx');
    const [selectedFpxBank, setSelectedFpxBank] = useState('');
    const [cardForm, setCardForm] = useState({
        name: '',
        number: '',
        expiry: '',
        cvc: ''
    });

    const rowsPerPage = 4;

    const fpxBanks = [
        { value: "Maybank", name: "Maybank2u" },
        { value: "CIMB Clicks", name: "CIMB Clicks" },
        { value: "Public Bank", name: "Public Bank" },
        { value: "RHB Bank", name: "RHB Now" },
        { value: "Hong Leong Bank", name: "Hong Leong Connect" },
        { value: "AmBank", name: "AmBank" },
        { value: "Bank Islam", name: "Bank Islam" },
        { value: "Bank Rakyat", name: "Bank Rakyat" },
        { value: "Affin Bank", name: "Affin Bank" },
        { value: "Bank Muamalat", name: "Bank Muamalat" },
        { value: "OCBC Bank", name: "OCBC Bank" },
        { value: "Standard Chartered", name: "Standard Chartered" },
        { value: "UOB Bank", name: "UOB Bank" }
    ];

    const plans = [
        { id: 'trial', name: 'Trial', price: 'Free', priceSuffix: '', priceValue: 0, level: 0, uploads: 3, description: '14-day trial with 3 free uploads.' },
        { id: 'standard', name: 'Standard', price: 'RM10', priceSuffix: '/year', priceValue: 10, level: 1, uploads: 25, description: 'RM5 fee + RM5 for 25 tokens.' },
        { id: 'premium', name: 'Premium', price: 'RM20', priceSuffix: '/year', priceValue: 20, level: 2, uploads: 100, description: 'RM5 fee + RM15 for 100 tokens.' },
        { id: 'parent', name: 'Parent', price: 'RM30', priceSuffix: '/year', priceValue: 30, level: 3, uploads: 150, description: 'RM15 fee + RM15 for 150 tokens.' }
    ];

    const billingData = [
        { date: 'July 15, 2025', desc: 'Standard Plan - Annual', amount: 'RM10.00' },
        { date: 'June 10, 2025', desc: 'Top-up: 25 Uploads', amount: 'RM5.00' },
        { date: 'May 5, 2025', desc: 'Top-up: 50 Uploads', amount: 'RM10.00' },
        { date: 'July 15, 2024', desc: 'Standard Plan - Annual', amount: 'RM10.00' },
        { date: 'March 2, 2024', desc: 'Top-up: 25 Uploads', amount: 'RM5.00' },
        { date: 'July 15, 2023', desc: 'Trial to Standard Upgrade', amount: 'RM10.00' }
    ];

    const showToast = (message, isError = false) => {
        setToast({ show: true, message, isError });
        setTimeout(() => setToast({ show: false, message: '', isError: false }), 3000);
    };

    const openModal = (modalName) => {
        setModals(prev => {
            const newModals = { ...prev, [modalName]: true };
            // Only set overflow hidden if this is the first modal
            const wasAnyOpen = Object.values(prev).some(isOpen => isOpen);
            if (!wasAnyOpen) {
                document.body.style.overflow = 'hidden';
            }
            return newModals;
        });
    };

    const closeModal = (modalName) => {
        setModals(prev => {
            const newModals = { ...prev, [modalName]: false };
            // Only reset overflow if this was the last open modal
            const anyStillOpen = Object.values(newModals).some(isOpen => isOpen);
            if (!anyStillOpen) {
                document.body.style.overflow = '';
            }
            return newModals;
        });
    };

    const closeAllModals = () => {
        setModals({
            confirmation: false,
            cancel: false,
            topUp: false,
            paymentCheckout: false,
            fpx: false,
            fpxLogin: false,
            qrCode: false,
            cardPayment: false,
            paymentResult: false
        });
        document.body.style.overflow = '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleTopUpSubmit = (e) => {
        e.preventDefault();
        const price = selectedTopUpOption === '25' ? 5.00 : 10.00;
        const label = selectedTopUpOption === '25' ? '25 Extra Uploads' : '50 Extra Uploads';
        const sstRate = 0.08;
        const subTotal = price;
        const sstAmount = subTotal * sstRate;
        const grandTotal = subTotal + sstAmount;

        setLastOrderData({
            label,
            grandTotal: `RM ${grandTotal.toFixed(2)}`,
            selectedBank: ''
        });

        closeModal('topUp');
        setTimeout(() => openModal('paymentCheckout'), 350);
    };

    const handlePaymentCheckoutSubmit = (e) => {
        e.preventDefault();
        closeModal('paymentCheckout');
        setTimeout(() => {
            if (selectedPaymentMethod === 'ewallet') {
                openModal('qrCode');
            } else if (selectedPaymentMethod === 'card') {
                openModal('cardPayment');
            } else if (selectedPaymentMethod === 'fpx') {
                openModal('fpx');
            }
        }, 350);
    };

    const handleFpxSubmit = (e) => {
        e.preventDefault();
        if (!selectedFpxBank) {
            showToast('Please select a bank to continue.', true);
            return;
        }
        closeModal('fpx');
        setTimeout(() => openModal('fpxLogin'), 350);
    };

    const handleCardPaymentSubmit = (e) => {
        e.preventDefault();
        showToast('Payment Successful! This is a demo.');
        closeModal('cardPayment');
        setTimeout(() => openModal('paymentResult'), 350);
    };

    const handlePlanChange = (planId) => {
        setTargetPlanId(planId);
        const targetPlan = plans.find(p => p.id === planId);
        const currentPlan = plans.find(p => p.id === currentPlanId);
        const isUpgrade = targetPlan.level > currentPlan.level;

        if (isUpgrade) {
            const price = targetPlan.priceValue;
            const label = `${targetPlan.name} Plan Upgrade`;
            const sstRate = 0.08;
            const subTotal = price;
            const sstAmount = subTotal * sstRate;
            const grandTotal = subTotal + sstAmount;

            setLastOrderData({
                label,
                grandTotal: `RM ${grandTotal.toFixed(2)}`,
                selectedBank: ''
            });

            openModal('paymentCheckout');
        } else {
            openModal('confirmation');
        }
    };

    const handleConfirmPlanChange = () => {
        showToast('Your plan will be downgraded at the end of the billing period. (Demo)');
        closeModal('confirmation');
    };

    const handleCancelSubscription = () => {
        closeModal('cancel');
        showToast('Subscription cancelled successfully. This is a demo.');
    };

    const getCurrentPlan = () => plans.find(p => p.id === currentPlanId);
    const getDateDisplay = () => {
        const today = new Date('2025-08-23T11:05:00');
        const plan = getCurrentPlan();
        let startDate, expiryDate;

        if (plan.id === 'trial') {
            startDate = today;
            expiryDate = new Date(today);
            expiryDate.setDate(today.getDate() + 14);
        } else {
            const lastRenewal = billingData.find(item => item.desc.toLowerCase().includes('plan'));
            startDate = lastRenewal ? new Date(lastRenewal.date) : new Date(today.setFullYear(today.getFullYear() - 1));
            expiryDate = new Date(startDate);
            expiryDate.setFullYear(startDate.getFullYear() + 1);
        }

        const formatDate = (date) => date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return { startDate: formatDate(startDate), expiryDate: formatDate(expiryDate) };
    };

    const getBillingPageData = () => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return billingData.slice(start, end);
    };

    const getPageCount = () => Math.ceil(billingData.length / rowsPerPage);

    const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-md" }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
                <div className={`relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <StudentNavbar />

            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">My Account</h1>
                            <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">
                                Manage your plan, usage, and billing history.
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-1 space-y-8">
                                {/* Current Plan Summary */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-primary-mywall-300 mb-4">Current Plan</h3>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-3xl font-poppins font-bold text-white">{getCurrentPlan().name}</h2>
                                            <span className={`${getCurrentPlan().id === 'trial' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'} text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                                                <i className="ri-checkbox-circle-fill"></i>Active
                                            </span>
                                        </div>
                                        <p className="text-3xl font-bold text-white mt-4">
                                            {getCurrentPlan().price}
                                            <span className="text-lg text-primary-mywall-300">{getCurrentPlan().priceSuffix}</span>
                                        </p>
                                        <p className="text-sm text-primary-mywall-200 mt-2">
                                            Includes {getCurrentPlan().uploads} external certificate uploads.
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-primary-mywall-800/50 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-primary-mywall-300">Start Date:</span>
                                                <span className="font-semibold text-white">{getDateDisplay().startDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-primary-mywall-300">Expiry Date:</span>
                                                <span className="font-semibold text-white">{getDateDisplay().expiryDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage Summary */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-primary-mywall-300 mb-4">Usage & Top-ups</h3>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-base font-medium text-primary-mywall-200">External Certificate Uploads</span>
                                            <span className="text-sm font-medium text-white">{currentUsage} / {getCurrentPlan().uploads}</span>
                                        </div>
                                        <div className="w-full bg-primary-mywall-800/50 rounded-full h-4">
                                            <div
                                                className="bg-accent h-4 rounded-full"
                                                style={{ width: `${Math.min(100, (currentUsage / getCurrentPlan().uploads) * 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-primary-mywall-300 mt-2">
                                            You have {Math.max(0, getCurrentPlan().uploads - currentUsage)} uploads remaining.
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-primary-mywall-800/50">
                                        <p className="text-primary-mywall-200 mb-2">Need more uploads?</p>
                                        <button
                                            onClick={() => openModal('topUp')}
                                            className="bg-accent hover:bg-accent-hover text-white font-semibold py-2 px-5 rounded-full transition-colors"
                                        >
                                            Top-up Now
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="bg-red-900/20 border border-red-500/50 rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-red-300 mb-2">Danger Zone</h3>
                                    <p className="text-red-200/80 text-sm mb-4">
                                        If you cancel, your subscription will remain active until the end of the current billing period.
                                    </p>
                                    <button
                                        onClick={() => openModal('cancel')}
                                        className="w-full md:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Cancel Subscription
                                    </button>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Change Plan */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Change Your Plan</h3>
                                    <div className="space-y-4">
                                        {plans.filter(plan => plan.id !== 'trial').map(plan => {
                                            const currentPlan = getCurrentPlan();
                                            const isCurrent = plan.id === currentPlanId;

                                            return (
                                                <div
                                                    key={plan.id}
                                                    className={`border-2 ${isCurrent ? "border-accent" : "border-primary-mywall-700/50"} rounded-lg p-5 flex flex-col md:flex-row justify-between items-center relative transition-all`}
                                                >
                                                    {isCurrent && (
                                                        <span className="absolute -top-3 bg-accent text-white px-3 py-1 text-xs font-bold rounded-full">
                                                            Current Plan
                                                        </span>
                                                    )}
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                                                        <p className="text-primary-mywall-200">{plan.description}</p>
                                                    </div>
                                                    <div className="text-center md:text-right mt-4 md:mt-0">
                                                        <p className="text-2xl font-bold text-white">
                                                            {plan.price}
                                                            <span className="text-base text-primary-mywall-300">{plan.priceSuffix}</span>
                                                        </p>
                                                        {isCurrent ? (
                                                            <button
                                                                disabled
                                                                className="mt-2 px-6 py-2 bg-primary-mywall text-white font-semibold rounded-lg cursor-not-allowed opacity-50"
                                                            >
                                                                Current Plan
                                                            </button>
                                                        ) : plan.level < currentPlan.level ? (
                                                            <button
                                                                onClick={() => handlePlanChange(plan.id)}
                                                                className="mt-2 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                                                            >
                                                                Downgrade
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handlePlanChange(plan.id)}
                                                                className="mt-2 px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                                                            >
                                                                Upgrade
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Billing History */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Billing History</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-primary-mywall-200 uppercase border-b border-primary-mywall-700/50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3">Date</th>
                                                    <th scope="col" className="px-4 py-3">Description</th>
                                                    <th scope="col" className="px-4 py-3">Amount</th>
                                                    <th scope="col" className="px-4 py-3">Invoice</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getBillingPageData().map((item, index) => (
                                                    <tr key={index} className="border-b border-primary-mywall-800/50 hover:bg-white/5">
                                                        <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{item.date}</td>
                                                        <td className="px-4 py-3">{item.desc}</td>
                                                        <td className="px-4 py-3">{item.amount}</td>
                                                        <td className="px-4 py-3">
                                                            <a href="#" className="text-accent hover:text-accent-hover font-medium">
                                                                Invoice <i className="ri-download-2-line"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <nav className="flex justify-between items-center pt-4">
                                        <span className="text-sm font-normal text-primary-mywall-300">
                                            Showing <span className="font-semibold text-white">{(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, billingData.length)}</span>
                                            {' '}of <span className="font-semibold text-white">{billingData.length}</span>
                                        </span>
                                        <div className="inline-flex items-center -space-x-px">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className="px-3 h-8 ms-0 leading-tight text-primary-mywall-300 bg-white/10 border border-primary-mywall-700 rounded-s-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Prev
                                            </button>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(getPageCount(), prev + 1))}
                                                disabled={currentPage === getPageCount()}
                                                className="px-3 h-8 leading-tight text-primary-mywall-300 bg-white/10 border border-primary-mywall-700 rounded-e-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modals */}
            {/* Confirmation Modal */}
            <Modal isOpen={modals.confirmation} onClose={() => closeModal('confirmation')}>
                <div className="p-6 text-center">
                    <div className="text-5xl text-primary-mywall-400 mb-4">
                        <i className="ri-question-line"></i>
                    </div>
                    <h3 className="text-lg font-bold text-white">Confirm Plan Change</h3>
                    <p className="text-sm text-primary-mywall-200 mt-2">
                        Are you sure you want to downgrade to the {plans.find(p => p.id === targetPlanId)?.name} plan?
                        This change will take effect at the end of your current billing cycle.
                    </p>
                </div>
                <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50 bg-white/5">
                    <button
                        onClick={() => closeModal('confirmation')}
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmPlanChange}
                        className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
                    >
                        Yes, Confirm
                    </button>
                </div>
            </Modal>

            {/* Cancel Subscription Modal */}
            <Modal isOpen={modals.cancel} onClose={() => closeModal('cancel')}>
                <div className="p-6 text-center">
                    <div className="text-5xl text-red-400 mb-4">
                        <i className="ri-error-warning-line"></i>
                    </div>
                    <h3 className="text-lg font-bold text-white">Are you sure you want to cancel?</h3>
                    <p className="text-sm text-primary-mywall-200 mt-2">
                        Your plan will be active until the end of the current billing period. This action cannot be undone.
                    </p>
                </div>
                <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50 bg-white/5">
                    <button
                        onClick={() => closeModal('cancel')}
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                    >
                        Nevermind
                    </button>
                    <button
                        onClick={handleCancelSubscription}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                    >
                        Yes, Cancel
                    </button>
                </div>
            </Modal>

            {/* Top-up Modal */}
            <Modal isOpen={modals.topUp} onClose={() => closeModal('topUp')}>
                <form onSubmit={handleTopUpSubmit}>
                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-rocket-line"></i> Top-up Uploads
                        </h3>
                        <button
                            type="button"
                            onClick={() => closeModal('topUp')}
                            className="text-primary-mywall-200 hover:text-white text-2xl"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className="p-6 flex-grow overflow-auto space-y-4">
                        <p className="text-primary-mywall-200">Select a package to add more external certificate uploads to your account.</p>
                        <div className="space-y-3">
                            <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                                <input
                                    type="radio"
                                    name="topup-option"
                                    value="25"
                                    checked={selectedTopUpOption === '25'}
                                    onChange={(e) => setSelectedTopUpOption(e.target.value)}
                                    className="h-5 w-5 text-accent bg-transparent border-primary-mywall-300 focus:ring-accent"
                                />
                                <span className="ml-4 flex flex-col">
                                    <span className="font-bold text-white">25 Extra Uploads</span>
                                    <span className="text-sm text-primary-mywall-200">RM 5.00</span>
                                </span>
                            </label>
                            <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                                <input
                                    type="radio"
                                    name="topup-option"
                                    value="50"
                                    checked={selectedTopUpOption === '50'}
                                    onChange={(e) => setSelectedTopUpOption(e.target.value)}
                                    className="h-5 w-5 text-accent bg-transparent border-primary-mywall-300 focus:ring-accent"
                                />
                                <span className="ml-4 flex flex-col">
                                    <span className="font-bold text-white">50 Extra Uploads</span>
                                    <span className="text-sm text-primary-mywall-200">RM 10.00</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                        <button
                            type="button"
                            onClick={() => closeModal('topUp')}
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
                        >
                            Check Out
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Payment Checkout Modal */}
            <Modal isOpen={modals.paymentCheckout} onClose={() => closeModal('paymentCheckout')} maxWidth="max-w-lg">
                <form onSubmit={handlePaymentCheckoutSubmit}>
                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-secure-payment-line"></i> Checkout
                        </h3>
                        <button
                            type="button"
                            onClick={() => closeModal('paymentCheckout')}
                            className="text-primary-mywall-200 hover:text-white text-2xl"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className="p-6 flex-grow overflow-auto space-y-6">
                        <div>
                            <h4 className="text-md font-bold text-primary-mywall-200 mb-2">ORDER SUMMARY</h4>
                            <div className="p-4 bg-white/10 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-primary-mywall-200">Item:</span>
                                    <span className="font-semibold text-white">{lastOrderData.label}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary-mywall-200">Sub Total:</span>
                                    <span className="font-semibold text-white">
                                        RM {(parseFloat(lastOrderData.grandTotal.replace('RM ', '')) / 1.08).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary-mywall-200">SST (8%):</span>
                                    <span className="font-semibold text-white">
                                        RM {(parseFloat(lastOrderData.grandTotal.replace('RM ', '')) * 0.08 / 1.08).toFixed(2)}
                                    </span>
                                </div>
                                <div className="border-t border-primary-mywall-700/50 my-2"></div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold text-white">Grand Total:</span>
                                    <span className="font-bold text-white">{lastOrderData.grandTotal}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-md font-bold text-primary-mywall-200 mb-2">SELECT PAYMENT METHOD</h4>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="card"
                                        checked={selectedPaymentMethod === 'card'}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    <i className="ri-bank-card-line text-2xl text-primary-mywall-200"></i>
                                    <span className="ml-4 font-bold text-white">Credit / Debit Card</span>
                                </label>
                                <label className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="fpx"
                                        checked={selectedPaymentMethod === 'fpx'}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    <i className="ri-bank-line text-2xl text-primary-mywall-200"></i>
                                    <span className="ml-4 font-bold text-white">Online Banking (FPX)</span>
                                </label>
                                <label className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="ewallet"
                                        checked={selectedPaymentMethod === 'ewallet'}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />
                                    <i className="ri-qr-code-line text-2xl text-primary-mywall-200"></i>
                                    <span className="ml-4 font-bold text-white">E-Wallet (TNG, DuitNow QR)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                        <button
                            type="button"
                            onClick={() => {
                                closeModal('paymentCheckout');
                                if (lastOrderData.label.includes('Upgrade')) {
                                    // Do nothing for upgrade
                                } else {
                                    setTimeout(() => openModal('topUp'), 350);
                                }
                            }}
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover flex items-center gap-2"
                        >
                            <span>Proceed to Payment</span>
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </form>
            </Modal>

            {/* FPX Bank Selection Modal */}
            <Modal isOpen={modals.fpx} onClose={() => closeModal('fpx')} maxWidth="max-w-lg">
                <form onSubmit={handleFpxSubmit}>
                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-bank-line"></i> Select Bank (FPX)
                        </h3>
                        <button
                            type="button"
                            onClick={() => closeModal('fpx')}
                            className="text-primary-mywall-200 hover:text-white text-2xl"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className="p-6 flex-grow overflow-auto">
                        <label className="block text-sm font-medium text-primary-mywall-200 mb-2">
                            Please select your bank from the list below:
                        </label>
                        <select
                            value={selectedFpxBank}
                            onChange={(e) => setSelectedFpxBank(e.target.value)}
                            required
                            className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                        >
                            <option value="" disabled>-- Select a Bank --</option>
                            {fpxBanks.map(bank => (
                                <option key={bank.value} value={bank.value} className="text-black">
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="p-4 flex justify-between items-center gap-4 border-t border-primary-mywall-800/50">
                        <button
                            type="button"
                            onClick={() => {
                                closeModal('fpx');
                                setTimeout(() => openModal('paymentCheckout'), 350);
                            }}
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover"
                        >
                            Proceed
                        </button>
                    </div>
                </form>
            </Modal>

            {/* QR Code Modal */}
            <Modal isOpen={modals.qrCode} onClose={() => closeModal('qrCode')} maxWidth="max-w-sm">
                <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <i className="ri-qr-scan-2-line"></i> Scan to Pay
                    </h3>
                    <button
                        onClick={() => closeModal('qrCode')}
                        className="text-primary-mywall-200 hover:text-white text-2xl"
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="p-6 flex-grow overflow-auto flex flex-col items-center justify-center text-center">
                    <p className="text-primary-mywall-200 mb-2">
                        Scan the DuitNow QR code below using your e-wallet or banking app.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/payment"
                            alt="DuitNow QR Code"
                        />
                    </div>
                    <p className="text-2xl font-bold text-white mt-4">
                        Amount: <span>{lastOrderData.grandTotal}</span>
                    </p>
                    <p className="text-xs text-primary-mywall-300 mt-2">
                        (This is a demo QR code for demonstration)
                    </p>
                </div>
                <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50">
                    <button
                        onClick={() => {
                            closeModal('qrCode');
                            showToast('Payment completed successfully! This is a demo.');
                        }}
                        className="px-8 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
                    >
                        Done
                    </button>
                </div>
            </Modal>

            {/* Card Payment Modal */}
            <Modal isOpen={modals.cardPayment} onClose={() => closeModal('cardPayment')}>
                <form onSubmit={handleCardPaymentSubmit}>
                    {/* ... header ... */}
                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="ri-bank-card-line"></i> Card Payment
                        </h3>
                        <button
                            type="button"
                            onClick={() => closeModal('cardPayment')}
                            className="text-primary-mywall-200 hover:text-white text-2xl"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-primary-mywall-200 mb-1">Name on Card</label>
                            <input
                                type="text"
                                name="name"
                                value={cardForm.name}
                                onChange={handleInputChange}
                                className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                                placeholder="e.g. AHMAD NABIL BIN YUSOFF"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-mywall-200 mb-1">Card Number</label>
                            <input
                                type="text"
                                name="number"
                                value={cardForm.number}
                                onChange={handleInputChange}
                                className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                                placeholder="•••• •••• •••• ••••"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-primary-mywall-200 mb-1">Expiry (MM/YY)</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardForm.expiry}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary-mywall-200 mb-1">CVC</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    value={cardForm.cvc}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                                    placeholder="•••"
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-xs text-primary-mywall-300">This is a demo flow. Do not enter real card details.</p>
                    </div>
                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                        <button
                            type="button"
                            onClick={() => closeModal('cardPayment')}
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover flex items-center gap-2"
                        >
                            <span>Pay Now</span>
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </form>
            </Modal>

            <Toast
                message={toast.message}
                isError={toast.isError}
                show={toast.show}
            />
        </div>
    );
};

export default StudentMyAccount;