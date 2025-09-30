import { useState } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import Toast from '../../../components/common/Toast';
import SignaturePadComponent from '../../../components/common/SignaturePadComponent';

const MyProfile = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [fullName, setFullName] = useState('Fikri Nabil');
    const [toast, setToast] = useState({ message: '', type: '', show: false });
    const [userSignature, setUserSignature] = useState(null);
    const [userRole, setUserRole] = useState('Signatory');
    const [activeTab, setActiveTab] = useState('draw');
    const [uploadedSignature, setUploadedSignature] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const showToast = (message, type) => {
        setToast({ message, type, show: true });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
            showToast('File is too large. Max 1MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setUploadedSignature(event.target.result);
            setUploadedFileName(file.name);
        };
        reader.readAsDataURL(file);
    };

    const removeUploadedImage = () => {
        setUploadedSignature(null);
        setUploadedFileName('');
    };

    const handleSaveUploadedSignature = () => {
        if (!uploadedSignature) {
            showToast("Please upload an image first.", "error");
            return;
        }
        handleSignatureSave(uploadedSignature);
    };

    const handleSignatureSave = (signatureData) => {
        setUserSignature(signatureData);
        showToast('Signature saved to profile!', 'success');
    };

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    };

    const handleProfileFormSubmit = (e) => {
        e.preventDefault();
        const newName = fullName.trim();

        if (!newName) {
            showToast('Full name cannot be empty.', 'error');
            return;
        }

        // Simulate API call to save profile details
        console.log('Saving profile details...', {
            fullName: newName,
            signature: userSignature
        });
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
                <DashboardNavbar onSidebarToggle={toggleSidebar} fullName={fullName} theme={theme} onThemeToggle={onThemeToggle} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Update your profile information and signature.</p>
                        </div>
                        <div className="space-y-8">
                                {/* Account Details Section */}
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
                                            <select
                                                id="role"
                                                value={userRole}
                                                onChange={handleRoleChange}
                                                className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-700"
                                            >
                                                <option value="Super Admin">Super Admin</option>
                                                <option value="Signatory">Signatory</option>
                                                <option value="Creator">Creator</option>
                                            </select>
                                        </div>
                                        <div className="pt-2 text-right">
                                            <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">Save Changes</button>
                                        </div>
                                    </form>
                                </div>

                            {/* Digital Signature Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                   <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Your Signature</h3>
                                </div>
                                <div className="px-6 border-b border-gray-200 dark:border-gray-700">
                                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                        <button
                                            onClick={() => setActiveTab('draw')}
                                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'draw' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
                                        >
                                            <i className="ri-pencil-line mr-1"></i>Draw Signature
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('upload')}
                                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'upload' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
                                        >
                                            <i className="ri-upload-2-line mr-1"></i>Upload Image
                                        </button>
                                    </nav>
                                </div>
                                <div className="p-6">
                                    {activeTab === 'draw' && (
                                        <SignaturePadComponent
                                            role={userRole}
                                            onSignatureSave={handleSignatureSave}
                                        />
                                    )}
                                    {activeTab === 'upload' && (
                                        <div className="w-full max-w-xl mx-auto">
                                            <label htmlFor="signature-image-upload" className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <i className="ri-upload-cloud-2-line text-4xl text-gray-500 dark:text-gray-400"></i>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (Max. 1MB)</p>
                                                </div>
                                                <input id="signature-image-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                                            </label>
                                            {uploadedSignature && (
                                                <div className="mt-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <img src={uploadedSignature} alt="Uploaded Signature" className="h-12 w-auto bg-white dark:bg-gray-100 p-1 rounded" />
                                                            <span className="text-sm text-gray-700 dark:text-gray-200">{uploadedFileName}</span>
                                                        </div>
                                                        <button onClick={removeUploadedImage} type="button" className="text-red-500 hover:text-red-700"><i className="ri-delete-bin-line"></i></button>
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">For best results, use a PNG image with a transparent background.</p>
                                            <div className="flex items-center justify-end mt-6">
                                                <button type="button" onClick={handleSaveUploadedSignature} className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">Save Signature</button>
                                            </div>
                                        </div>
                                    )}
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
