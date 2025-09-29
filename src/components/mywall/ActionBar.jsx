import React from 'react';
import { NavLink } from 'react-router-dom';

const ActionBar = ({ onDownloadPdf, backTo }) => {
    return (
        <div className="bg-white shadow-md w-full py-4 px-6 flex justify-center items-center gap-4 fixed bottom-0 z-50">
            <NavLink to={backTo} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
                <i className="ri-arrow-left-line"></i>
                <span>Back to Account</span>
            </NavLink>
            <button
                onClick={onDownloadPdf}
                className="bg-invoice-accent hover:bg-invoice-accent-hover text-white font-semibold py-2 px-6 rounded-full transition-colors flex items-center gap-2"
            >
                <i className="ri-download-2-line"></i>
                <span>Download PDF</span>
            </button>
        </div>
    );
};

export default ActionBar;