import React, { useState, useMemo, useEffect } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import WallFilters from '../../../components/mywall/WallFilters';
import CertificateCard from '../../../components/mywall/CertificateCard';
import CertificateModal from '../../../components/mywall/CertificateModal';
import UploadCertificateModal from '../../../components/mywall/UploadCertificateModal';
import { certificates } from '../../../data/certificateData'; // Import static data
import Toast from '../../../components/mywall/Toast'; // Import the Toast component

const ParentWallPage = () => {
    const [allCerts, setAllCerts] = useState(certificates);
    const [filters, setFilters] = useState({ search: '', owner: 'all', category: 'all', source: 'all' });
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [viewingCert, setViewingCert] = useState(null);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const isModalOpen = !!viewingCert || isUploadModalOpen;
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [viewingCert, isUploadModalOpen]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000); // Hide after 3 seconds
    };

    const filteredCerts = useMemo(() => {
        return allCerts.filter(cert => {
            const searchMatch = cert.title.toLowerCase().includes(filters.search.toLowerCase());
            const ownerMatch = filters.owner === 'all' || cert.owner === filters.owner;
            const categoryMatch = filters.category === 'all' || cert.category === filters.category;
            const sourceMatch = filters.source === 'all' || cert.source === filters.source;
            return searchMatch && ownerMatch && categoryMatch && sourceMatch;
        });
    }, [allCerts, filters]);

    const handleSelect = (certId) => {
        const newSelection = new Set(selectedIds);
        if (newSelection.has(certId)) {
            newSelection.delete(certId);
        } else {
            newSelection.add(certId);
        }
        setSelectedIds(newSelection);
    };

    const handleDownload = (cert) => {
        showToast(`Downloading "${cert.title}"...`, 'info');
    };

    const handleUpload = (formData, file) => {
        console.log('Uploading certificate:', { ...formData, fileName: file.name });
        // Here you would handle the actual file upload and data submission
        // For example, creating a new certificate object and adding it to the state:
        const newCert = {
            id: `cert-${Date.now()}`,
            ...formData,
            source: 'external',
            image: URL.createObjectURL(file), // Temporary URL for display
            verified: false,
        };
        setAllCerts(prevCerts => [newCert, ...prevCerts]);
        showToast(`Certificate "${formData.title}" uploaded successfully!`, 'success');
    };

    return (
        <div className="bg-gradient-to-br from-primary-mywall-900 to-primary-mywall text-white min-h-screen">
            <MyWallNavbar />
            <main className="pt-24 pb-12">
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">Family Wall Showcase</h1>
                            <p className="text-lg text-primary-mywall-200 mt-4 max-w-3xl mx-auto">
                                Manage and view certificates for yourself and your children.
                            </p>
                        </div>

                        <WallFilters
                            filters={filters}
                            onFilterChange={setFilters}
                            onUploadClick={() => setUploadModalOpen(true)}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredCerts.length > 0 ? (
                                filteredCerts.map(cert => (
                                    <CertificateCard
                                        key={cert.id}
                                        cert={cert}
                                        isSelected={selectedIds.has(cert.id)}
                                        onSelect={handleSelect}
                                        onView={setViewingCert}
                                        onDownload={handleDownload}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-primary-mywall-200 py-10">
                                    <i className="ri-search-eye-line text-4xl mb-4 text-primary-mywall-300"></i>
                                    <h3 className="text-xl font-semibold text-white">No Certificates Found</h3>
                                    <p>Try adjusting your search or filter settings.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <CertificateModal
                isOpen={!!viewingCert}
                onClose={() => setViewingCert(null)}
                cert={viewingCert}
            />

            <UploadCertificateModal
                isOpen={isUploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUpload={handleUpload}
            />

            <Toast
                message={toast.message}
                type={toast.type}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />

            {/* Selection Bar would be rendered here, conditionally based on selectedIds.size > 0 */}
        </div>
    );
};

export default ParentWallPage;