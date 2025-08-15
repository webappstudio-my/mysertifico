//src/components/bo/BoTemplateAddEditModal.jsx
import React from 'react';
import { useState, useEffect } from 'react';

const BoTemplateAddEditModal = ({ isOpen, onClose, onSave, template, onPreview }) => {
    const [formData, setFormData] = useState({ 
        title: '', 
        style: '', 
        orientation: '', 
        color: '',
        alignment: '',
        blankoImage: null,
        blankoImageUrl: ''
    });
    
    const [errors, setErrors] = useState({
        file: false,
        fields: false
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState('');
    
    const isEditing = template !== null;

    useEffect(() => {
        if (isEditing && template) {
            setFormData({ 
                title: template.title || '', 
                style: template.style || '', 
                orientation: template.orientation || '',
                color: template.color || '',
                alignment: template.alignment || '',
                blankoImage: null,
                blankoImageUrl: template.thumb || ''
            });
            setImagePreview(template.thumb || null);
            setFileName('Current blanko image');
        } else {
            setFormData({ 
                title: '', 
                style: '', 
                orientation: '', 
                color: '',
                alignment: '',
                blankoImage: null,
                blankoImageUrl: ''
            });
            setImagePreview(null);
            setFileName('');
        }
        setErrors({ file: false, fields: false });
    }, [template, isOpen, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors when user starts typing
        setErrors(prev => ({ ...prev, fields: false }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'image/svg+xml') {
                setErrors(prev => ({ ...prev, file: 'Only SVG files are allowed.' }));
                e.target.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
                setFileName(file.name);
                setFormData(prev => ({ 
                    ...prev, 
                    blankoImage: file,
                    blankoImageUrl: event.target.result 
                }));
                setErrors(prev => ({ ...prev, file: false }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFileName('');
        setFormData(prev => ({ 
            ...prev, 
            blankoImage: null,
            blankoImageUrl: '' 
        }));
        // Reset file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
                setFileName(file.name);
                setFormData(prev => ({ 
                    ...prev, 
                    blankoImage: file,
                    blankoImageUrl: event.target.result 
                }));
                setErrors(prev => ({ ...prev, file: false }));
            };
            reader.readAsDataURL(file);
        } else {
            setErrors(prev => ({ ...prev, file: 'Only SVG files are allowed.' }));
        }
    };

    const handlePreview = () => {
        // Validate before preview
        if (!imagePreview) {
            setErrors(prev => ({ ...prev, file: 'Please upload a blanko image to preview.' }));
            return;
        }
        if (!formData.orientation) {
            setErrors(prev => ({ ...prev, fields: 'Please select an orientation to preview.' }));
            return;
        }
        
        // Call preview with temporary template data
        if (onPreview) {
            const previewTemplate = {
                code: 'Live Preview',
                thumb: imagePreview,
                title: formData.title || 'Preview Template',
                style: formData.style || 'Classic',
                orientation: formData.orientation,
                color: formData.color || 'GOLD',
                alignment: formData.alignment || 'Centre',
                name: formData.title || 'Preview Certificate',
                organization: 'Sample Organization',
                template: `${formData.style || 'Classic'} Template`,
                dateIssued: new Date().toISOString().split('T')[0],
                status: 'Preview',
                recipient: 'Sample Recipient'
            };
            onPreview(previewTemplate);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Reset errors
        setErrors({ file: false, fields: false });
        
        // Validation
        let isValid = true;
        
        // Check for required file upload (only for new templates)
        if (!isEditing && !formData.blankoImage && !formData.blankoImageUrl) {
            setErrors(prev => ({ ...prev, file: 'Please upload a blanko image.' }));
            isValid = false;
        }
        
        // Check for required fields
        if (!formData.title || !formData.style || !formData.orientation || !formData.color || !formData.alignment) {
            setErrors(prev => ({ ...prev, fields: 'Please fill in all fields.' }));
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Generate template code
        const styleCode = formData.style === 'Classic' ? 'CL' : 'MD';
        const orientationCode = formData.orientation === 'Landscape' ? 'L' : 'P';
        const alignmentCode = formData.alignment === 'Centre' ? 'C' : formData.alignment === 'Left' ? 'L' : 'R';
        const colorCode = formData.color.substring(0, 4).toUpperCase();
        const randomNum = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        const templateCode = isEditing && template.code ? template.code : `${styleCode}${orientationCode}${alignmentCode}-${colorCode}-${randomNum}`;
        
        onSave({ 
            ...formData, 
            id: isEditing ? template.id : null,
            code: templateCode,
            thumb: formData.blankoImageUrl || template?.thumb
        });
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all my-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
                            {isEditing ? 'Edit Template' : 'Add New Template'}
                        </h3>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                        >
                            <i className="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Step 1: Upload Blanko & Template Code */}
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">Step 1: Upload Blanko</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Upload the base image for the certificate.</p>
                                
                                {!imagePreview ? (
                                    <div 
                                        className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg transition-colors"
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="space-y-1 text-center">
                                            <i className="ri-image-add-line text-5xl text-gray-400"></i>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label 
                                                    htmlFor="file-upload" 
                                                    className="relative cursor-pointer rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input 
                                                        id="file-upload" 
                                                        name="file-upload" 
                                                        type="file" 
                                                        className="sr-only" 
                                                        accept="image/svg+xml"
                                                        onChange={handleFileUpload}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">Only SVG files are allowed</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 text-center">
                                        <img 
                                            src={imagePreview} 
                                            alt="Image Preview" 
                                            className="max-h-48 mx-auto rounded-lg shadow-md"
                                        />
                                        <p className="mt-2 text-sm text-gray-500">{fileName}</p>
                                        <button 
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="mt-2 text-xs text-red-500 hover:underline"
                                        >
                                            Remove image
                                        </button>
                                    </div>
                                )}
                                
                                {errors.file && (
                                    <small className="text-red-500 mt-2 block">{errors.file}</small>
                                )}
                                
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Template Code
                                    </label>
                                    <input 
                                        type="text" 
                                        value={isEditing ? template?.code : 'Auto-generated on save'}
                                        className="mt-1 block w-full px-4 py-2.5 border border-gray-400 dark:border-gray-500 rounded-md shadow-sm bg-gray-200 dark:bg-gray-800/50 cursor-not-allowed"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Step 2: Template Details */}
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">Step 2: Define Properties</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Categorize and format the template.</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Template Title
                                        </label>
                                        <input 
                                            type="text" 
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 text-black dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700"
                                            placeholder="e.g. Modern Landscape Gold"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Style</label>
                                        <select 
                                            name="style"
                                            value={formData.style}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 text-black dark:text-white border  border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700"
                                        >
                                            <option value="">Select Style</option>
                                            <option value="Classic">Classic</option>
                                            <option value="Modern">Modern</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Orientation
                                        </label>
                                        <select 
                                            name="orientation"
                                            value={formData.orientation}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 text-black dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700"
                                        >
                                            <option value="">Select Orientation</option>
                                            <option value="Landscape">Landscape</option>
                                            <option value="Portrait">Portrait</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Default Object Alignment
                                        </label>
                                        <select 
                                            name="alignment"
                                            value={formData.alignment}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 text-black dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700"
                                        >
                                            <option value="">Select Alignment</option>
                                            <option value="Left">Left</option>
                                            <option value="Centre">Centre</option>
                                            <option value="Right">Right</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Theme Color
                                        </label>
                                        <select 
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 text-black dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700"
                                        >
                                            <option value="">Select Color</option>
                                            <option value="GOLD">Gold</option>
                                            <option value="BLUE">Blue</option>
                                            <option value="GREEN">Green</option>
                                            <option value="PURPLE">Purple</option>
                                            <option value="BROWN">Brown</option>
                                            <option value="BLACK">Black</option>
                                            <option value="RED">Red</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {errors.fields && (
                                    <small className="text-red-500 mt-2 block">{errors.fields}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={handlePreview}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                            <i className="ri-eye-line"></i>
                            <span>Preview</span>
                        </button>
                        <button 
                            type="submit"
                            className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            {isEditing ? 'Update Template' : 'Save Template'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoTemplateAddEditModal;