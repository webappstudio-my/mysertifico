import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';

const MyProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?u=admin');
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [fullName, setFullName] = useState('Masta Rob');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
                setIsImageChanged(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePicture = () => {
        // Simulate API call to upload image
        console.log('Uploading new profile picture...');
        setTimeout(() => {
            alert('Profile picture updated successfully!');
            setIsImageChanged(false);
        }, 1000);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);

        // Simulate an API call to save profile details
        console.log('Saving account details...');
        setTimeout(() => {
            setIsSuccess(true);
            setErrorMessage('');
            // Optional: Reload data from API after successful save
        }, 1500);
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="p-6 sm:p-8">
                    <div className="max-w-4xl mx-auto">
                        {isSuccess && (
                            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-3">
                                <i className="ri-checkbox-circle-line text-md mt-0.5"></i>
                                <span>Profile details updated successfully!</span>
                            </div>
                        )}
                        {isError && (
                            <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-3">
                                <i className="ri-alert-line text-md mt-0.5"></i>
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column: Profile Picture */}
                            <div className="md:col-span-1">
                                <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md p-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Picture</h3>
                                    <div className="relative w-32 h-32 mx-auto">
                                        <img id="profile-image-preview" src={profileImage} alt="Profile Picture" className="w-32 h-32 rounded-full object-cover shadow-lg" />
                                        <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary-dark transition-colors">
                                            <i className="ri-camera-line"></i>
                                            <input type="file" id="profile-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    {isImageChanged && (
                                        <button
                                            id="save-picture-btn"
                                            onClick={handleSavePicture}
                                            className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            Save Picture
                                        </button>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Click the camera icon to change your picture.</p>
                                </div>
                            </div>

                            {/* Right Column: Profile Details */}
                            <div className="md:col-span-2">
                                <div className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-xl shadow-md">
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Account Details</h3>
                                    </div>
                                    <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                                        <div>
                                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <input
                                                type="text"
                                                id="full-name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="mt-1 block w-full font-semibold text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <input type="email" id="email" value="rob@webapp.studio" disabled className="mt-1 block w-full font-semibold text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                            <input type="text" id="role" value="Super Admin" disabled className="mt-1 block w-full font-semibold text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed" />
                                        </div>
                                        <div className="pt-2 text-right">
                                            <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyProfile;