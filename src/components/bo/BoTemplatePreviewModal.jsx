//src/components/bo/BoTemplatePreviewModal.jsx
import React from 'react';
// import templateMockup from '../../../src/assets/images/templates/template1.jpg';

const BoTemplatePreviewModal = ({ isOpen, onClose, template }) => {
    if (!isOpen || !template) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Template Preview</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
                    <div className="text-center mb-6">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Template Name: <span className="font-bold">{template.name}</span></p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Code: {template.code}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg max-w-2xl w-full">
                            <div className="text-center space-y-4">
                                <div className="text-2xl font-bold text-gray-800 dark:text-white">CERTIFICATE OF ACHIEVEMENT</div>
                                <div className="text-lg text-gray-600 dark:text-gray-300">This certifies that</div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{template.recipient || 'Recipient Name'}</div>
                                <div className="text-lg text-gray-600 dark:text-gray-300">has successfully completed</div>
                                <div className="text-xl font-semibold text-gray-800 dark:text-white">{template.name}</div>
                                <div className="mt-8 text-gray-500 dark:text-gray-400">Date: {template.dateIssued}</div>
                                <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">Template: {template.code}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Details</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li><strong>Organization:</strong> {template.organization}</li>
                            <li><strong>Template:</strong> {template.template}</li>
                            <li><strong>Date Issued:</strong> {template.dateIssued}</li>
                            <li><strong>Status:</strong> {template.status}</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoTemplatePreviewModal;
