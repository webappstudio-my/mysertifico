import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';

const ImportUsers = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    const handleFileUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUploadedFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={handleSidebarClose}
                ></div>    
            )}
            
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <DashboardNavbar 
                    onSidebarToggle={handleSidebarToggle}
                    theme={theme}
                    onThemeToggle={onThemeToggle}
                />
                
                <main className="p-6 sm:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Import Users</h1>
                            <a 
                                href="/dashboard/settings/users" 
                                className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex-shrink-0" 
                                title="Back to User List"
                            >
                                <i className="ri-arrow-left-line text-xl"></i>
                            </a>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 1: Download Template</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Download our template to ensure your data is in the correct format for importing.</p>
                                    <a 
                                        href="#" 
                                        className="inline-flex items-center mt-4 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark"
                                    >
                                        <i className="ri-file-excel-2-line mr-2"></i> Download Template (.xlsx)
                                    </a>
                                </div>

                                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step 2: Upload Your File</h3>
                                    <div className="mt-4 flex items-center justify-center w-full">
                                        <label 
                                            htmlFor="import-file-upload" 
                                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            {!uploadedFile ? (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <i className="ri-upload-cloud-2-line text-4xl text-gray-500 dark:text-gray-400"></i>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">XLS, XLSX or CSV (MAX. 5MB)</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    <i className="ri-file-check-line text-4xl text-green-500"></i>
                                                    <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">{uploadedFile.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">File ready to be imported.</p>
                                                </div>
                                            )}
                                            <input 
                                                id="import-file-upload" 
                                                type="file" 
                                                className="hidden" 
                                                accept=".xls,.xlsx,.csv"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div> 
                                </div>
                                
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                                    <a 
                                        href="/dashboard/settings/users" 
                                        className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                                    >
                                        Cancel
                                    </a>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                    >
                                        Import Users
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
                    onClick={handleSidebarClose}
                ></div>
            )}
        </div>
    );
};

export default ImportUsers;