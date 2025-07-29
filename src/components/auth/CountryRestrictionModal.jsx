// src/components/auth/CountryRestrictionModal.jsx
import React from 'react';

const CountryRestrictionModal = ({ isOpen, onClose, modalType }) => {
    if (!isOpen) return null;

    const modalContent = {
        indonesia: {
            title: 'Coming Soon!',
            message: 'Our service for Indonesia will be available shortly. Please check back later.',
            iconClass: 'ri-time-line',
            iconBg: 'bg-blue-100',
            iconText: 'text-blue-600',
        },
        others: {
            title: 'Service Not Available',
            message: 'Currently, our service is not available in the selected country. We are expanding our reach continuously.',
            iconClass: 'ri-error-warning-line',
            iconBg: 'bg-red-100',
            iconText: 'text-red-600',
        },
    };

    const content = modalContent[modalType] || {
        title: 'Information',
        message: 'Unknown restriction.',
        iconClass: 'ri-information-line',
        iconBg: 'bg-gray-100',
        iconText: 'text-gray-600',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-lg transform scale-100 opacity-100 transition-all duration-300">
                <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${content.iconBg}`}>
                        <i className={`${content.iconClass} text-4xl ${content.iconText}`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{content.title}</h3>
                    <p className="text-gray-600 mt-2">{content.message}</p>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CountryRestrictionModal;