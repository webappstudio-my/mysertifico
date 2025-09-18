import React, { useEffect, useState } from 'react';

const Toast = ({ message, isError, show }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Toast visible for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show, message, isError]); // Rerun effect if these change

    const bgColor = isError ? 'bg-red-500' : 'bg-accent';
    const iconClass = isError ? 'ri-error-warning-line' : 'ri-checkbox-circle-line';

    // CSS classes for transition
    const baseClasses = "fixed bottom-10 right-10 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-[90] transition-all duration-300";
    const visibilityClasses = isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0";

    if (!show) return null; // Render nothing if not triggered

    return (
        <div className={`${baseClasses} ${bgColor} ${visibilityClasses}`}>
            <i className={iconClass}></i>
            <span>{message}</span>
        </div>
    );
};

export default Toast;