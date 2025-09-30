import React, { useState, useMemo, useEffect } from 'react';
import StudentNavbar from '../../../components/mywall/StudentNavbar';
import CertificateCard from '../../../components/mywall/CertificateCard';
import CertificateModal from '../../../components/mywall/CertificateModal';
import UploadCertificateModal from '../../../components/mywall/UploadCertificateModal';
import { studentCertificates } from '../../../data/certificateData'; 
import Toast from '../../../components/mywall/Toast';


const StudentWallFilters = ({ onFilterChange, onUploadClick }) => {
    
    return (
        <div className="max-w-4xl mx-auto mb-12">
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><i className="ri-search-line text-primary-mywall-200"></i></div>
                <input type="text" placeholder="Search for a certificate by title..." onChange={e => onFilterChange(prev => ({ ...prev, search: e.target.value }))} className="w-full pl-12 pr-4 py-3 bg-white/20 text-white placeholder-primary-mywall-200 rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all"/>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <select onChange={e => onFilterChange(prev => ({ ...prev, source: e.target.value }))} className="w-full px-4 py-3 bg-white/20 text-primary-mywall-200 rounded-full border-2 border-transparent focus:border-primary-mywall-300 focus:bg-white/30 focus:outline-none transition-all appearance-none">
                        <option value="all" className="text-black">All Sources</option>
                        <option value="mysertifico" className="text-black">MySertifico</option>
                        <option value="external" className="text-black">External</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><i className="ri-arrow-down-s-line text-primary-mywall-200"></i></div>
                </div>
                <button onClick={onUploadClick} className="bg-accent-mywall hover:bg-accent-mywall-hover text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2">
                    <i className="ri-upload-cloud-2-line"></i><span>Upload External Certificate</span>
                </button>
            </div>
        </div>
    );
};

// pagination controls
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex items-center justify-center pt-12 mt-8" aria-label="Pagination">
            <ul className="inline-flex items-center -space-x-px text-sm">
                <li>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-primary-mywall-200 bg-white/10 border border-primary-mywall-800/50 rounded-l-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => onPageChange(number)} className={`flex items-center justify-center px-3 h-8 leading-tight border border-primary-mywall-800/50 ${currentPage === number ? 'z-10 text-white bg-primary-mywall' : 'text-primary-mywall-200 bg-white/10 hover:bg-white/20 hover:text-white'}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 leading-tight text-primary-mywall-200 bg-white/10 border border-primary-mywall-800/50 rounded-r-lg hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

// The main page component
const StudentWallPage = () => {
    const [allCerts, setAllCerts] = useState(studentCertificates);
    const [filters, setFilters] = useState({ search: '', source: 'all' });
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [viewingCert, setViewingCert] = useState(null);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [currentPage, setCurrentPage] = useState(1); // state for pagination
    const itemsPerPage = 8; // Set items per page

    useEffect(() => {
        const isModalOpen = !!viewingCert || isUploadModalOpen;
        document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [viewingCert, isUploadModalOpen]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const filteredCerts = useMemo(() => {
        setCurrentPage(1); // Reset to first page on any filter change
        return allCerts.filter(cert => {
            const searchMatch = cert.title.toLowerCase().includes(filters.search.toLowerCase());
            const sourceMatch = filters.source === 'all' || cert.source === filters.source;
            return searchMatch && sourceMatch;
        });
    }, [allCerts, filters]);

    // Calculate paginated certs and total pages
    const paginatedCerts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCerts.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredCerts]);
    
    const totalPages = Math.ceil(filteredCerts.length / itemsPerPage);

    const handleSelect = (certId) => {
        const newSelection = new Set(selectedIds);
        if (newSelection.has(certId)) newSelection.delete(certId);
        else newSelection.add(certId);
        setSelectedIds(newSelection);
    };

    const handleDownload = (cert) => {
        showToast(`Downloading "${cert.title}"...`, 'info');
    };

    const handleUpload = (formData, file) => {
        const newCert = {
            id: `cert-${Date.now()}`,
            ...formData,
            owner: 'Nabil Taufik',
            source: 'external',
            image: URL.createObjectURL(file),
            verified: false,
        };
        setAllCerts(prevCerts => [newCert, ...prevCerts]);
        showToast(`Certificate "${formData.title}" uploaded successfully!`, 'success');
        setCurrentPage(1); // Go to first page to see the new cert
    };
    
    const handleClearSelection = () => setSelectedIds(new Set());

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white min-h-screen">
            <StudentNavbar />
            <main className="pt-24 pb-12">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">MyWall Showcase</h1>
                            <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">A personal gallery of your achievements and qualifications. Find, filter, and share your certificates below.</p>
                        </div>

                        <StudentWallFilters
                            onFilterChange={setFilters}
                            onUploadClick={() => setUploadModalOpen(true)}
                        />

                        {paginatedCerts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {paginatedCerts.map(cert => (
                                    <CertificateCard
                                        key={cert.id}
                                        cert={cert}
                                        isSelected={selectedIds.has(cert.id)}
                                        onSelect={handleSelect}
                                        onView={setViewingCert}
                                        onDownload={handleDownload}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-primary-mywall-200 py-10">
                                <i className="ri-search-eye-line text-4xl mb-4 text-primary-mywall-300"></i>
                                <h3 className="text-xl font-semibold text-white">No Certificates Found</h3>
                                <p>Try adjusting your search or filter settings.</p>
                            </div>
                        )}
                        
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
            </main>

            {selectedIds.size > 0 && (
                 <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center gap-2 z-40">
                    <span className="text-white font-semibold px-4">{selectedIds.size} selected</span>
                    <button className="px-4 py-2 bg-primary-mywall text-white rounded-full hover:bg-primary-mywall-600 transition-colors flex items-center gap-2"><i className="ri-add-box-line"></i> Create Collection</button>
                    <button onClick={handleClearSelection} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"><i className="ri-close-line text-2xl"></i></button>
                </div>
            )}

            <CertificateModal
                isOpen={!!viewingCert}
                onClose={() => setViewingCert(null)}
                cert={viewingCert}
                showToast={showToast} 
            />

            <UploadCertificateModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setUploadModalOpen(false)} 
                onUpload={handleUpload} />

            <Toast 
                message={toast.message} 
                type={toast.type} 
                show={toast.show} 
                onClose={() => setToast({ ...toast, show: false })} />
        </div>
    );
};

export default StudentWallPage;