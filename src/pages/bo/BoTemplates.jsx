// src/pages/bo/BoTemplateManagement.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';
import BoTemplateAddEditModal from '../../components/bo/BoTemplateAddEditModal';
import BoTemplatePreviewModal from '../../components/bo/BoTemplatePreviewModal';
import BoSearchInput from '../../components/bo/BoSearchInput';

// Import sample images - adjust paths as needed
import sampleLogo from '../../assets/images/logos/logo.png'; // Adjust the path as necessary
import sampleSignature from '../../assets/images/logos/signature.png'; // Adjust the path as necessary
import sampleQrCode from '../../assets/images/logos/qr-code.png'; // Adjust the path as necessary

const BoTemplateManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);
    
    const itemsPerPage = 8;

    // Sample template data
     const [templateData, setTemplateData] = useState([
        { 
            id: 1, 
            code: 'CLLC-GOLD-001', 
            title: 'Classic · Landscape · Center · Gold', 
            thumb: '/src/images/templates/cllc-gold-001.svg',
            style: 'Classic', 
            orientation: 'Landscape', 
            color: 'GOLD', 
            alignment: 'Centre',
            name: 'Classic Gold Certificate',
            organization: 'Sample Organization',
            template: 'Classic Template',
            dateIssued: '2024-01-15',
            status: 'Active',
            recipient: 'John Doe',
            usageCount: 1247
        },
        { 
            id: 2, 
            code: 'CLPC-BLUE-002', 
            title: 'Classic · Portrait · Center · Blue', 
            thumb: '/src/images/templates/clpc-blue-002.svg',
            style: 'Classic', 
            orientation: 'Portrait', 
            color: 'BLUE', 
            alignment: 'Centre',
            name: 'Classic Blue Certificate',
            organization: 'Sample Organization',
            template: 'Classic Template',
            dateIssued: '2024-01-16',
            status: 'Active',
            recipient: 'Jane Smith',
            usageCount: 856
        },
        { 
            id: 3, 
            code: 'MDLC-PURPLE-003', 
            title: 'Modern · Landscape · Center · Purple', 
            thumb: '/src/images/templates/mdlc-purple-003.svg',
            style: 'Modern', 
            orientation: 'Landscape', 
            color: 'PURPLE', 
            alignment: 'Centre',
            name: 'Modern Purple Certificate',
            organization: 'Sample Organization',
            template: 'Modern Template',
            dateIssued: '2024-01-17',
            status: 'Active',
            recipient: 'Bob Johnson',
            usageCount: 342
        },
        { 
            id: 4, 
            code: 'MDLC-GOLD-004', 
            title: 'Modern · Landscape · Center · Gold', 
            thumb: '/src/images/templates/mdlc-gold-004.svg',
            style: 'Modern', 
            orientation: 'Landscape', 
            color: 'GOLD', 
            alignment: 'Centre',
            name: 'Modern Gold Certificate',
            organization: 'Sample Organization',
            template: 'Modern Template',
            dateIssued: '2024-01-18',
            status: 'Active',
            recipient: 'Alice Williams',
            usageCount: 2103
        },
        { 
            id: 5, 
            code: 'MDPL-RED-005', 
            title: 'Modern · Portrait · Left · Red', 
            thumb: '/src/images/templates/mdpl-red-005.svg',
            style: 'Modern', 
            orientation: 'Portrait', 
            color: 'RED', 
            alignment: 'Left',
            name: 'Modern Red Certificate',
            organization: 'Sample Organization',
            template: 'Modern Template',
            dateIssued: '2024-01-19',
            status: 'Active',
            recipient: 'Charlie Brown',
            usageCount: 78
        },
        { 
            id: 6, 
            code: 'MDLC-BLACK-006', 
            title: 'Modern · Landscape · Center · Black', 
            thumb: '/src/images/templates/mdlc-black-006.svg',
            style: 'Modern', 
            orientation: 'Landscape', 
            color: 'BLACK', 
            alignment: 'Centre',
            name: 'Modern Black Certificate',
            organization: 'Sample Organization',
            template: 'Modern Template',
            dateIssued: '2024-01-20',
            status: 'Active',
            recipient: 'Diana Prince',
            usageCount: 524
        },
    ]);

    // Sample elements data for certificate preview
    const elementsData = [
        { element_id: "logo", type: "image", content: sampleLogo, position_x: 561, position_y: 90, width: 100, height: 100, alignment: "Centre" },
        { element_id: "organization_name", type: "text", content: "{OrganizationName}", position_x: 561, position_y: 190, font_family: "Montserrat", font_size: 20, font_weight: "500", color: "#111827", alignment: "Centre" },
        { element_id: "certificate_title", type: "text", content: "CERTIFICATE TITLE", position_x: 561, position_y: 270, font_family: "EB Garamond", font_size: 60, font_weight: "bold", color: "#92400e", alignment: "Centre" },
        { element_id: "recipient_name", type: "text", content: "{RecipientName}", position_x: 561, position_y: 410, font_family: "EB Garamond", font_size: 24, font_weight: "bold", color: "#000000", alignment: "Centre" },
        { element_id: "signature_image", type: "image", content: sampleSignature, position_x: 300, position_y: 560, width: 180, height: 70 },
        { element_id: "qr_code", type: "image", content: sampleQrCode, position_x: 820, position_y: 590, width: 100, height: 100 }
    ];

    // Filter templates based on search
    const filteredTemplates = templateData.filter(t => 
        t.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginate filtered data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredTemplates.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    // Handle template actions
    const handleViewTemplate = (template) => {
        setSelectedTemplate(template);
        setIsPreviewModalOpen(true);
    };

    const handleEditTemplate = (template) => {
        setSelectedTemplate(template);
        setIsAddEditModalOpen(true);
    };

    const handleDeleteTemplate = (template) => {
        setTemplateToDelete(template);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (templateToDelete) {
            setTemplateData(prev => prev.filter(t => t.id !== templateToDelete.id));
            setIsDeleteModalOpen(false);
            setTemplateToDelete(null);
        }
    };

    const handleSaveTemplate = (formData) => {
        if (formData.id) {
            // Edit existing template
            setTemplateData(prev => prev.map(t => 
                t.id === formData.id 
                    ? { ...t, ...formData }
                    : t
            ));
        } else {
            // Add new template (this would typically be done on a separate page)
            const newId = Math.max(...templateData.map(t => t.id)) + 1;
            const newTemplate = {
                ...formData,
                id: newId,
                code: `NEW-${formData.style.toUpperCase()}-${String(newId).padStart(3, '0')}`,
                name: formData.title,
                thumb: '/src/images/templates/default.svg',
                organization: 'Sample Organization',
                template: `${formData.style} Template`,
                dateIssued: new Date().toISOString().split('T')[0],
                status: 'Active',
                recipient: 'New Recipient',
                usageCount: 0
            };
            setTemplateData(prev => [...prev, newTemplate]);
        }
        setIsAddEditModalOpen(false);
        setSelectedTemplate(null);
    };

    //For BoSearchInput variables
    const handleSearchSubmit = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page when searching
    };

    const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
    };

    // Certificate Preview Component
    const CertificatePreview = ({ template, scale = 1 }) => {
        const originalWidth = template.orientation === 'Landscape' ? 1123 : 794;
        const originalHeight = template.orientation === 'Landscape' ? 794 : 1123;

        return (
            <div 
                className="certificate-preview-container relative"
                style={{
                    width: `${originalWidth * scale}px`,
                    height: `${originalHeight * scale}px`,
                    backgroundImage: `url(${template.thumb})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
            >
                {elementsData.map((element, index) => {
                    const baseWidth = 1123;
                    const scaleRatio = originalWidth / baseWidth;
                    const positionX = element.position_x * scaleRatio;
                    
                    const alignment = (element.alignment || template.alignment || 'Centre').toLowerCase();
                    let transform = '';
                    if (alignment === 'centre') transform = 'translateX(-50%)';
                    else if (alignment === 'right') transform = 'translateX(-100%)';

                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                left: `${positionX}px`,
                                top: `${element.position_y}px`,
                                transform: transform
                            }}
                        >
                            {element.type === 'text' ? (
                                <span
                                    style={{
                                        fontFamily: `'${element.font_family}', sans-serif`,
                                        fontSize: `${element.font_size * scale}px`,
                                        fontWeight: element.font_weight || 'normal',
                                        color: element.color,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {element.content}
                                </span>
                            ) : (
                                <img
                                    src={element.content}
                                    alt=""
                                    style={{
                                        width: `${element.width * scale}px`,
                                        height: `${element.height * scale}px`
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Template Card Component with Usage Count
    const TemplateCard = ({ template }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group flex flex-col">
            <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                <CertificatePreview template={template} scale={0.15} />
                {/* Usage count badge */}
                <div className="absolute top-2 right-2 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <i className="ri-file-copy-2-line text-xs"></i>
                    <span>{template.usageCount.toLocaleString()}</span>
                </div>
            </div>
            <div className="p-4 flex-grow">
                <h4 className="font-semibold text-gray-800 dark:text-white truncate">{template.code}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.title}</p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        <i className="ri-bar-chart-box-line mr-1"></i>
                        {template.usageCount.toLocaleString()} {template.usageCount === 1 ? 'use' : 'uses'}
                    </span>
                </div>
            </div>
            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-end items-center gap-1">
                    <button 
                        className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="View"
                        onClick={() => handleViewTemplate(template)}
                    >
                        <i className="ri-eye-line"></i>
                    </button>
                    <button 
                        className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit"
                        onClick={() => handleEditTemplate(template)}
                    >
                        <i className="ri-pencil-line"></i>
                    </button>
                    <button 
                        className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500"
                        title="Delete"
                        onClick={() => handleDeleteTemplate(template)}
                    >
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );

    // Template List Row Component with Usage Count
    const TemplateRow = ({ template }) => (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded-md">
                        <CertificatePreview template={template} scale={0.05} />
                    </div>
                    <div>
                        <p className="font-semibold">{template.code}</p>
                        <p className="text-xs text-gray-500">{template.title}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">
                            {template.usageCount.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {template.usageCount === 1 ? 'certificate' : 'certificates'}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-1">
                    <button 
                        className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="View"
                        onClick={() => handleViewTemplate(template)}
                    >
                        <i className="ri-eye-line"></i>
                    </button>
                    <button 
                        className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit"
                        onClick={() => handleEditTemplate(template)}
                    >
                        <i className="ri-pencil-line"></i>
                    </button>
                    <button 
                        className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500"
                        title="Delete"
                        onClick={() => handleDeleteTemplate(template)}
                    >
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <BoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                    onClick={() => setIsSidebarOpen(false)}>
                </div>
            )}
            
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar 
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
                    headerTitle="Template Management"
                />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header & Main Action Button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Certificate Templates</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage, create, and publish certificate templates.</p>
                            </div>
                            <Link 
                                to="/bo/templates/create-template" 
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors w-full sm:w-auto"
                            >
                                <i className="ri-add-line"></i>
                                <span>Add New Template</span>
                            </Link>
                        </div>

                        {/* Toolbar: Search, Filter, View Toggle */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearchSubmit}
                                    onClear={handleClearSearch}
                                    placeholder="Search by code or title..."
                                    activeSearchTerm={searchTerm}
                                    className="w-full md:w-auto"
                            />
                            {/*<div className="relative w-full md:w-80">
                                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Search by code or title..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-900 dark:text-white"
                                />
                            </div>*/}
                            <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-900/50 rounded-lg">
                                <button 
                                    onClick={() => setCurrentView('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        currentView === 'grid' 
                                            ? 'bg-white dark:bg-gray-800 text-teal-600 shadow' 
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                >
                                    <i className="ri-layout-grid-fill"></i>
                                </button>
                                <button 
                                    onClick={() => setCurrentView('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        currentView === 'list' 
                                            ? 'bg-white dark:bg-gray-800 text-teal-600 shadow' 
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                >
                                    <i className="ri-list-check-2"></i>
                                </button>
                            </div>
                        </div>
                        
                        {/* Main Content Area */}
                        <div id="templates-container">
                            {filteredTemplates.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="flex flex-col items-center">
                                        <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Templates Found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">Your search did not match any templates. Try another keyword.</p>
                                    </div>
                                </div>
                            ) : currentView === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedData.map(template => (
                                        <TemplateCard key={template.id} template={template} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3">Template</th>
                                                    <th className="px-6 py-3 text-center">Usage</th>
                                                    <th className="px-6 py-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map(template => (
                                                    <TemplateRow key={template.id} template={template} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Pagination */}
                        {filteredTemplates.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <BoPagination
                                    currentPage={currentPage}
                                    totalItems={filteredTemplates.length}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modals */}
            <BoTemplateAddEditModal
                isOpen={isAddEditModalOpen}
                onClose={() => {
                    setIsAddEditModalOpen(false);
                    setSelectedTemplate(null);
                }}
                onSave={handleSaveTemplate}
                template={selectedTemplate}
                onPreview={(previewTemplate) => {
                    setSelectedTemplate(previewTemplate);
                    setIsPreviewModalOpen(true);
                }}
            />

            <BoTemplatePreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => {
                    setIsPreviewModalOpen(false);
                    setSelectedTemplate(null);
                }}
                template={selectedTemplate}
            />

            <BoConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setTemplateToDelete(null);
                }}
                title="Delete Template?"
                message={`Are you sure you want to delete the template "${templateToDelete?.code}"? This action cannot be undone.`}
                iconClass="ri-error-warning-line text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="bg-red-600 text-white hover:bg-red-700 transition-colors"
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BoTemplateManagement;