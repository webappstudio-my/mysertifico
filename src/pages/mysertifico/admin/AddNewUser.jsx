import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Sidebar from '../../../components/mysertifico/Sidebar';

const AddNewUser = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: '',
        status: 'Active'
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('https://placehold.co/300x300/e2e8f0/cbd5e1?text=Upload');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
        console.log('Profile Picture:', profilePicture);
    };

    return (
        <div className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
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
                    <div className="max-w-4xl mx-auto">
                        {/* Page Title and Back Button */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Add New User</h1>
                            <Link 
                                to="/admin/user-list" 
                                className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 flex-shrink-0" 
                                title="Back to User List"
                            >
                                <i className="ri-arrow-left-line text-xl"></i>
                            </Link>
                        </div>
                        
                        {/* Main Content Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Section: Profile Picture */}
                                    <div className="lg:col-span-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h3>
                                        <div className="flex flex-col items-center">
                                            <div className="relative group w-48 h-48">
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Profile Picture" 
                                                    className="w-full h-full rounded-full object-cover bg-gray-200"
                                                />
                                                <label 
                                                    htmlFor="profile-picture-upload" 
                                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 cursor-pointer transition-opacity duration-300 group-hover:opacity-100"
                                                >
                                                    <i className="ri-camera-line text-white text-3xl"></i>
                                                </label>
                                                <input 
                                                    type="file" 
                                                    id="profile-picture-upload" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Click image to upload</p>
                                        </div>
                                    </div>
                                    
                                    {/* Right Section: User Details */}
                                    <div className="lg:col-span-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Details</h3>
                                        <div className="space-y-6">
                                            {/* Full Name */}
                                            <div>
                                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Full Name
                                                </label>
                                                <input 
                                                    type="text" 
                                                    id="fullName" 
                                                    name="fullName"
                                                    placeholder="Enter full name" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                                    required
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            
                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Email
                                                </label>
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    name="email"
                                                    placeholder="Enter email address" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            
                                            {/* Position */}
                                            <div>
                                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Position
                                                </label>
                                                <select 
                                                    id="position" 
                                                    name="position"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                    value={formData.position}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Choose a position</option>
                                                    <option value="Super Admin">Super Admin</option>
                                                    <option value="Issuer">Issuer</option>
                                                    <option value="Verifier">Verifier</option>
                                                    <option value="Signatory">Signatory</option>
                                                </select>
                                            </div>
                                            
                                            {/* Status */}
                                            <div>
                                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Status
                                                </label>
                                                <select 
                                                    id="status" 
                                                    name="status"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Action Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                                    <Link 
                                        to="/admin/user-list" 
                                        className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                    >
                                        Add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddNewUser;