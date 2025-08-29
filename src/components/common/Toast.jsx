import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-dismiss after 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const baseClasses = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white flex items-center';
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    const iconClasses = {
        success: 'ri-check-line',
        error: 'ri-error-warning-line',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-800'}`}>
            <i className={`${iconClasses[type] || 'ri-information-line'} mr-3`}></i>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-xl font-semibold">&times;</button>
        </div>
    );
};

export default Toast;