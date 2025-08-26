// src/components/bo/BoConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, title, message, iconClass, confirmButtonText, confirmButtonClass, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-[130] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all opacity-100 scale-100">
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
                        <i className={`${iconClass} text-4xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
                    <button className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors w-full" onClick={onClose}>
                        Cancel
                    </button>
                    <button className={`${confirmButtonClass} font-semibold py-2 px-4 rounded-lg w-full`} onClick={onConfirm}>
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
