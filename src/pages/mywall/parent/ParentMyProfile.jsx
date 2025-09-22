import React, { useState, useRef } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import Toast from '../../../components/mywall/Toast';
import { NavLink } from 'react-router-dom';
import defaultAvatar from '../../../assets/images/users/aliyah.png';

const ParentMyProfile = () => {
    // State to manage the visibility of the change password modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for the toast notification
    const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });

    // State to manage the avatar image source
    const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);

    // State for the password form fields
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    // State to toggle password visibility in the modal
    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    
    // A ref to access the hidden file input element for the profile picture
    const fileInputRef = useRef(null);

    // --- Event Handlers ---

    /**
     * Shows a toast notification for a few seconds.
     * @param {string} message - The message to display.
     * @param {string} type - 'success' or 'error'.
     */
    const showToast = (message, type = 'success') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => {
            setToast({ message: '', type: 'success', isVisible: false });
        }, 3000);
    };

    /**
     * Triggers the hidden file input when the camera button is clicked.
     */
    const handleChangePictureClick = () => {
        fileInputRef.current.click();
    };

    /**
     * Handles the file selection, reads the image, and updates the avatar state.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarSrc(e.target.result);
                showToast('Profile picture updated!');
            };
            reader.readAsDataURL(file);
        }
    };
    
    /**
     * Toggles the visibility of a password field.
     * @param {'current' | 'new' | 'confirm'} field - The password field to toggle.
     */
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    /**
     * Updates the passwordData state as the user types in the form.
     */
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    /**
     * Handles the submission of the change password form.
     */
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const correctCurrentPassword = "password123"; // Dummy password for simulation

        if (passwordData.current !== correctCurrentPassword) {
            showToast("Current password is incorrect.", "error");
            return;
        }

        if (passwordData.new !== passwordData.confirm) {
            showToast("New passwords do not match.", "error");
            return;
        }

        showToast('Password updated successfully!');
        setIsModalOpen(false); // Close modal on success
        setPasswordData({ current: '', new: '', confirm: '' }); // Reset form
    };

    // --- Render ---

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white flex flex-col min-h-screen">
            <MyWallNavbar />

            {/* Main Profile Content */}
            <main className="pt-24 pb-12 flex-grow">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                            
                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 mb-6 border-b border-primary-mywall-800/50">
                                <div className="relative flex-shrink-0">
                                    <img 
                                        src={avatarSrc}
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/134E4A/FFFFFF?text=A'; }}
                                        alt="User Avatar" 
                                        className="w-28 h-28 rounded-full border-4 border-primary-mywall-400 shadow-md user-avatar-img" 
                                    />
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileChange}
                                        className="hidden" 
                                        accept="image/*" 
                                    />
                                    <button 
                                        onClick={handleChangePictureClick}
                                        className="absolute bottom-0 right-0 bg-accent-mywall text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent-mywall-hover transition-transform hover:scale-110" 
                                        title="Change Picture"
                                    >
                                        <i className="ri-camera-line"></i>
                                    </button>
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h1 className="text-3xl font-bold font-poppins text-white">Aliyah Zawaton binti Muhammad</h1>
                                    <p className="text-lg text-primary-mywall-200 mt-1"><span className="font-semibold text-primary-mywall-300">National ID:</span> 750101-10-1234</p>
                                </div>
                                <div className="flex-shrink-0 mt-4 sm:mt-0">
                                    <NavLink 
                                        to="/mywall/parent-edit-profile" 
                                        className="bg-primary-mywall hover:bg-primary-mywall-600 text-white font-semibold py-2 px-5 rounded-full transition-colors flex items-center gap-2"
                                    >
                                        <i className="ri-pencil-line"></i>
                                        <span>Edit Profile</span>
                                    </NavLink>
                                </div>
                            </div>

                            {/* About Me Section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-primary-mywall-300 mb-2">About Me</h3>
                                <p className="text-white leading-relaxed">
                                    A dedicated parent and professional with a background in accounting. Passionate about supporting my children's educational journey and managing our family's digital achievements.
                                </p>
                            </div>

                            {/* Personal Details, Skills & Links Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Personal Details */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-primary-mywall-300 border-b border-primary-mywall-700/50 pb-2">Personal Details</h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-primary-mywall-300">Country</label>
                                        <p className="text-lg text-white flex items-center gap-2">
                                            <span className="text-2xl">🇲🇾</span> Malaysia
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-primary-mywall-300">Email Address</label>
                                        <p className="text-lg text-white">aliyah.zawaton@email.com</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-primary-mywall-300">Phone Number</label>
                                        <p className="text-lg text-white">012-3456789</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-primary-mywall-300">Address</label>
                                        <p className="text-lg text-white">No. 123, Jalan Seri Utama, Taman Saujana, Sungai Buloh, Selangor</p>
                                    </div>
                                </div>
                                
                                {/* Right Column: Skills & Links */}
                                <div className="space-y-6">
                                    {/* Skills */}
                                    <div>
                                        <h3 className="text-xl font-bold text-primary-mywall-300 border-b border-primary-mywall-700/50 pb-2 mb-3">Skills</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="bg-primary-mywall-700/50 text-primary-mywall-100 text-sm font-medium px-3 py-1 rounded-full">Financial Planning</span>
                                            <span className="bg-primary-mywall-700/50 text-primary-mywall-100 text-sm font-medium px-3 py-1 rounded-full">Accounting</span>
                                            <span className="bg-primary-mywall-700/50 text-primary-mywall-100 text-sm font-medium px-3 py-1 rounded-full">Microsoft Office</span>
                                        </div>
                                    </div>
                                    {/* Links */}
                                    <div>
                                        <h3 className="text-xl font-bold text-primary-mywall-300 border-b border-primary-mywall-700/50 pb-2 mb-3">Links</h3>
                                        <div className="flex flex-wrap gap-4">
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-mywall-200 hover:text-white"><i className="ri-linkedin-box-fill text-2xl"></i> LinkedIn</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="border-t border-primary-mywall-800/50 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <NavLink 
                                    to="/mywall/parent-resume" 
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <i className="ri-download-2-line"></i>
                                    <span>Download As Resume</span>
                                </NavLink>
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full sm:w-auto text-primary-mywall-200 font-semibold hover:text-white transition-colors py-3 px-6"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Change Password Modal */}
            {isModalOpen && (
                <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div 
                        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)} // Close modal on backdrop click
                    ></div>
                    <div className="modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><i className="ri-lock-password-line"></i> Change Password</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="modal-close-button text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button>
                            </div>
                            <div className="p-6 flex-grow overflow-auto space-y-4">
                                {/* Current Password */}
                                <div className="relative">
                                    <label htmlFor="current-password" className="block text-sm font-medium text-primary-mywall-200 mb-1">Current Password</label>
                                    <input 
                                        type={passwordVisibility.current ? 'text' : 'password'}
                                        id="current-password" 
                                        name="current"
                                        value={passwordData.current}
                                        onChange={handlePasswordInputChange}
                                        required 
                                        className="w-full pl-4 pr-10 py-2 bg-white/20 text-white placeholder:text-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                    />
                                    <button type="button" onClick={() => togglePasswordVisibility('current')} className="password-toggle absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-primary-mywall-200 hover:text-white">
                                        <i className={passwordVisibility.current ? 'ri-eye-off-line text-xl' : 'ri-eye-line text-xl'}></i>
                                    </button>
                                </div>
                                {/* New Password */}
                                <div className="relative">
                                    <label htmlFor="new-password" className="block text-sm font-medium text-primary-mywall-200 mb-1">New Password</label>
                                    <input 
                                        type={passwordVisibility.new ? 'text' : 'password'}
                                        id="new-password" 
                                        name="new" 
                                        value={passwordData.new}
                                        onChange={handlePasswordInputChange}
                                        required 
                                        className="w-full pl-4 pr-10 py-2 bg-white/20 text-white placeholder:text-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                    />
                                    <button type="button" onClick={() => togglePasswordVisibility('new')} className="password-toggle absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-primary-mywall-200 hover:text-white">
                                        <i className={passwordVisibility.new ? 'ri-eye-off-line text-xl' : 'ri-eye-line text-xl'}></i>
                                    </button>
                                </div>
                                {/* Confirm New Password */}
                                <div className="relative">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-primary-mywall-200 mb-1">Confirm New Password</label>
                                    <input 
                                        type={passwordVisibility.confirm ? 'text' : 'password'}
                                        id="confirm-password" 
                                        name="confirm" 
                                        value={passwordData.confirm}
                                        onChange={handlePasswordInputChange}
                                        required 
                                        className="w-full pl-4 pr-10 py-2 bg-white/20 text-white placeholder:text-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"
                                    />
                                    <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="password-toggle absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-primary-mywall-200 hover:text-white">
                                        <i className={passwordVisibility.confirm ? 'ri-eye-off-line text-xl' : 'ri-eye-line text-xl'}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="modal-close-button px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover transition-colors">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Toast Component */}
            <Toast
                message={toast.message}
                show={toast.isVisible} 
                isError={toast.type === 'error'}
            />
        </div>
    );
};

export default ParentMyProfile;