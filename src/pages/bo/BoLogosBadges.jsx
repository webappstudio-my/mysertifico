import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoConfirmationModal from '../../components/bo/BoConfirmationModal';

const BoLogosBadges = () => {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  
  const fileInputRef = useRef(null);
  const itemsPerPage = 12;

  // Initial asset data
  const [assetData, setAssetData] = useState([
    { id: 1, name: 'Sports Club', imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=1:1' },
    { id: 2, name: 'Academic Badge', imageUrl: 'https://placehold.co/100x200/10b981/ffffff?text=1:2' },
    { id: 3, name: 'Leadership Banner', imageUrl: 'https://placehold.co/200x100/f59e0b/ffffff?text=2:1' },
    { id: 4, name: 'Science Fair Logo', imageUrl: 'https://placehold.co/200x200/8b5cf6/ffffff?text=1:1' },
    { id: 5, name: 'Art Club Badge', imageUrl: 'https://placehold.co/100x200/ec4899/ffffff?text=1:2' },
    { id: 6, name: 'Debate Team Banner', imageUrl: 'https://placehold.co/200x100/ef4444/ffffff?text=2:1' },
    { id: 7, name: 'Chess Club', imageUrl: 'https://placehold.co/200x200/6366f1/ffffff?text=1:1' },
    { id: 8, name: 'Music Society', imageUrl: 'https://placehold.co/200x200/14b8a6/ffffff?text=1:1' },
    { id: 9, name: 'Robotics Club', imageUrl: 'https://placehold.co/200x200/f43f5e/ffffff?text=1:1' },
    { id: 10, name: 'Environmental Badge', imageUrl: 'https://placehold.co/100x200/22c55e/ffffff?text=1:2' },
    { id: 11, name: 'Math Olympiad', imageUrl: 'https://placehold.co/200x100/84cc16/ffffff?text=2:1' },
    { id: 12, name: 'Red Crescent', imageUrl: 'https://placehold.co/200x200/dc2626/ffffff?text=1:1' },
    { id: 13, name: 'Scouts Logo', imageUrl: 'https://placehold.co/200x200/7c3aed/ffffff?text=1:1' },
  ]);

  // Filter assets based on search term
  const filteredAssets = assetData.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  // Sidebar handlers
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Modal handlers
  const openModal = (mode = 'add', asset = null) => {
    setModalMode(mode);
    setSelectedAsset(asset);
    setSelectedFile(null);
    setImagePreview(asset?.imageUrl || '');
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
    setSelectedFile(null);
    setImagePreview('');
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openViewModal = (asset) => {
    setSelectedAsset(asset);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAsset(null);
  };

  const openConfirmModal = (asset) => {
    setItemToDelete(asset);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setItemToDelete(null);
  };

  // File handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };
    delete newErrors.file;

    if (file) {
      // Validate file type
      if (file.type !== 'image/svg+xml') {
        newErrors.file = 'Invalid file type. Only SVG is allowed.';
        setErrors(newErrors);
        e.target.value = '';
        return;
      }
      
      // Validate file size (1MB limit)
      if (file.size > 1 * 1024 * 1024) {
        newErrors.file = 'File is too large. Maximum size is 1MB.';
        setErrors(newErrors);
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
      setErrors(newErrors);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(modalMode === 'edit' ? '' : '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('assetName').trim();
    const newErrors = {};

    // Validation
    if (!name) {
      newErrors.name = 'Please enter a name.';
    }

    if (modalMode === 'add' && !selectedFile) {
      newErrors.file = 'Please upload an image file.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === 'edit' && selectedAsset) {
      // Update existing asset
      setAssetData(prev => prev.map(asset => 
        asset.id === selectedAsset.id 
          ? { 
              ...asset, 
              name,
              imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : asset.imageUrl
            }
          : asset
      ));
    } else {
      // Add new asset
      const newId = Math.max(...assetData.map(a => a.id)) + 1;
      const newAsset = {
        id: newId,
        name,
        imageUrl: URL.createObjectURL(selectedFile)
      };
      setAssetData(prev => [newAsset, ...prev]);
      setCurrentPage(1); // Go to first page to see new item
    }

    closeModal();
  };

  // Delete asset
  const handleDelete = () => {
    if (itemToDelete) {
      setAssetData(prev => prev.filter(asset => asset.id !== itemToDelete.id));
      setCurrentPage(1); // Go to first page after delete
      closeConfirmModal();
    }
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
      
      {/* Sidebar */}
      <BoSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Navbar */}
        <BoNavbar onSidebarToggle={toggleSidebar} headerTitle="Logos & Badges" />

        {/* Page Content */}
        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header & Main Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Asset Library</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage logos and badges for organizations to use on certificates.</p>
              </div>
              <button 
                onClick={() => openModal('add')}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg inline-flex items-center gap-2 transition-colors w-full sm:w-auto"
              >
                <i className="ri-add-line font-bold"></i>
                <span>Upload New Asset</span>
              </button>
            </div>

            {/* Toolbar: Search */}
            <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="relative w-full md:w-80">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            {/* Assets Grid */}
            {filteredAssets.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex flex-col items-center">
                  <i className="ri-search-eye-line text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Assets Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Your search did not match any assets. Try another keyword.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {paginatedAssets.map(asset => (
                  <div key={asset.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group relative">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-2">
                      <img 
                        src={asset.imageUrl} 
                        alt={asset.name} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/200x128/f1f5f9/9ca3af?text=Image+not+found';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate">{asset.name}</h4>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openViewModal(asset)}
                        className="p-2 text-gray-700 bg-white/70 dark:text-white dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-900" 
                        title="View"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button 
                        onClick={() => openModal('edit', asset)}
                        className="p-2 text-gray-700 bg-white/70 dark:text-white dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-900" 
                        title="Edit"
                      >
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button 
                        onClick={() => openConfirmModal(asset)}
                        className="p-2 text-red-500 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-500" 
                        title="Delete"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <BoPagination
                currentPage={currentPage}
                totalItems={filteredAssets.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all my-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                  {modalMode === 'edit' ? 'Edit Asset' : 'Upload New Asset'}
                </h3>
                <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Asset Name */}
                <div>
                  <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset Name</label>
                  <input 
                    type="text" 
                    name="assetName"
                    defaultValue={selectedAsset?.name || ''}
                    className="mt-1 block w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-slate-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white" 
                    placeholder="e.g., School Sports Club"
                  />
                  {errors.name && <small className="text-red-500 mt-1 block">{errors.name}</small>}
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image File</label>
                  
                  {!imagePreview ? (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <i className="ri-image-add-line text-4xl text-gray-400"></i>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary dark:text-accent hover:underline">
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              ref={fileInputRef}
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              accept="image/svg+xml"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">SVG only, max 1MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 text-center">
                      <img src={imagePreview} alt="Image Preview" className="max-h-32 mx-auto rounded-lg"/>
                      <p className="mt-2 text-sm text-gray-500">
                        {selectedFile ? selectedFile.name : 'Current image'}
                      </p>
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="mt-2 text-xs text-red-500 hover:underline"
                      >
                        Remove image
                      </button>
                    </div>
                  )}
                  
                  {errors.file && <small className="text-red-500 mt-1 block">{errors.file}</small>}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {modalMode === 'edit' ? 'Update Asset' : 'Save Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Asset Modal */}
      {isViewModalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all my-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{selectedAsset.name}</h3>
              <button type="button" onClick={closeViewModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-4 rounded-lg">
                <img src={selectedAsset.imageUrl} alt="Asset Preview" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                type="button" 
                onClick={closeViewModal}
                className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal using BoConfirmationModal */}
      <BoConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        title="Delete Asset?"
        message={`Are you sure you want to delete the asset "${itemToDelete?.name}"? This action cannot be undone.`}
        iconClass="ri-error-warning-line text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50"
        confirmButtonText="Yes, Delete"
        confirmButtonClass="bg-red-600 text-white hover:bg-red-700 transition-colors"
        onConfirm={handleDelete}
      />

      {/* Remix Icon CDN */}
      <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet"/>
      
    </div>
  );
};

export default BoLogosBadges;