import React, { useState, useRef } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import Toast from '../../../components/common/Toast';

const initialSecondaryLogos = [
    { id: 1, name: 'Club Logo 1', src: '/src/images/logos-badges/best-student.svg' },
    { id: 2, name: 'Event Logo', src: '/src/images/logos-badges/prs.svg' }
];

const LogoManagement = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [primaryLogo, setPrimaryLogo] = useState('/src/images/logos-badges/logo-srsa.svg');
    const [secondaryLogos, setSecondaryLogos] = useState(initialSecondaryLogos);
    const [logoToDelete, setLogoToDelete] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const primaryUploadRef = useRef(null);
    const secondaryUploadRef = useRef(null);

    const handleFileChange = (e, isPrimary) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size is too large! Maximum 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (isPrimary) {
                    setPrimaryLogo(event.target.result);
                    setToast({ message: 'Primary logo updated successfully!', type: 'success' });
                } else {
                    const newLogo = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        src: event.target.result
                    };
                    setSecondaryLogos(prev => [...prev, newLogo]);
                    setToast({ message: `'${file.name}' uploaded successfully.`, type: 'success' });
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDeleteClick = (logo) => {
        setLogoToDelete(logo);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        setSecondaryLogos(prev => prev.filter(logo => logo.id !== logoToDelete.id));
        setToast({ message: `'${logoToDelete.name}' has been deleted.`, type: 'success' });
        setIsConfirmModalOpen(false);
        setLogoToDelete(null);
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">Logo Management</h1>

                        <PrimaryLogoSection
                            logoSrc={primaryLogo}
                            onUploadClick={() => primaryUploadRef.current.click()}
                        />
                        <input type="file" ref={primaryUploadRef} onChange={(e) => handleFileChange(e, true)} className="hidden" accept="image/png, image/jpeg" />

                        <SecondaryLogosSection
                            logos={secondaryLogos}
                            onDelete={handleDeleteClick}
                            onUploadClick={() => secondaryUploadRef.current.click()}
                        />
                        <input type="file" ref={secondaryUploadRef} onChange={(e) => handleFileChange(e, false)} className="hidden" accept="image/png, image/jpeg" multiple />
                    </div>
                </main>
            </div>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete '${logoToDelete?.name}'?`}
                iconClass="ri-logout-box-r-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

const PrimaryLogoSection = ({ logoSrc, onUploadClick }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Primary Logo</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <img src={logoSrc} alt="Primary Logo" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-grow text-center sm:text-left">
                <p className="text-gray-800 dark:text-gray-200">This is the main logo for your organisation. It will be used by default on certificates and other branding materials.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 512x512px, PNG format with transparent background.</p>
                <button onClick={onUploadClick} className="mt-4 inline-block px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark cursor-pointer">
                    <i className="ri-upload-2-line mr-2"></i>Change Logo
                </button>
            </div>
        </div>
    </div>
);

const SecondaryLogosSection = ({ logos, onDelete, onUploadClick }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Secondary Logos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage logos for clubs, associations, or special events.</p>
            </div>
            <button onClick={onUploadClick} className="mt-4 sm:mt-0 w-full sm:w-auto px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center cursor-pointer">
                <i className="ri-add-line mr-2"></i>Upload New Logo
            </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {logos.map(logo => (
                <div key={logo.id} className="group relative aspect-square bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center p-4 overflow-hidden">
                    <img src={logo.src} alt={logo.name} className="max-w-full max-h-full object-contain" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onDelete(logo)} className="p-2 rounded-full bg-white/50 dark:bg-gray-900/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <i className="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default LogoManagement;
