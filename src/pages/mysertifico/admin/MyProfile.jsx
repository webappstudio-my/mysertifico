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

    const showToast = (message, type) => {
        setToast({ message, type, show: true });
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
                                <div className="p-6">
                                    <SignaturePadComponent
                                        role={userRole}
                                        onSignatureSave={handleSignatureSave}
                                    />
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