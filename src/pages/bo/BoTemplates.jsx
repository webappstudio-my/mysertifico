// src/pages/bo/BoTemplates.jsx
import React, { useState, useEffect, useRef } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoTemplateAddEditModal from '../../components/bo/BoTemplateAddEditModal';
import BoTemplatePreviewModal from '../../components/bo/BoTemplatePreviewModal';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';

// userRole is passed as a prop to render conditional features such as DELETE button for templates
const BoTemplateManagement = ({ userRole = 'admin' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    // Modal state for adding/editing templates
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Data for modals
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templateToDelete, setTemplateToDelete] = useState(null);

    // Form data for adding/editing templates
    /*const [formData, setFormData] = useState({
        title: '',
        style: '',
        orientation: '',
        alignment: '',
        color: '',
        image: null,
    }); */

    const fileInputRef = useRef(null);
    const itemsPerPage = 12;
    const [templateData, setTemplateData] = useState([
        // Sample data for demonstration purposes
        { id: 1, code: 'CLLC-GOLD-001', title: 'Classic · Landscape · Center · Gold', thumb: 'https://placehold.co/400x300/f59e0b/fff?text=Certificate', style: 'Classic', orientation: 'Landscape', color: 'GOLD', alignment: 'Centre' },
        { id: 2, code: 'CLPC-BLUE-002', title: 'Classic · Portrait · Center · Blue', thumb: 'https://placehold.co/300x400/3b82f6/fff?text=Certificate', style: 'Classic', orientation: 'Portrait', color: 'BLUE', alignment: 'Centre' },
        { id: 3, code: 'MDLC-PURPLE-003', title: 'Modern · Landscape · Center · Purple', thumb: 'https://placehold.co/400x300/8b5cf6/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'PURPLE', alignment: 'Centre' },
        { id: 4, code: 'MDLC-GOLD-004', title: 'Modern · Landscape · Center · Gold', thumb: 'https://placehold.co/400x300/f59e0b/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'GOLD', alignment: 'Centre' },
        { id: 5, code: 'MDPL-RED-005', title: 'Modern · Portrait · Left · Red', thumb: 'https://placehold.co/300x400/ef4444/fff?text=Certificate', style: 'Modern', orientation: 'Portrait', color: 'RED', alignment: 'Left' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
        { id: 6, code: 'MDLC-BLACK-006', title: 'Modern · Landscape · Center · Black', thumb: 'https://placehold.co/400x300/1f2937/fff?text=Certificate', style: 'Modern', orientation: 'Landscape', color: 'BLACK', alignment: 'Centre' },
    ]);
    
    //search and filter logic
    const filteredData = templateData.filter(template =>
        template.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Modal handlers
    const handleAddNew = () => {
        setEditingTemplate(null);
        setShowModal(true);
    };

    const handleEdit = (template) => {
        setEditingTemplate(template);
        setShowModal(true);
    };

    const handleView = (template) => {
        setSelectedTemplate(template);
        setShowViewModal(true);
    };

    const handleDelete = (template) => {
        setTemplateToDelete(template);
        setShowConfirmModal(true);
    };

    const handleSave = (templateData) => {
        if (editingTemplate) {
            // Update existing template
            setTemplateData(prev => prev.map(template => 
                template.id === editingTemplate.id 
                    ? { ...template, ...templateData }
                    : template
            ));
        } else {
            // Add new template
            const newId = Math.max(...templateData.map(t => t.id)) + 1;
            const newCode = generateTemplateCode(templateData);
            const newTemplate = {
                id: newId,
                code: newCode,
                thumb: `https://placehold.co/400x300/666/fff?text=${encodeURIComponent(templateData.title)}`,
                name: templateData.title,
                organization: 'MySertifico',
                dateIssued: new Date().toISOString().split('T')[0],
                status: 'Active',
                ...templateData
            };
            setTemplateData(prev => [...prev, newTemplate]);
        }
        setShowModal(false);
        setEditingTemplate(null);
    };

    const handleConfirmDelete = () => {
        if (templateToDelete) {
            setTemplateData(prev => prev.filter(template => template.id !== templateToDelete.id));
            setShowConfirmModal(false);
            setTemplateToDelete(null);
        }
    };

    const generateTemplateCode = (formData) => {
        const styleCode = formData.style === 'Classic' ? 'CL' : 'MD';
        const orientationCode = formData.orientation === 'Landscape' ? 'L' : 'P';
        const alignmentCode = formData.alignment === 'Centre' ? 'C' : (formData.alignment === 'Left' ? 'L' : 'R');
        const colorCode = formData.color;
        const number = String(templateData.length + 1).padStart(3, '0');
        return `${styleCode}${orientationCode}${alignmentCode}-${colorCode}-${number}`;
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderGridView = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedData.map(template => (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group">
                    <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                        <img src={template.thumb} alt={template.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white truncate">{template.code}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.title}</p>
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-end items-center gap-1">
                            <button 
                                onClick={() => handleView(template)}
                                className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                title="View"
                            >
                                <i className="ri-eye-line"></i>
                            </button>
                            <button 
                                onClick={() => handleEdit(template)}
                                className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                title="Edit"
                            >
                                <i className="ri-pencil-line"></i>
                            </button>
                            {userRole === 'admin' && (
                                <button 
                                    onClick={() => handleDelete(template)}
                                    className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500" 
                                    title="Delete"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderListView = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Template</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map(template => (
                            <tr key={template.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-4">
                                    <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded-md">
                                        <img src={template.thumb} alt={template.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{template.code}</p>
                                        <p className="text-xs text-gray-500">{template.title}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end items-center gap-1">
                                        <button 
                                            onClick={() => handleView(template)}
                                            className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                            title="View"
                                        >
                                            <i className="ri-eye-line"></i>
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(template)}
                                            className="p-2 text-gray-500 hover:text-teal-600 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" 
                                            title="Edit"
                                        >
                                            <i className="ri-pencil-line"></i>
                                        </button>
                                        {userRole === 'admin' && (
                                            <button 
                                                onClick={() => handleDelete(template)}
                                                className="p-2 text-red-500 hover:text-white rounded-lg hover:bg-red-500" 
                                                title="Delete"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">
            <BoSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {isSidebarOpen && 
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                </div>
            }
            
            <div className="relative min-h-screen transition-all duration-300 ease-in-out lg:pl-64">
                <BoNavbar onSidebarToggle={handleSidebarToggle} headerTitle="Template Management" />
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Certificate Templates</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage, create, and publish certificate templates.</p>
                            </div>
                            <button 
                                onClick={handleAddNew}
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors w-full sm:w-auto"
                            >
                                <i className="ri-add-line"></i>
                                <span>Add New Template</span>
                            </button>
                        </div>

                        {/* Toolbar Section */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            <div className="relative w-full md:w-80">
                                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Search by code or title..." 
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                />
                            </div>
                            <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-900/50 rounded-lg">
                                <button 
                                    className={`p-2 rounded-md ${currentView === 'grid' ? 'bg-white dark:bg-gray-800 text-teal-600 shadow' : 'text-gray-500 dark:text-gray-400'}`} 
                                    onClick={() => setCurrentView('grid')}
                                >
                                    <i className="ri-layout-grid-fill"></i>
                                </button>
                                <button 
                                    className={`p-2 rounded-md ${currentView === 'list' ? 'bg-white dark:bg-gray-800 text-teal-600 shadow' : 'text-gray-500 dark:text-gray-400'}`} 
                                    onClick={() => setCurrentView('list')}
                                >
                                    <i className="ri-list-check-2"></i>
                                </button>
                            </div>
                        </div>
                        
                        {/* Templates Container */}
                        <div>
                            {filteredData.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="flex flex-col items-center">
                                        <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Templates Found</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">Your search did not match any templates.</p>
                                    </div>
                                </div>
                            ) : (
                                currentView === 'grid' ? renderGridView() : renderListView()
                            )}
                        </div>

                        {/* Pagination */}
                        <BoPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </main>
            </div>

            {/* Add/Edit Modal */}
            <BoTemplateAddEditModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingTemplate(null);
                }}
                onSave={handleSave}
                template={editingTemplate}
            />

            {/* Preview Modal */}
            <BoTemplatePreviewModal
                isOpen={showViewModal}
                onClose={() => {
                    setShowViewModal(false);
                    setSelectedTemplate(null);
                }}
                template={selectedTemplate}
            />

            {/* Confirmation Modal */}
            <BoConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => {
                    setShowConfirmModal(false);
                    setTemplateToDelete(null);
                }}
                title="Delete Template"
                message={`Are you sure you want to delete "${templateToDelete?.code}"? This action cannot be undone.`}
                iconClass="ri-delete-bin-line text-red-500"
                confirmButtonText="Delete"
                confirmButtonClass="bg-red-500 hover:bg-red-600 text-white"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default BoTemplateManagement;