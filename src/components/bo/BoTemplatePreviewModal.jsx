//src/components/bo/BoTemplatePreviewModal.jsx
import React from 'react';
// import templateMockup from '../../../src/assets/images/templates/template1.jpg';

const BoTemplatePreviewModal = ({ isOpen, onClose, template }) => {
    if (!isOpen || !template) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold font-sans text-gray-900 dark:text-white">Preview: {template.code}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
                    <div className="flex items-center justify-center">
                        <img 
                            src={`/src/images/templates/${template.code.toLowerCase()}.svg`}
                            alt={`${template.code} template preview`}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                                e.target.src = '/src/assets/images/templates/ms-grad-ml-black-gold-001.svg';
                            }}
                        />
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
