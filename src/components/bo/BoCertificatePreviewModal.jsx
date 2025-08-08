import React from 'react';
import certificateMockup from '../../../src/assets/images/templates/template1.jpg'; // Make sure this image path is correct

const BoCertificatePreviewModal = ({ isOpen, onClose, certificate }) => {
    if (!isOpen || !certificate) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Certificate Preview</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
                    <div className="text-center mb-6">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Certificate Name: <span className="font-bold">{certificate.name}</span></p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Recipient: {certificate.recipient}</p>
                    </div>
                    {/* Placeholder image for the certificate */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <img src={certificateMockup} alt="Certificate Preview" className="w-full h-auto object-contain rounded-lg shadow-lg" />
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Details</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li><strong>Organization:</strong> {certificate.organization}</li>
                            <li><strong>Template:</strong> {certificate.template}</li>
                            <li><strong>Date Issued:</strong> {certificate.dateIssued}</li>
                            <li><strong>Status:</strong> {certificate.status}</li>
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

export default BoCertificatePreviewModal;
