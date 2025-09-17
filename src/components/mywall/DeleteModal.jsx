import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, memberToDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-6 text-center">
                    <div className="text-5xl text-red-400 mb-4"><i className="ri-error-warning-line"></i></div>
                    <h3 className="text-lg font-bold text-white">Are you sure?</h3>
                    <p className="text-sm text-primary-mywall-200 mt-2">
                        Do you really want to remove <strong>{memberToDelete?.name}</strong>? This action cannot be undone.
                    </p>
                </div>
                <div className="p-4 flex justify-center items-center gap-4 border-t border-primary-mywall-800/50 bg-white/5">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Cancel</button>
                    <button type="button" onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;