import React, { useState, useEffect } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import { NavLink } from 'react-router-dom';
import Toast from '../../../components/mywall/Toast';


const plans = [
    { id: 'basic', name: 'Basic Parent', price: 'RM30', priceSuffix: '/year', priceValue: 30, level: 0, uploads: 75, description: 'RM15 annual fee (up to 5 members) + RM15 for 75 tokens (20 sen/token).' },
    { id: 'standard', name: 'Standard Parent', price: 'RM50', priceSuffix: '/year', priceValue: 50, level: 1, uploads: 194, description: 'RM15 annual fee (up to 5 members) + RM35 for 194 tokens (18 sen/token).' },
    { id: 'premium', name: 'Premium Parent', price: 'RM100', priceSuffix: '/year', priceValue: 100, level: 2, uploads: 567, description: 'RM15 annual fee (unlimited members) + RM85 for 567 tokens (15 sen/token).' },
    { id: 'parent-pro', name: 'Pro Parent', price: 'RM200', priceSuffix: '/year', priceValue: 200, level: 3, uploads: 1850, description: 'RM15 annual fee (unlimited members) + RM185 for 1,850 tokens (10 sen/token).' }
];
const billingData = [
    { date: 'August 24, 2025', desc: 'Premium Parent Plan - Annual', amount: 'RM100.00' },
    { date: 'June 10, 2025', desc: 'Top-up: 50 Uploads', amount: 'RM10.00' },
    { date: 'July 15, 2024', desc: 'Standard Parent Plan - Annual', amount: 'RM50.00' },
];
const fpxBanks = [ 
    { value: "Maybank", name: "Maybank2u" }, { value: "CIMB Clicks", name: "CIMB Clicks" },
    { value: "Public Bank", name: "Public Bank" }, { value: "RHB Bank", name: "RHB Now" },
    { value: "Hong Leong Bank", name: "Hong Leong Connect" }, { value: "AmBank", name: "AmBank" },
    { value: "Bank Islam", name: "Bank Islam" }, { value: "Bank Rakyat", name: "Bank Rakyat" },
    { value: "Affin Bank", name: "Affin Bank" }, { value: "Bank Muamalat", name: "Bank Muamalat" },
    { value: "OCBC Bank", name: "OCBC Bank" }, { value: "Standard Chartered", name: "Standard Chartered" },
    { value: "UOB Bank", name: "UOB Bank" },
];


const AccountPageStyles = () => (
  <style>{`
    .modal-panel { transition: transform 0.3s ease-out, opacity 0.3s ease-out; }
    .modal.hidden .modal-panel { transform: scale(0.95); opacity: 0; }
    .payment-radio:checked + label { border-color:#F97316; background-color:rgba(249,115,22,0.1); }
    .input-error { border-color: rgba(239,68,68,0.8) !important; box-shadow: 0 0 0 2px rgba(239,68,68,0.25); }
    body.modal-open { overflow: hidden; }
  `}</style>
);


