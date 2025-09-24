import React, { useState, useEffect } from 'react';
import StudentNavbar from '../../../components/mywall/StudentNavbar';
import Toast from '../../../components/mywall/Toast';

const DebugTestStudentMyAccount = () => {
  const [topUpOption, setTopUpOption] = useState('25');
  const [paymentMethod, setPaymentMethod] = useState('fpx');
  const [fpxBank, setFpxBank] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

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

  const openModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: true }));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: false }));
    const hasOpenModal = Object.values(modalStates).some((state) => state);
    if (!hasOpenModal) {
      document.body.style.overflow = '';
    }
  };

  // ✅ Fix: define the handler
  const handleCardPayment = (e) => {
    e.preventDefault();

    if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
      alert("Please fill in all card details.");
      return;
    }

    // Simulate payment
    console.log("Processing payment with card:", cardDetails);

    // Example: Show a success modal or toast
    setModalStates((prev) => ({ ...prev, paymentResult: true }));
    closeModal('cardPayment');
  };

  return (
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
            onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
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
            onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
            inputMode="numeric"
            autoComplete="cc-number"
            className="w-full bg-white/10 border border-primary-700 rounded-lg pl-3 pr-12 py-2 text-white focus:ring-accent focus:border-accent"
            placeholder="•••• •••• •••• ••••"
          />
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
              onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
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
              onChange={(e) => setCardDetails((prev) => ({ ...prev, cvc: e.target.value }))}
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
  );
};

export default DebugTestStudentMyAccount;