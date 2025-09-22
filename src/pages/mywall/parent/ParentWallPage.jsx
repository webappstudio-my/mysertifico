import React, { useState, useMemo } from 'react';
import MyWallNavbar from '../../../components/mywall/MyWallNavbar';
import WallFilters from '../../../components/mywall/WallFilters';
import CertificateCard from '../../../components/mywall/CertificateCard';
import CertificateModal from '../../../components/mywall/CertificateModal';
import { certificates } from '../../../data/certificateData'; // Import static data

const ParentWallPage = () => {
    const [allCerts] = useState(certificates);
    const [filters, setFilters] = useState({ search: '', owner: 'all', category: 'all', source: 'all' });
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [viewingCert, setViewingCert] = useState(null);

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
        // In a real app, this would trigger a more complex PDF generation flow.
        // For this conversion, we'll simulate a download.
        alert(`Downloading "${cert.title}"...`);
        // The complex PDF generation logic from the original JS can be ported here
        // using a library like jsPDF and html2canvas, or by calling a server endpoint.
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
                            onUploadClick={() => alert('Opening upload modal...')}
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

            {/* Selection Bar would be rendered here, conditionally based on selectedIds.size > 0 */}
        </div>
    );
};

export default ParentWallPage;