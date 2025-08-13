//src/components/bo/BoTemplateAddEditModal.jsx
import React from 'react';
import { useState, useEffect } from 'react';

const BoTemplateAddEditModal = ({ isOpen, onClose, onSave, template }) => {
    const [formData, setFormData] = useState({ 
        title: '', 
        style: 'Classic', 
        orientation: 'Landscape', 
        color: 'GOLD',
        alignment: 'Centre'
    });
    const isEditing = template !== null;

    useEffect(() => {
        if (isEditing && template) {
            setFormData({ 
                title: template.title, 
                style: template.style, 
                orientation: template.orientation,
                color: template.color,
                alignment: template.alignment
            });
        } else {
            setFormData({ 
                title: '', 
                style: 'Classic', 
                orientation: 'Landscape', 
                color: 'GOLD',
                alignment: 'Centre'
            });
        }
    }, [template, isOpen, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: isEditing ? template.id : null });
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{isEditing ? 'Edit Template' : 'Add New Template'}</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><i className="ri-close-line text-2xl"></i></button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Style</label>
                        <select name="style" value={formData.style} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>Classic</option>
                            <option>Modern</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orientation</label>
                        <select name="orientation" value={formData.orientation} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>Landscape</option>
                            <option>Portrait</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme Color</label>
                        <select name="color" value={formData.color} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="GOLD">Gold</option>
                            <option value="BLUE">Blue</option>
                            <option value="GREEN">Green</option>
                            <option value="PURPLE">Purple</option>
                            <option value="BROWN">Brown</option>
                            <option value="BLACK">Black</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Alignment</label>
                        <select name="alignment" value={formData.alignment} onChange={handleChange} className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option value="Left">Left</option>
                            <option value="Centre">Centre</option>
                            <option value="Right">Right</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700">Save Template</button>
                </div>
            </form>
        </div>
    );
};

export default BoTemplateAddEditModal;