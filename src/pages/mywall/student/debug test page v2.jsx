import React, { useState, useEffect } from 'react';
import StudentNavbar from '../../../components/mywall/StudentNavbar';
import Toast from '../../../components/mywall/Toast';

const MyAccount = () => {
  // Toast state
  const [toastState, setToastState] = useState({
    show: false,
    message: '',
    isError: false
  });

  // Modal states
  const [modalStates, setModalStates] = useState({
    confirmation: false,
    cancel: false,
    topUp: false,
    paymentCheckout: false,
    fpx: false,
    qrCode: false,
    cardPayment: false,
    paymentResult: false
  });

  // Global checkout state
  const [lastOrderLabel, setLastOrderLabel] = useState('');
  const [lastGrandTotal, setLastGrandTotal] = useState('RM 0.00');
  const [lastSelectedBank, setLastSelectedBank] = useState('');

  // Plan and usage state
  const [currentPlanId, setCurrentPlanId] = useState('trial');
  const [targetPlanId, setTargetPlanId] = useState(null);
  const [currentUsage] = useState(1);

  // Billing history pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Form states
  const [topUpOption, setTopUpOption] = useState('25');
  const [paymentMethod, setPaymentMethod] = useState('fpx');
  const [fpxBank, setFpxBank] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

  // Data
  const plans = [
    { id: 'trial', name: 'Trial', price: 'Free', priceSuffix: '', priceValue: 0, level: 0, uploads: 3, description: '14-day trial with 3 free uploads.' },
    { id: 'standard', name: 'Standard', price: 'RM10', priceSuffix: '/year', priceValue: 10, level: 1, uploads: 25, description: 'RM5 fee + RM5 for 25 tokens.' },
    { id: 'premium', name: 'Premium', price: 'RM20', priceSuffix: '/year', priceValue: 20, level: 2, uploads: 100, description: 'RM5 fee + RM15 for 100 tokens.' },
    { id: 'parent', name: 'Parent', price: 'RM30', priceSuffix: '/year', priceValue: 30, level: 3, uploads: 150, description: 'RM15 fee + RM15 for 150 tokens.' }
  ];

  const fpxBanks = [
    { value: 'Maybank', name: 'Maybank2u' },
    { value: 'CIMB Clicks', name: 'CIMB Clicks' },
    { value: 'Public Bank', name: 'Public Bank' },
    { value: 'RHB Bank', name: 'RHB Now' },
    { value: 'Hong Leong Bank', name: 'Hong Leong Connect' },
    { value: 'AmBank', name: 'AmBank' },
    { value: 'Bank Islam', name: 'Bank Islam' },
    { value: 'Bank Rakyat', name: 'Bank Rakyat' },
    { value: 'Affin Bank', name: 'Affin Bank' },
    { value: 'Bank Muamalat', name: 'Bank Muamalat' },
    { value: 'OCBC Bank', name: 'OCBC Bank' },
    { value: 'Standard Chartered', name: 'Standard Chartered' },
    { value: 'UOB Bank', name: 'UOB Bank' }
  ];

  const billingData = [
    { date: 'July 15, 2025', desc: 'Standard Plan - Annual', amount: 'RM10.00' },
    { date: 'June 10, 2025', desc: 'Top-up: 25 Uploads', amount: 'RM5.00' },
    { date: 'May 5, 2025', desc: 'Top-up: 50 Uploads', amount: 'RM10.00' },
    { date: 'July 15, 2024', desc: 'Standard Plan - Annual', amount: 'RM10.00' },
    { date: 'March 2, 2024', desc: 'Top-up: 25 Uploads', amount: 'RM5.00' },
    { date: 'July 15, 2023', desc: 'Trial to Standard Upgrade', amount: 'RM10.00' }
  ];

  // Helper functions
  const showToast = (message, isError = false) => {
    setToastState({ show: true, message, isError });
    setTimeout(() => {
      setToastState({ show: false, message: '', isError: false });
    }, 100);
  };

  const openModal = (modalName) => {
    setModalStates(prev => ({ ...prev, [modalName]: true }));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalName) => {
    setModalStates(prev => ({ ...prev, [modalName]: false }));
    const hasOpenModal = Object.values(modalStates).some(state => state);
    if (!hasOpenModal) {
      document.body.style.overflow = '';
    }
  };

  const closeAllModals = () => {
    setModalStates({
      confirmation: false,
      cancel: false,
      topUp: false,
      paymentCheckout: false,
      fpx: false,
      qrCode: false,
      cardPayment: false,
      paymentResult: false
    });
    document.body.style.overflow = '';
  };

  // Handlers
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

      setLastOrderLabel(label);
      setLastGrandTotal(`RM ${grandTotal.toFixed(2)}`);
      openModal('paymentCheckout');
    } else {
      openModal('confirmation');
    }
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const selectedOption = topUpOption === '25' 
      ? { price: 5.00, label: '25 Extra Uploads' }
      : { price: 10.00, label: '50 Extra Uploads' };
    
    const sstRate = 0.08;
    const subTotal = selectedOption.price;
    const sstAmount = subTotal * sstRate;
    const grandTotal = subTotal + sstAmount;

    setLastOrderLabel(selectedOption.label);
    setLastGrandTotal(`RM ${grandTotal.toFixed(2)}`);
    closeModal('topUp');
    setTimeout(() => openModal('paymentCheckout'), 350);
  };

  const handlePaymentCheckout = (e) => {
    e.preventDefault();
    closeModal('paymentCheckout');
    setTimeout(() => {
      if (paymentMethod === 'ewallet') {
        openModal('qrCode');
      } else if (paymentMethod === 'card') {
        openModal('cardPayment');
      } else if (paymentMethod === 'fpx') {
        openModal('fpx');
      }
    }, 350);
  };

  const handleFpxBankSubmit = (e) => {
    e.preventDefault();
    if (!fpxBank) {
      return;
    }
    setLastSelectedBank(fpxBanks.find(b => b.value === fpxBank)?.name || '');
    closeModal('fpx');
    // In real app, would proceed to FPX login
    setTimeout(() => {
      showToast('Payment processing (Demo)');
      openModal('paymentResult');
    }, 350);
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    closeModal('cardPayment');
    setTimeout(() => {
      showToast('Payment successful (Demo)');
      openModal('paymentResult');
    }, 350);
  };

  const handleConfirmChange = () => {
    showToast('Your plan will be changed at the end of the billing period. (Demo)');
    closeModal('confirmation');
  };

  const handleCancelSubscription = () => {
    showToast('Subscription cancelled successfully. (Demo)');
    closeModal('cancel');
  };

  // Get current plan
  const currentPlan = plans.find(p => p.id === currentPlanId);

  // Pagination calculations
  const pageCount = Math.ceil(billingData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentBillingItems = billingData.slice(startIndex, endIndex);

  // Date calculations for plan summary
  const today = new Date('2025-08-23T11:05:00');
  let startDate, expiryDate;
  const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  if (currentPlan.id === 'trial') {
    startDate = today;
    expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 14);
  } else {
    const lastRenewal = billingData.find(item => item.desc.toLowerCase().includes('plan'));
    startDate = lastRenewal ? new Date(lastRenewal.date) : new Date(today.setFullYear(today.getFullYear() - 1));
    expiryDate = new Date(startDate);
    expiryDate.setFullYear(startDate.getFullYear() + 1);
  }

  const usagePercentage = Math.min(100, (currentUsage / currentPlan.uploads) * 100);

  // Modal Component
  const Modal = ({ isOpen, children, sizeClass = "max-w-md" }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeAllModals}></div>
        <div className={`modal-panel relative bg-white/10 border border-primary-500/50 rounded-2xl shadow-2xl w-full ${sizeClass} max-h-[90vh] flex flex-col transition-all duration-300 ${isOpen ? '' : 'scale-95 opacity-0'}`}>
          {children}
        </div>
      </div>
    );
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary-900 to-primary text-white flex flex-col min-h-screen">
      <StudentNavbar />
      
      <main className="pt-24 pb-12 flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">My Account</h1>
              <p className="text-lg text-primary-200 mt-4 max-w-3xl mx-auto">Manage your plan, usage, and billing history.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-8">
                {/* Current Plan Summary */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-primary-300 mb-4">Current Plan</h3>
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-poppins font-bold text-white">{currentPlan.name}</h2>
                      <span className={`${currentPlan.id === 'trial' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'} text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                        <i className="ri-checkbox-circle-fill"></i>Active
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-white mt-4">
                      {currentPlan.price}<span className="text-lg text-primary-300">{currentPlan.priceSuffix}</span>
                    </p>
                    <p className="text-sm text-primary-200 mt-2">Includes {currentPlan.uploads} external certificate uploads.</p>
                    
                    <div className="mt-4 pt-4 border-t border-primary-800/50 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-primary-300">Start Date:</span>
                        <span className="font-semibold text-white">{formatDate(startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-300">Expiry Date:</span>
                        <span className="font-semibold text-white">{formatDate(expiryDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage & Top-ups */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-primary-300 mb-4">Usage & Top-ups</h3>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium text-primary-200">External Certificate Uploads</span>
                      <span className="text-sm font-medium text-white">{currentUsage} / {currentPlan.uploads}</span>
                    </div>
                    <div className="w-full bg-primary-800/50 rounded-full h-4">
                      <div className="bg-accent h-4 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
                    </div>
                    <p className="text-xs text-primary-300 mt-2">
                      You have {Math.max(0, currentPlan.uploads - currentUsage)} uploads remaining.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary-800/50">
                    <p className="text-primary-200 mb-2">Need more uploads?</p>
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
                {/* Change Your Plan */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Change Your Plan</h3>
                  <div className="space-y-4">
                    {plans.filter(plan => plan.id !== 'trial').map(plan => {
                      const isCurrent = plan.id === currentPlanId;
                      const isUpgrade = plan.level > currentPlan.level;
                      
                      return (
                        <div
                          key={plan.id}
                          className={`plan-card border-2 ${isCurrent ? 'border-accent' : 'border-primary-700/50'} rounded-lg p-5 flex flex-col md:flex-row justify-between items-center relative transition-all`}
                        >
                          {isCurrent && (
                            <span className="absolute -top-3 bg-accent text-white px-3 py-1 text-xs font-bold rounded-full">
                              Current Plan
                            </span>
                          )}
                          <div>
                            <h4 className="text-xl font-bold text-white">{plan.name}</h4>
                            <p className="text-primary-200">{plan.description}</p>
                          </div>
                          <div className="text-center md:text-right mt-4 md:mt-0">
                            <p className="text-2xl font-bold text-white">
                              {plan.price}<span className="text-base text-primary-300">{plan.priceSuffix}</span>
                            </p>
                            {isCurrent ? (
                              <button disabled className="mt-2 px-6 py-2 bg-primary text-white font-semibold rounded-lg cursor-not-allowed opacity-50">
                                Current Plan
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePlanChange(plan.id)}
                                className={`mt-2 px-6 py-2 ${isUpgrade ? 'bg-accent hover:bg-accent-hover' : 'bg-gray-500 hover:bg-gray-600'} text-white font-semibold rounded-lg transition-colors`}
                              >
                                {isUpgrade ? 'Upgrade' : 'Downgrade'}
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
                      <thead className="text-xs text-primary-200 uppercase border-b border-primary-700/50">
                        <tr>
                          <th scope="col" className="px-4 py-3">Date</th>
                          <th scope="col" className="px-4 py-3">Description</th>
                          <th scope="col" className="px-4 py-3">Amount</th>
                          <th scope="col" className="px-4 py-3">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBillingItems.map((item, index) => (
                          <tr key={index} className="border-b border-primary-800/50 hover:bg-white/5">
                            <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{item.date}</td>
                            <td className="px-4 py-3">{item.desc}</td>
                            <td className="px-4 py-3">{item.amount}</td>
                            <td className="px-4 py-3">
                              <a href="student-invoice.html" className="text-accent hover:text-accent-hover font-medium">
                                Invoice <i className="ri-download-2-line"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <nav className="flex justify-between items-center pt-4">
                    <span className="text-sm font-normal text-primary-300">
                      Showing <span className="font-semibold text-white">
                        {startIndex + 1}-{Math.min(endIndex, billingData.length)}
                      </span> of <span className="font-semibold text-white">{billingData.length}</span>
                    </span>
                    <div className="inline-flex items-center -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 h-8 ms-0 leading-tight text-primary-300 bg-white/10 border border-primary-700 rounded-s-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                        disabled={currentPage === pageCount}
                        className="px-3 h-8 leading-tight text-primary-300 bg-white/10 border border-primary-700 rounded-e-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
      <Modal isOpen={modalStates.confirmation}>
        <div className="p-6 text-center">
          <div className="text-5xl text-primary-400 mb-4"><i className="ri-question-line"></i></div>
          <h3 className="text-lg font-bold text-white">Confirm Plan Change</h3>
          <p className="text-sm text-primary-200 mt-2">
            Are you sure you want to downgrade to the {plans.find(p => p.id === targetPlanId)?.name} plan? 
            This change will take effect at the end of your current billing cycle.
          </p>
        </div>
        <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-800/50 bg-white/5">
          <button 
            onClick={() => closeModal('confirmation')}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirmChange}
            className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
          >
            Yes, Confirm
          </button>
        </div>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal isOpen={modalStates.cancel}>
        <div className="p-6 text-center">
          <div className="text-5xl text-red-400 mb-4"><i className="ri-error-warning-line"></i></div>
          <h3 className="text-lg font-bold text-white">Are you sure you want to cancel?</h3>
          <p className="text-sm text-primary-200 mt-2">
            Your plan will be active until the end of the current billing period. This action cannot be undone.
          </p>
        </div>
        <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-800/50 bg-white/5">
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
      <Modal isOpen={modalStates.topUp}>
        <form onSubmit={handleTopUpSubmit}>
          <div className="flex justify-between items-center p-4 border-b border-primary-800/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="ri-rocket-line"></i> Top-up Uploads
            </h3>
            <button 
              type="button"
              onClick={() => closeModal('topUp')}
              className="text-primary-200 hover:text-white text-2xl"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="p-6 flex-grow overflow-auto space-y-4">
            <p className="text-primary-200">Select a package to add more external certificate uploads to your account.</p>
            <div className="space-y-3">
              <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                <input 
                  type="radio" 
                  name="topup-option" 
                  value="25"
                  checked={topUpOption === '25'}
                  onChange={(e) => setTopUpOption(e.target.value)}
                  className="h-5 w-5 text-accent bg-transparent border-primary-300 focus:ring-accent"
                />
                <span className="ml-4 flex flex-col">
                  <span className="font-bold text-white">25 Extra Uploads</span>
                  <span className="text-sm text-primary-200">RM 5.00</span>
                </span>
              </label>
              <label className="flex items-center p-4 bg-white/10 rounded-lg border-2 border-transparent has-[:checked]:border-accent transition-all cursor-pointer">
                <input 
                  type="radio" 
                  name="topup-option" 
                  value="50"
                  checked={topUpOption === '50'}
                  onChange={(e) => setTopUpOption(e.target.value)}
                  className="h-5 w-5 text-accent bg-transparent border-primary-300 focus:ring-accent"
                />
                <span className="ml-4 flex flex-col">
                  <span className="font-bold text-white">50 Extra Uploads</span>
                  <span className="text-sm text-primary-200">RM 10.00</span>
                </span>
              </label>
            </div>
          </div>
          <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-800/50">
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
      <Modal isOpen={modalStates.paymentCheckout} sizeClass="max-w-lg">
        <form onSubmit={handlePaymentCheckout}>
          <div className="flex justify-between items-center p-4 border-b border-primary-800/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="ri-secure-payment-line"></i> Checkout
            </h3>
            <button 
              type="button"
              onClick={() => closeModal('paymentCheckout')}
              className="text-primary-200 hover:text-white text-2xl"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="p-6 flex-grow overflow-auto space-y-6">
            <div>
              <h4 className="text-md font-bold text-primary-200 mb-2">ORDER SUMMARY</h4>
              <div className="p-4 bg-white/10 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-primary-200">Item:</span>
                  <span className="font-semibold text-white">{lastOrderLabel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-200">Sub Total:</span>
                  <span className="font-semibold text-white">
                    {lastGrandTotal.includes('.') ? `RM ${(parseFloat(lastGrandTotal.replace('RM ', '')) / 1.08).toFixed(2)}` : 'RM 0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-200">SST (8%):</span>
                  <span className="font-semibold text-white">
                    {lastGrandTotal.includes('.') ? `RM ${(parseFloat(lastGrandTotal.replace('RM ', '')) - parseFloat(lastGrandTotal.replace('RM ', '')) / 1.08).toFixed(2)}` : 'RM 0.00'}
                  </span>
                </div>
                <div className="border-t border-primary-700/50 my-2"></div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-white">Grand Total:</span>
                  <span className="font-bold text-white">{lastGrandTotal}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-md font-bold text-primary-200 mb-2">SELECT PAYMENT METHOD</h4>
              <div className="space-y-3">
                <input 
                  type="radio" 
                  name="payment-method" 
                  id="pay-card" 
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio hidden"
                />
                <label 
                  htmlFor="pay-card"
                  className={`flex items-center p-4 bg-white/5 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-accent bg-accent/10' : 'border-transparent'} transition-all cursor-pointer`}
                >
                  <i className="ri-bank-card-line text-2xl text-primary-200"></i>
                  <span className="ml-4 font-bold text-white">Credit / Debit Card</span>
                </label>
                
                <input 
                  type="radio" 
                  name="payment-method" 
                  id="pay-fpx" 
                  value="fpx"
                  checked={paymentMethod === 'fpx'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio hidden"
                />
                <label 
                  htmlFor="pay-fpx"
                  className={`flex items-center p-4 bg-white/5 rounded-lg border-2 ${paymentMethod === 'fpx' ? 'border-accent bg-accent/10' : 'border-transparent'} transition-all cursor-pointer`}
                >
                  <i className="ri-bank-line text-2xl text-primary-200"></i>
                  <span className="ml-4 font-bold text-white">Online Banking (FPX)</span>
                </label>
                
                <input 
                  type="radio" 
                  name="payment-method" 
                  id="pay-ewallet" 
                  value="ewallet"
                  checked={paymentMethod === 'ewallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio hidden"
                />
                <label 
                  htmlFor="pay-ewallet"
                  className={`flex items-center p-4 bg-white/5 rounded-lg border-2 ${paymentMethod === 'ewallet' ? 'border-accent bg-accent/10' : 'border-transparent'} transition-all cursor-pointer`}
                >
                  <i className="ri-qr-code-line text-2xl text-primary-200"></i>
                  <span className="ml-4 font-bold text-white">E-Wallet (TNG, DuitNow QR)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-800/50">
            <button 
              type="button"
              onClick={() => {
                closeModal('paymentCheckout');
                if (!lastOrderLabel.includes('Upgrade')) {
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

      {/* FPX Modal */}
      <Modal isOpen={modalStates.fpx} sizeClass="max-w-lg">
        <form onSubmit={handleFpxBankSubmit}>
          <div className="flex justify-between items-center p-4 border-b border-primary-800/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="ri-bank-line"></i> Select Bank (FPX)
            </h3>
            <button 
              type="button"
              onClick={() => closeModal('fpx')}
              className="text-primary-200 hover:text-white text-2xl"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="p-6 flex-grow overflow-auto">
            <label htmlFor="fpx-bank-select" className="block text-sm font-medium text-primary-200 mb-2">
              Please select your bank from the list below:
            </label>
            <select 
              id="fpx-bank-select"
              value={fpxBank}
              onChange={(e) => setFpxBank(e.target.value)}
              required
              className="w-full bg-white/10 border border-primary-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
            >
              <option value="" disabled>-- Select a Bank --</option>
              {fpxBanks.map(bank => (
                <option key={bank.value} value={bank.value}>{bank.name}</option>
              ))}
            </select>
          </div>
          <div className="p-4 flex justify-between items-center gap-4 border-t border-primary-800/50">
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
      <Modal isOpen={modalStates.qrCode} sizeClass="max-w-sm">
        <div className="flex justify-between items-center p-4 border-b border-primary-800/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="ri-qr-scan-2-line"></i> Scan to Pay
          </h3>
          <button 
            onClick={() => closeModal('qrCode')}
            className="text-primary-200 hover:text-white text-2xl"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="p-6 flex-grow overflow-auto flex flex-col items-center justify-center text-center">
          <p className="text-primary-200 mb-2">Scan the DuitNow QR code below using your e-wallet or banking app.</p>
          <div className="bg-white p-4 rounded-lg">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/payment" alt="DuitNow QR Code" />
          </div>
          <p className="text-2xl font-bold text-white mt-4">Amount: {lastGrandTotal}</p>
          <p className="text-xs text-primary-300 mt-2">(This is a demo QR code for demonstration)</p>
        </div>
        <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-800/50">
          <button 
            onClick={() => {
              closeModal('qrCode');
              showToast('Payment completed (Demo)');
            }}
            className="px-8 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
          >
            Done
          </button>
        </div>
      </Modal>

      {/* Card Payment Modal */}
      <Modal isOpen={modalStates.cardPayment}>
        <form onSubmit={handleCardPayment} noValidate>
          <div className="flex justify-between items-center p-4 border-b border-primary-800/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="ri-bank-card-line"></i> Card Payment
            </h3>
            <button 
              type="button"
              onClick={() => closeModal('cardPayment')}
              className="text-primary-200 hover:text-white text-2xl"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="cp-name" className="block text-sm font-medium text-primary-200 mb-1">
                Name on Card
              </label>
              <input 
                type="text" 
                id="cp-name"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/10 border border-primary-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                placeholder="e.g. AHMAD NABIL BIN YUSOFF"
                autoComplete="cc-name"
              />
            </div>
            <div className="relative">
              <label htmlFor="cp-number" className="block text-sm font-medium text-primary-200 mb-1">
                Card Number
              </label>
              <input 
                type="text"
                id="cp-number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                inputMode="numeric"
                autoComplete="cc-number"
                className="w-full bg-white/10 border border-primary-700 rounded-lg pl-3 pr-12 py-2 text-white focus:ring-accent focus:border-accent"
                placeholder="•••• •••• •••• ••••"
              />
              <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-none text-2xl"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cp-exp" className="block text-sm font-medium text-primary-200 mb-1">
                  Expiry (MM/YY)
                </label>
                <input 
                  type="text"
                  id="cp-exp"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  className="w-full bg-white/10 border border-primary-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cp-cvc" className="block text-sm font-medium text-primary-200 mb-1">
                  CVC
                </label>
                <input 
                  type="text"
                  id="cp-cvc"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value }))}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  className="w-full bg-white/10 border border-primary-700 rounded-lg px-3 py-2 text-white focus:ring-accent focus:border-accent"
                  placeholder="•••"
                />
              </div>
            </div>
            <p className="text-xs text-primary-300">This is a demo flow. Do not enter real card details.</p>
          </div>
          <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-800/50">
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

      {/* Payment Result Modal */}
      <Modal isOpen={modalStates.paymentResult}>
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">
            <i className="ri-checkbox-circle-line text-green-400"></i>
          </div>
          <h3 className="text-xl font-bold text-white">Payment Successful</h3>
          <p className="text-sm text-primary-200 mt-2">Your transaction was completed.</p>
          <div className="mt-3 text-xs text-primary-300"></div>
        </div>
        <div className="p-4 flex flex-wrap justify-center items-center gap-3 border-t border-primary-800/50 bg-white/5">
          <button 
            onClick={() => closeModal('paymentResult')}
            className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover"
          >
            Done
          </button>
        </div>
      </Modal>

      <Toast {...toastState} />
    </div>
  );
};

export default MyAccount;