const Modal = ({ isOpen, onClose, children, sizeClass = "max-w-md" }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => document.body.classList.remove('modal-open'), 300);
        }
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div 
                className={`modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full ${sizeClass} max-h-[90vh] flex flex-col transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

// --- Main Page Component ---
const ParentAccount = () => {
    const [currentPlanId, setCurrentPlanId] = useState('premium');
    const [currentUsage, setCurrentUsage] = useState(250);
    const [billingPage, setBillingPage] = useState(1);
    const [activeModal, setActiveModal] = useState(null);
    const [checkoutData, setCheckoutData] = useState(null);
    const [toast, setToast] = useState({ message: '', isError: false, isVisible: false });
    const [cardDetails, setCardDetails] = useState({ name: '', number: '', exp: '', cvc: '' });

    const currentPlan = plans.find(p => p.id === currentPlanId);
    const totalUploads = currentPlan.uploads;
    const usagePercentage = Math.min(100, (currentUsage / totalUploads) * 100);

    const showToast = (message, isError = false) => {
        setToast({ message, isError, isVisible: true });
        setTimeout(() => setToast({ message: '', isError: false, isVisible: false }), 3500);
    };

    const openModal = (modalName, data = null) => {
        if (data) setCheckoutData(data);
        setActiveModal(modalName);
    };
    const closeModal = () => setActiveModal(null);

    const handlePlanChange = (targetPlanId) => {
        const targetPlan = plans.find(p => p.id === targetPlanId);
        if (targetPlan.level < currentPlan.level) {
            openModal('confirmDowngrade', { targetPlan });
        } else {
            const sst = targetPlan.priceValue * 0.08;
            const total = targetPlan.priceValue + sst;
            openModal('checkout', {
                label: `${targetPlan.name} Plan Upgrade`,
                subTotal: targetPlan.priceValue, sst, total,
                onSuccess: () => {
                    setCurrentPlanId(targetPlanId);
                    showToast(`${targetPlan.name} plan is now active!`);
                }
            });
        }
    };
    
    const handleConfirmDowngrade = () => {
        showToast('Your plan will be downgraded at the end of the billing period.');
        closeModal();
    };

    const handleTopUpSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedOption = formData.get('topup-option');
        const price = selectedOption === '25' ? 5.00 : 10.00;
        const label = selectedOption === '25' ? '25 Extra Uploads' : '50 Extra Uploads';
        const sst = price * 0.08;
        const total = price + sst;
        openModal('checkout', {
            label, subTotal: price, sst, total,
            onSuccess: () => {
                setCurrentUsage(prev => prev - parseInt(selectedOption, 10));
                showToast(`Successfully purchased ${label}!`);
            }
        });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const method = formData.get('payment-method');
        
        switch(method) {
            case 'card': openModal('cardPayment', checkoutData); break;
            case 'fpx': openModal('fpx', checkoutData); break;
            case 'ewallet': openModal('qrCode', checkoutData); break;
            default: break;
        }
    };

    const handleFinalPayment = (e) => {
        e.preventDefault();
        setTimeout(() => {
            openModal('paymentResult', { success: true, ...checkoutData });
            if (checkoutData && typeof checkoutData.onSuccess === 'function') {
                checkoutData.onSuccess();
            }
        }, 1500);
    };

    //card payment validation
    const handleCardPaymentSubmit = (e) => {
        e.preventDefault();
        if (!cardDetails.name || !cardDetails.number || !cardDetails.exp || !cardDetails.cvc) {
            showToast("Please fill in all card details.", true);
            return;
        }
        // If validation passes, proceed to the final payment step
        handleFinalPayment(e);
    };

    const rowsPerPage = 4;
    const totalBillingPages = Math.ceil(billingData.length / rowsPerPage);
    const billingItemsOnPage = billingData.slice((billingPage - 1) * rowsPerPage, billingPage * rowsPerPage);

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === "Escape") closeModal(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);


    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <AccountPageStyles />
            <MyWallNavbar />

            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">My Account</h1>
                            <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">Manage your plan, usage, and billing history.</p>
                        </div>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-primary-mywall-300 mb-4">Current Plan</h3>
                                    <div className="flex items-center justify-between"><h2 className="text-3xl font-poppins font-bold text-white">{currentPlan.name}</h2><span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><i className="ri-checkbox-circle-fill"></i>Active</span></div>
                                    <p className="text-3xl font-bold text-white mt-4">{currentPlan.price}<span className="text-lg text-primary-mywall-300">{currentPlan.priceSuffix}</span></p>
                                    <p className="text-sm text-primary-mywall-200 mt-2">{currentPlan.description}</p>
                                    <p className="text-sm text-primary-mywall-300 mt-2">Your plan renews on August 24, 2026.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-primary-mywall-300 mb-4">Usage & Top-ups</h3>
                                    <div className="flex justify-between items-center mb-1"><span className="text-base font-medium text-primary-mywall-200">Total Uploads Used</span><span className="text-sm font-medium text-white">{currentUsage} / {totalUploads}</span></div>
                                    <div className="w-full bg-primary-mywall-800/50 rounded-full h-4"><div className="bg-accent-mywall h-4 rounded-full" style={{ width: `${usagePercentage}%` }}></div></div>
                                    <p className="text-xs text-primary-mywall-300 mt-2">You have {Math.max(0, totalUploads - currentUsage)} uploads remaining.</p>
                                    <div className="mt-4 pt-4 border-t border-primary-mywall-800/50"><p className="text-primary-mywall-200 mb-2">Need more uploads?</p><button onClick={() => openModal('topUp')} className="bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-2 px-5 rounded-full transition-colors">Top-up Now</button></div>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/50 rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-red-300 mb-2">Danger Zone</h3>
                                    <p className="text-red-200/80 text-sm mb-4">If you cancel, your subscription will remain active until the end of the current billing period.</p>
                                    <button onClick={() => openModal('cancel')} className="w-full md:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">Cancel Subscription</button>
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Change Your Plan</h3>
                                    <div className="space-y-4">{plans.map(plan => {const isCurrent = plan.id === currentPlanId;const isDowngrade = plan.level < currentPlan.level;return (<div key={plan.id} className={`plan-card border-2 ${isCurrent ? "border-accent-mywall" : "border-primary-mywall-700/50"} rounded-lg p-5 flex flex-col md:flex-row justify-between items-center relative transition-all`}>{isCurrent && <span className="absolute -top-3 bg-accent-mywall text-white px-3 py-1 text-xs font-bold rounded-full">Current Plan</span>}<div><h4 className="text-xl font-bold text-white">{plan.name}</h4><p className="text-primary-mywall-200 text-sm">{plan.description}</p></div><div className="text-center md:text-right mt-4 md:mt-0"><p className="text-2xl font-bold text-white">{plan.price}<span className="text-base text-primary-mywall-300">{plan.priceSuffix}</span></p>{isCurrent ? (<button disabled className="mt-2 px-6 py-2 bg-primary-mywall text-white font-semibold rounded-lg cursor-not-allowed opacity-50">Current Plan</button>) : (<button onClick={() => handlePlanChange(plan.id)} className={`mt-2 px-6 py-2 text-white font-semibold rounded-lg transition-colors ${isDowngrade ? 'bg-gray-500 hover:bg-gray-600' : 'bg-accent-mywall hover:bg-accent-mywall-hover'}`}>{isDowngrade ? 'Downgrade' : 'Upgrade'}</button>)}</div></div>);})}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6">Billing History</h3>
                                    <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="text-xs text-primary-mywall-200 uppercase border-b border-primary-mywall-700/50"><tr><th scope="col" className="px-4 py-3">Date</th><th scope="col" className="px-4 py-3">Description</th><th scope="col" className="px-4 py-3">Amount</th><th scope="col" className="px-4 py-3">Invoice</th></tr></thead><tbody>{billingItemsOnPage.map((item, index) => (<tr key={index} className="border-b border-primary-mywall-800/50 hover:bg-white/5"><td className="px-4 py-3 font-medium text-white whitespace-nowrap">{item.date}</td><td className="px-4 py-3">{item.desc}</td><td className="px-4 py-3">{item.amount}</td><td className="px-4 py-3"><NavLink to="/mywall/parent-invoice" className="text-accent-mywall hover:text-accent-mywall-hover font-medium flex items-center gap-1">Invoice <i className="ri-download-2-line"></i></NavLink></td></tr>))}</tbody></table></div>
                                    <nav className="flex justify-between items-center pt-4" aria-label="Table navigation"><span className="text-sm font-normal text-primary-mywall-300">Showing <span className="font-semibold text-white">{(billingPage - 1) * rowsPerPage + 1}-{Math.min(billingPage * rowsPerPage, billingData.length)}</span> of <span className="font-semibold text-white">{billingData.length}</span></span><div className="inline-flex items-center -space-x-px"><button onClick={() => setBillingPage(p => p - 1)} disabled={billingPage === 1} className="px-3 h-8 ms-0 leading-tight text-primary-mywall-300 bg-white/10 border border-primary-mywall-700 rounded-s-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Prev</button><button onClick={() => setBillingPage(p => p + 1)} disabled={billingPage === totalBillingPages} className="px-3 h-8 leading-tight text-primary-mywall-300 bg-white/10 border border-primary-mywall-700 rounded-e-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next</button></div></nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Toast 
                message={toast.message}
                isError={toast.isError}
                show={toast.isVisible}
            />

            {/* --- Modals Section --- */}
            <Modal isOpen={!!activeModal} onClose={closeModal} sizeClass={
                activeModal === 'checkout' || activeModal === 'fpx' ? 'max-w-lg' :
                activeModal === 'qrCode' ? 'max-w-sm' : 'max-w-md'
            }>
                {(() => {
                    switch (activeModal) {
                        case 'topUp':
                            return (
                                <form onSubmit={handleTopUpSubmit}>
                                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50"><h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-rocket-line"></i> Top-up Uploads</h3><button type="button" onClick={closeModal} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button></div>
                                    <div className="p-6 flex-grow overflow-auto space-y-4"><p className="text-primary-mywall-200">Select a package to add more uploads.</p><div className="space-y-3"><label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent-mywall cursor-pointer"><input type="radio" name="topup-option" value="25" defaultChecked className="h-5 w-5 text-accent-mywall bg-transparent border-primary-mywall-300 focus:ring-accent-mywall"/><span className="ml-4 flex flex-col"><span className="font-bold text-white">25 Extra Uploads</span><span className="text-sm text-primary-mywall-200">RM 5.00</span></span></label><label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent-mywall cursor-pointer"><input type="radio" name="topup-option" value="50" className="h-5 w-5 text-accent-mywall bg-transparent border-primary-mywall-300 focus:ring-accent-mywall"/><span className="ml-4 flex flex-col"><span className="font-bold text-white">50 Extra Uploads</span><span className="text-sm text-primary-mywall-200">RM 10.00</span></span></label></div></div>
                                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50"><button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Cancel</button><button type="submit" className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover">Check Out</button></div>
                                </form>
                            );
                        case 'checkout':
                            return (
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50"><h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-secure-payment-line"></i> Checkout</h3><button type="button" onClick={closeModal} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button></div>
                                    <div className="p-6 flex-grow overflow-auto space-y-6">
                                        <div><h4 className="text-md font-bold text-primary-mywall-200 mb-2">ORDER SUMMARY</h4><div className="p-4 bg-white/10 rounded-lg space-y-2 text-sm"><div className="flex justify-between items-center"><span className="text-primary-mywall-200">Item:</span><span className="font-semibold text-white">{checkoutData?.label}</span></div><div className="flex justify-between items-center"><span className="text-primary-mywall-200">Sub Total:</span><span className="font-semibold text-white">RM {checkoutData?.subTotal?.toFixed(2)}</span></div><div className="flex justify-between items-center"><span className="text-primary-mywall-200">SST (8%):</span><span className="font-semibold text-white">RM {checkoutData?.sst?.toFixed(2)}</span></div><div className="border-t border-primary-mywall-700/50 my-2"></div><div className="flex justify-between items-center text-lg"><span className="font-bold text-white">Grand Total:</span><span className="font-bold text-white">RM {checkoutData?.total?.toFixed(2)}</span></div></div></div>
                                        <div><h4 className="text-md font-bold text-primary-mywall-200 mb-2">SELECT PAYMENT METHOD</h4><div className="space-y-3"><input type="radio" name="payment-method" id="pay-card" value="card" className="payment-radio hidden" /><label htmlFor="pay-card" className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent cursor-pointer"><i className="ri-bank-card-line text-2xl text-primary-mywall-200"></i><span className="ml-4 font-bold text-white">Credit / Debit Card</span></label><input type="radio" name="payment-method" id="pay-fpx" value="fpx" className="payment-radio hidden" defaultChecked /><label htmlFor="pay-fpx" className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent cursor-pointer"><i className="ri-bank-line text-2xl text-primary-mywall-200"></i><span className="ml-4 font-bold text-white">Online Banking (FPX)</span></label><input type="radio" name="payment-method" id="pay-ewallet" value="ewallet" className="payment-radio hidden" /><label htmlFor="pay-ewallet" className="flex items-center p-4 bg-white/5 rounded-lg border-2 border-transparent cursor-pointer"><i className="ri-qr-code-line text-2xl text-primary-mywall-200"></i><span className="ml-4 font-bold text-white">E-Wallet (TNG, DuitNow QR)</span></label></div></div>
                                    </div>
                                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50"><button type="button" onClick={() => openModal('topUp')} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Back</button><button type="submit" className="px-8 py-2 bg-accent-mywall text-white font-bold rounded-lg hover:bg-accent-mywall-hover flex items-center gap-2"><span>Proceed to Payment</span><i className="ri-arrow-right-line"></i></button></div>
                                </form>
                            );
                        case 'confirmDowngrade':
                            return (
                                <><div className="p-6 text-center"><div className="text-5xl text-primary-mywall-400 mb-4"><i className="ri-question-line"></i></div><h3 className="text-lg font-bold text-white">Confirm Plan Change</h3><p className="text-sm text-primary-mywall-200 mt-2">{`Are you sure you want to downgrade to the ${checkoutData?.targetPlan?.name} plan?`}</p></div><div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50 bg-white/5"><button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Cancel</button><button type="button" onClick={handleConfirmDowngrade} className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover">Yes, Confirm</button></div></>
                            );
                        case 'cancel':
                            return (
                                <><div className="p-6 text-center"><div className="text-5xl text-red-400 mb-4"><i className="ri-error-warning-line"></i></div><h3 className="text-lg font-bold text-white">Are you sure you want to cancel?</h3><p className="text-sm text-primary-mywall-200 mt-2">Your plan will be active until the end of the current billing period.</p></div><div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50 bg-white/5"><button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Nevermind</button><button type="button" onClick={() => { showToast('Subscription cancelled successfully.'); closeModal(); }} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Yes, Cancel</button></div></>
                            );
                        case 'fpx':
                            return(
                                <form onSubmit={handleFinalPayment}>
                                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50"><h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-bank-line"></i> Select Bank (FPX)</h3><button type="button" onClick={closeModal} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button></div>
                                    <div className="p-6 flex-grow overflow-auto"><label htmlFor="fpx-bank-select" className="block text-sm font-medium text-primary-mywall-200 mb-2">Please select your bank from the list below:</label><select id="fpx-bank-select" required className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent-mywall focus:border-accent-mywall" defaultValue=""><option value="" disabled>-- Select a Bank --</option>{fpxBanks.map(bank => <option key={bank.value} value={bank.value} className="text-black">{bank.name}</option>)}</select></div>
                                    <div className="p-4 flex justify-between items-center gap-4 border-t border-primary-mywall-800/50"><button type="button" onClick={() => openModal('checkout', checkoutData)} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Back</button><button type="submit" className="px-8 py-2 bg-accent-mywall text-white font-bold rounded-lg hover:bg-accent-mywall-hover">Proceed</button></div>
                                </form>
                            );
                        case 'qrCode':
                            return (
                                <><div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50"><h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-qr-scan-2-line"></i> Scan to Pay</h3><button type="button" onClick={closeModal} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button></div><div className="p-6 flex-grow overflow-auto flex flex-col items-center justify-center text-center"><p className="text-primary-mywall-200 mb-2">Scan the DuitNow QR code below.</p><div className="bg-white p-4 rounded-lg"><img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/payment" alt="DuitNow QR Code"/></div><p className="text-2xl font-bold text-white mt-4">Amount: <span>RM {checkoutData?.total?.toFixed(2)}</span></p><p className="text-xs text-primary-mywall-300 mt-2">(This is a demo QR code)</p></div><div className="p-4 flex justify-center items-center gap-3 border-t border-primary-mywall-800/50"><button type="button" onClick={() => handleFinalPayment({ preventDefault: () => {} })} className="px-8 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover">Done</button></div></>
                            );
                        case 'cardPayment':
                            return (
                                <form onSubmit={handleCardPaymentSubmit} noValidate>
                                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50"><h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-bank-card-line"></i> Card Payment</h3><button type="button" onClick={closeModal} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button></div>
                                    <div className="p-6 space-y-4">
                                        <div><label htmlFor="cp-name" className="block text-sm font-medium text-primary-mywall-200 mb-1">Name on Card</label><input type="text" id="cp-name" className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent-mywall focus:border-accent-mywall" placeholder="e.g. AHMAD NABIL BIN YUSOFF" autoComplete="cc-name" value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}/></div>
                                        <div className="relative"><label htmlFor="cp-number" className="block text-sm font-medium text-primary-mywall-200 mb-1">Card Number</label><input type="text" id="cp-number" inputMode="numeric" autoComplete="cc-number" className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg pl-3 pr-12 py-2 text-white focus:ring-accent-mywall focus:border-accent-mywall" placeholder="•••• •••• •••• ••••" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}/><div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-none text-2xl"></div></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label htmlFor="cp-exp" className="block text-sm font-medium text-primary-mywall-200 mb-1">Expiry (MM/YY)</label><input type="text" id="cp-exp" inputMode="numeric" autoComplete="cc-exp" className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent-mywall focus:border-accent-mywall" placeholder="MM/YY" value={cardDetails.exp} onChange={(e) => setCardDetails({...cardDetails, exp: e.target.value})}/></div>
                                            <div><label htmlFor="cp-cvc" className="block text-sm font-medium text-primary-mywall-200 mb-1">CVC</label><input type="text" id="cp-cvc" inputMode="numeric" autoComplete="cc-csc" className="w-full bg-white/10 border border-primary-mywall-700 rounded-lg px-3 py-2 text-white focus:ring-accent-mywall focus:border-accent-mywall" placeholder="•••" value={cardDetails.cvc} onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}/></div>
                                        </div>
                                        <p className="text-xs text-primary-mywall-300">This is a demo flow. Do not enter real card details.</p>
                                    </div>
                                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50"><button type="button" onClick={() => openModal('checkout', checkoutData)} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Back</button><button type="submit" className="px-8 py-2 bg-accent-mywall text-white font-bold rounded-lg hover:bg-accent-mywall-hover flex items-center gap-2"><span>Pay Now</span><i className="ri-arrow-right-line"></i></button></div>
                                </form>
                            );
                        case 'paymentResult':
                            return (
                                <><div className="p-6 text-center"><div className="text-5xl mb-4"><i className="ri-checkbox-circle-line text-green-400"></i></div><h3 className="text-xl font-bold text-white">Payment Successful</h3><p className="text-sm text-primary-mywall-200 mt-2">Your transaction for {checkoutData?.label} was completed.</p></div><div className="p-4 flex justify-center items-center gap-3 border-t border-primary-mywall-800/50 bg-white/5"><button type="button" onClick={closeModal} className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover">Done</button></div></>
                            );
                        default:
                            return null;
                    }
                })()}
            </Modal>
        </div>
    );
};

export default ParentAccount;