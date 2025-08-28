import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';
import Pagination from '../../../components/common/Pagination';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-14 right-6 bg-green-600/50 border border-green-500/30 text-green-900 dark:text-green-200 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-3 shadow-md z-[150]">
            {message}
        </div>
    );
};

const AdminViewRecipient = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewCertModalOpen, setIsViewCertModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [currentCertificate, setCurrentCertificate] = useState(null);
    
    // Recipient data state
    const [recipientData, setRecipientData] = useState({
        name: 'Ahmad bin Abdullah',
        idNo: '080101-03-5287',
        class: '5 Amanah',
        status: 'Active'
    });

    // Form state for editing
    const [formData, setFormData] = useState({
        fullName: '',
        idNo: '',
        class: '',
        status: ''
    });

    const [formErrors, setFormErrors] = useState({});

    // Certificate data
    const certificates = [
        {
            id: 'CERT-00156',
            templateName: 'Webinar Participation',
            dateIssued: '15 June 2025'
        },
        {
            id: 'CERT-00142',
            templateName: 'Appreciation Award',
            dateIssued: '28 May 2025'
        },
        {
            id: 'CERT-00125',
            templateName: 'Course Completion',
            dateIssued: '20 March 2025'
        }
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 15;

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    const handleEditClick = () => {
        setFormData({
            fullName: recipientData.name,
            idNo: recipientData.idNo,
            class: recipientData.class,
            status: recipientData.status
        });
        setFormErrors({});
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
        if (!formData.idNo.trim()) errors.idNo = 'National ID is required.';
        if (!formData.class.trim()) errors.class = 'Please select a class.';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setRecipientData({
                name: formData.fullName,
                idNo: formData.idNo,
                class: formData.class,
                status: formData.status
            });
            
            setIsEditModalOpen(false);
            setToastMessage('Recipient details updated successfully!');
            setTimeout(() => setToastMessage(''), 3000);
        }
    };

    const handleViewCertificate = (certId) => {
        const cert = certificates.find(c => c.id === certId);
        setCurrentCertificate(cert);
        setIsViewCertModalOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getStatusBadge = (status) => {
        const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full";
        if (status === 'Active') {
            return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
        } else {
            return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
        }
    };

    const isFormValid = formData.fullName.trim() && formData.idNo.trim() && formData.class.trim();

    return (
        <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
            <Toast message={toastMessage} show={!!toastMessage} />
            <Sidebar 
                isOpen={isSidebarOpen}
                onClose={handleSidebarClose}
            />
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleSidebarClose}
                ></div>
            )}

            <div
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar 
                    onSidebarToggle={handleSidebarToggle}
                    theme={theme}
                    onThemeToggle={onThemeToggle}
                />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">View Recipient</h1>
                            <Link 
                                to="/dashboard/settings/recipients" 
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex items-center gap-2 text-sm font-medium"
                                title="Back to Recipient List"
                            >
                                <i className="ri-arrow-left-line"></i>
                                <span>Back</span>
                            </Link>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{recipientData.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400">{recipientData.idNo}</p>
                                </div>
                                <button 
                                    onClick={handleEditClick}
                                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 flex items-center transition-colors" 
                                    title="Edit Recipient"
                                >
                                    <i className="ri-pencil-line mr-2"></i>Edit
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <dt className="font-medium text-gray-500 dark:text-gray-400">Class</dt>
                                    <dd className="mt-1 text-gray-900 dark:text-white">{recipientData.class}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                    <dd className="mt-1">
                                        <span className={getStatusBadge(recipientData.status)}>
                                            {recipientData.status}
                                        </span>
                                    </dd>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Issued Certificates</h3>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Certificate ID</th>
                                                <th scope="col" className="px-6 py-3">Template Name</th>
                                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Date Issued</th>
                                                <th scope="col" className="px-6 py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {certificates.map((cert, index) => (
                                                <tr key={cert.id} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 ${index !== certificates.length - 1 ? 'border-b dark:border-gray-700' : ''}`}>
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cert.id}</td>
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{cert.templateName}</td>
                                                    <td className="px-6 py-4 hidden md:table-cell">{cert.dateIssued}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button 
                                                            onClick={() => handleViewCertificate(cert.id)}
                                                            className="font-medium text-primary hover:text-primary-dark"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 md:space-y-0">
                                    <span className="text-sm text-gray-700 dark:text-gray-400">
                                        Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">3</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> Certificates
                                    </span>
                                    <Pagination 
                                        currentPage={currentPage}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Recipient Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl p-6 rounded-xl shadow-lg transform transition-all duration-300">
                        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Recipient</h3>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="mt-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                        required 
                                    />
                                    {formErrors.fullName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="idNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">National ID</label>
                                        <input 
                                            type="text" 
                                            id="idNo" 
                                            name="idNo"
                                            value={formData.idNo}
                                            onChange={handleInputChange}
                                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${formErrors.idNo ? 'border-red-500' : 'border-gray-300'}`}
                                            required 
                                        />
                                        {formErrors.idNo && (
                                            <p className="text-red-500 text-xs mt-1">{formErrors.idNo}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class</label>
                                        <select 
                                            id="class" 
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${formErrors.class ? 'border-red-500' : 'border-gray-300'}`}
                                            required
                                        >
                                            <option value="">Choose a class</option>
                                            <option value="5 Amanah">5 Amanah</option>
                                            <option value="5 Bestari">5 Bestari</option>
                                            <option value="4 Dedikasi">4 Dedikasi</option>
                                        </select>
                                        {formErrors.class && (
                                            <p className="text-red-500 text-xs mt-1">{formErrors.class}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                    <select 
                                        id="status" 
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 md:w-1/2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={!isFormValid}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* View Certificate Modal */}
            {isViewCertModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="relative bg-white dark:bg-gray-800 w-full max-w-4xl p-4 rounded-xl shadow-lg transform transition-all duration-300">
                        <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700 mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Certificate Preview: {currentCertificate?.id}
                            </h3>
                            <button 
                                onClick={() => setIsViewCertModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-900">
                            <img 
                                src={`https://placehold.co/1123x794/ffffff/134e4a?text=${currentCertificate?.id}`}
                                alt="Certificate Preview" 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminViewRecipient;