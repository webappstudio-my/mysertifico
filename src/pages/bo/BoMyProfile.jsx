import React, { useState, useEffect } from 'react';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import Toast from '../../components/common/Toast';

const BoMyProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [fullName, setFullName] = useState('Fikri Nabil');
    const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?u=admin');
    const [newProfileImageFile, setNewProfileImageFile] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '', show: false });

    const showToast = (message, type) => {
        setToast({ message, type, show: true });
    };

    // This useEffect is for simulating the DOMContentLoaded event from the original HTML
    useEffect(() => {
        // You could perform initial data fetching here if needed
    }, []);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (!allowedTypes.includes(file.type)) {
                showToast('Invalid file type. Please select a JPG or PNG image.', 'error');
                event.target.value = '';
                return;
            }

            if (file.size > maxSize) {
                showToast('File size exceeds 2MB. Please select a smaller image.', 'error');
                event.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
                setNewProfileImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePicture = () => {
        // In a real application, you would upload the file to the server here.
        // Assuming the upload is successful:
        showToast('Profile picture updated successfully!', 'success');
        // Update the navbar image if BoNavbar supports passing props for the image
        setNewProfileImageFile(null);
    };

    const handleProfileFormSubmit = (e) => {
        e.preventDefault();
        const newName = fullName.trim();

        if (!newName) {
            showToast('Full name cannot be empty.', 'error');
            return;
        }

        // Simulate API call to save profile details
        console.log('Saving profile details...');
        setTimeout(() => {
            showToast('Profile details saved successfully!', 'success');
            // You might need to update the navbar user name via context or props
        }, 1500);
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div id="main-content" className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
                <BoNavbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} fullName={fullName} profileImage={profileImage} headerTitle="My Profile" />
                <main className="p-6 sm:p-8">
                    {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Update your profile information.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column: Profile Picture */}
                            <div className="md:col-span-1">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Profile Picture</h3>
                                    <div className="relative w-32 h-32 mx-auto">
                                        <img id="profile-image-preview" src={profileImage} alt="Profile Picture" className="w-32 h-32 rounded-full object-cover shadow-lg" onError={e => e.target.src = 'https://placehold.co/40x40/0d9488/ffffff?text=A'} />
                                        <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary-dark transition-colors">
                                            <i className="ri-camera-line"></i>
                                            <input type="file" id="profile-image-upload" className="hidden" accept="image/jpeg, image/png" onChange={handleProfileImageChange} />
                                        </label>
                                    </div>
                                    {newProfileImageFile && (
                                        <button onClick={handleSavePicture} className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Save Picture</button>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG or PNG. Max size of 2MB.</p>
                                </div>
                            </div>

                            {/* Right Column: Profile Details */}
                            <div className="md:col-span-2">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Account Details</h3>
                                    </div>
                                    <form onSubmit={handleProfileFormSubmit} className="p-6 space-y-4">
                                        <div>
                                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                            <input
                                                type="text"
                                                id="full-name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                            <input type="email" id="email" value="fikri.nabil@example.com" disabled className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700/50 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                                            <input type="text" id="role" value="Super Admin" disabled className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700/50 cursor-not-allowed" />
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

export default BoMyProfile;