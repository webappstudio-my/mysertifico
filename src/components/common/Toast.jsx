import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade-out transition
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const baseClasses = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white flex items-center z-50 transition-opacity duration-300';
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    const iconClasses = {
        success: 'ri-check-line',
        error: 'ri-error-warning-line',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-800'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white bg-opacity-25 rounded-full">
                <i className={`${iconClasses[type] || 'ri-information-line'}`}></i>
            </div>
            <span>{message}</span>
            {/* <button onClick={onClose} className="ml-4 text-xl font-semibold">&times;</button> */}
        </div>
    );
};

export default Toast;