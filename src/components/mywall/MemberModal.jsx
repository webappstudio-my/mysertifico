import React, { useState, useEffect } from 'react';

const MemberModal = ({ isOpen, onClose, onSave, memberToEdit }) => {
    const [formData, setFormData] = useState({ id: null, name: '', nid: '', relation: 'Child' });
    const modalTitle = memberToEdit ? 'Edit Family Member' : 'Add Family Member';

    useEffect(() => {
        // Populate form when memberToEdit is provided, otherwise reset
        if (memberToEdit) {
            setFormData(memberToEdit);
        } else {
            setFormData({ id: null, name: '', nid: '', relation: 'Child' });
        }
    }, [memberToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50">
                        <h3 className="text-lg font-bold text-white">{modalTitle}</h3>
                        <button type="button" onClick={onClose} className="text-primary-mywall-200 hover:text-white text-2xl"><i className="ri-close-line"></i></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="member-name" className="block text-sm font-medium text-primary-mywall-200 mb-1">Full Name</label>
                            <input type="text" id="member-name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="member-nid" className="block text-sm font-medium text-primary-mywall-200 mb-1">National ID</label>
                            <input type="text" id="member-nid" name="nid" value={formData.nid} onChange={handleChange} required readOnly={!!memberToEdit} placeholder="e.g., 090315-10-1234" className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-300 focus:outline-none read-only:bg-white/10 read-only:cursor-not-allowed" />
                        </div>
                        <div>
                            <label htmlFor="member-relation" className="block text-sm font-medium text-primary-mywall-200 mb-1">Relationship</label>
                            <select id="member-relation" name="relation" value={formData.relation} onChange={handleChange} required className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none appearance-none" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="%2399f6e4"%3E%3Cpath d="M12 16L6 10H18L12 16Z"%3E%3C/path%3E%3C/svg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.2em' }}>
                                <option value="Child">Child</option>
                                <option value="Spouse">Spouse</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover">Save Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberModal;