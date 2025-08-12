import React, { useState, useEffect, useRef } from 'react';

const BoAddUserModal = ({ isOpen, onClose, onAddUser }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const modalPanelRef = useRef(null);

    // Reset form fields and error when modal opens
    useEffect(() => {
        if (isOpen) {
            setFullName('');
            setEmail('');
            setRole('');
            setStatus('');
            setError('');
        }
    }, [isOpen]);

    // Handle clicks outside the modal to close it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && modalPanelRef.current && !modalPanelRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!fullName || !email || !role || !status) {
            setError('Please fill in all fields.');
            return;
        }

        // Basic email validation
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        onAddUser({ fullName, email, role, status });
        onClose(); // Close modal after successful submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div ref={modalPanelRef} className="bg-bo-surface-light dark:bg-bo-surface-dark rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-200 ease-out">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">Add New Staff User</h3>
                        <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-white" onClick={onClose}>
                            <i className="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="new-user-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                id="new-user-name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="new-user-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                id="new-user-email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="new-user-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                            <select
                                id="new-user-role"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white pr-10"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                id="status"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3 rounded-b-2xl">
                        <button
                            type="button"
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoAddUserModal;
