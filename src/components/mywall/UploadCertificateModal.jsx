import React, { useState } from 'react';

const UploadCertificateModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        onUpload(data, file);
        onClose(); // Close modal after submission
    };

    return (
        <div className="modal fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-panel relative bg-white/10 border border-primary-mywall-500/50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-primary-mywall-800/50 flex-shrink-0">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <i className="ri-upload-cloud-2-line"></i> Upload New Certificate
                    </h3>
                    <button type="button" className="modal-close-button text-primary-mywall-200 hover:text-white text-2xl" onClick={onClose}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
                    <div className="p-6 flex-grow overflow-auto space-y-4">
                        <div>
                            <label htmlFor="upload-for" className="block text-sm font-medium text-primary-mywall-200 mb-1">Upload For</label>
                            <select id="upload-for" name="owner" required className="custom-select w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all">
                                <option value="parent">My Certificates (Parent)</option>
                                <option value="ali">Ali bin Ahmad</option>
                                <option value="siti">Siti binti Ahmad</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="upload-title" className="block text-sm font-medium text-primary-mywall-200 mb-1">Certificate Title</label>
                            <input type="text" id="upload-title" name="title" required className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label htmlFor="upload-issuer" className="block text-sm font-medium text-primary-mywall-200 mb-1">Issuing Body</label>
                            <input type="text" id="upload-issuer" name="issuer" required className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all" />
                        </div>
                        <div>
                            <label htmlFor="upload-date" className="block text-sm font-medium text-primary-mywall-200 mb-1">Date Issued</label>
                            <input type="date" id="upload-date" name="date" required className="w-full px-4 py-2 bg-white/20 text-white placeholder-primary-mywall-200 rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all" style={{ colorScheme: 'dark' }} />
                        </div>
                        <div>
                            <label htmlFor="upload-category" className="block text-sm font-medium text-primary-mywall-200 mb-1">Category</label>
                            <select id="upload-category" name="category" required className="custom-select w-full px-4 py-2 bg-white/20 text-white rounded-lg border-2 border-transparent focus:border-primary-mywall-300 focus:bg-primary-mywall-900/80 focus:outline-none transition-all">
                                <option value="academic">Academic Certificates</option>
                                <option value="co-curricular">Co-Curricular / Extracurricular</option>
                                <option value="sports-athletic">Sports & Athletic</option>
                                <option value="competition">Competition</option>
                                <option value="special-awards">Special Awards</option>
                                <option value="service-leadership">Service & Leadership</option>
                                <option value="attendance-conduct">Attendance & Conduct</option>
                                <option value="special-programs">Special Programs & Projects</option>
                                <option value="general-appreciation">General Appreciation</option>
                                <option value="technology">Technology</option>
                                <option value="management">Management</option>
                                <option value="design">Design</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary-mywall-200 mb-1">Certificate File (PDF, JPG, PNG)</label>
                            <div className="drop-zone w-full p-6 text-center rounded-lg cursor-pointer border-2 border-dashed border-white/40" onClick={() => document.getElementById('file-input').click()}>
                                <i className="ri-file-upload-line text-4xl text-primary-mywall-300"></i>
                                <p className="mt-2 text-primary-mywall-200">Drag & drop file here, or <span className="font-bold text-accent-mywall">click to browse</span></p>
                                {file && <p className="text-sm text-white mt-2">{file.name}</p>}
                            </div>
                            <input type="file" id="file-input" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="p-4 flex justify-end items-center gap-4 border-t border-primary-mywall-800/50 flex-shrink-0">
                        <button type="button" className="modal-close-button px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-accent-mywall text-white font-semibold rounded-lg hover:bg-accent-mywall-hover transition-colors">Upload Certificate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadCertificateModal;