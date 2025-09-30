import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [show, message, type, onClose]);

    let bgColor = 'bg-gray-700';
    let iconClass = 'ri-information-line';

    switch (type) {
        case 'success':
            bgColor = 'bg-accent-mywall';
            iconClass = 'ri-checkbox-circle-line';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            iconClass = 'ri-error-warning-line';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            iconClass = 'ri-information-line';
            break;
        default:
            break;
    }

    const baseClasses = "fixed bottom-10 right-10 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-[90] transition-all duration-300 text-white";
    const visibilityClasses = isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0";

    if (!show && !isVisible) return null;

    return (
        <div className={`${baseClasses} ${bgColor} ${visibilityClasses}`}>
            <i className={iconClass}></i>
            <span>{message}</span>
        </div>
    );
};

export default Toast;