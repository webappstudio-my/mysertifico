import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';
import BoPagination from '../../components/bo/BoPagination';
import BoSearchInput from '../../components/bo/BoSearchInput';

const BoViewCertificateBatch = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock certificate data - in real app, this would come from API based on ID
    const certificateInfo = {
        id: 'cert001',
        name: 'Sijil Graduasi 2025',
        creator: 'Fikri Nabil',
        createdDate: '31-12-2025',
        status: 'pending',
        description: 'Certificate for graduation ceremony 2025',
        template: 'Graduation Template v2',
        totalRecipients: 127
    };


    // Mock recipients data - updated to match the image format
    const recipientsData = [
        { id: 1, name: 'Recipient 1', nationalId: '000101-10-0001' },
        { id: 2, name: 'Recipient 2', nationalId: '000101-10-0002' },
        { id: 3, name: 'Recipient 3', nationalId: '000101-10-0003' },
        { id: 4, name: 'Recipient 4', nationalId: '000101-10-0004' },
        { id: 5, name: 'Recipient 5', nationalId: '000101-10-0005' },
        { id: 6, name: 'Recipient 6', nationalId: '000101-10-0006' },
        { id: 7, name: 'Recipient 7', nationalId: '000101-10-0007' },
        { id: 8, name: 'Recipient 8', nationalId: '000101-10-0008' },
        { id: 9, name: 'Recipient 9', nationalId: '000101-10-0009' },
        { id: 10, name: 'Recipient 10', nationalId: '000101-10-0010' },
        { id: 11, name: 'Recipient 11', nationalId: '000101-10-0011' },
        { id: 12, name: 'Recipient 12', nationalId: '000101-10-0012' }
    ];

    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        sent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };

    // Filter logic - simplified for name and national ID search
    const filteredData = recipientsData.filter(recipient => {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = recipient.name.toLowerCase().includes(query);
        const nationalIdMatch = recipient.nationalId.toLowerCase().includes(query);
        return nameMatch || nationalIdMatch;
    });

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    const handleSearch = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <BoSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                onClick={closeSidebar}></div>
            )}
            
            {/* Main Content */}
            <div className={`relative min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Navbar */}
                <BoNavbar onSidebarToggle={toggleSidebar} headerTitle="Certificate Details" />
                
                {/* Page Content */}
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Back to Certificate List */}
                        <div className="mb-4">
                            <Link to="/admin/certificate-list" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                                <i className="ri-arrow-left-line mr-1"></i>
                                Back to Certificate List
                            </Link>
                        </div>

                        {/* Certificate Preview Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Certificate Preview */}
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Certificate Preview</h2>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
                                        <div className="flex items-center justify-center">
                                            <img 
                                                src="/src/images/templates/ms-grad-ml-black-gold-001.svg"
                                                alt="Certificate template preview"
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = '/src/assets/images/templates/ms-grad-ml-black-gold-001.svg';
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details & Actions */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Details & Actions</h2>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{certificateInfo.name}</h3>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full">
                                                {certificateInfo.status}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Creator:</span>
                                            <span className="ml-2 text-sm text-gray-800 dark:text-white">{certificateInfo.creator}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Created Date:</span>
                                            <span className="ml-2 text-sm text-gray-800 dark:text-white">{certificateInfo.createdDate}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Recipients:</span>
                                            <span className="ml-2 text-sm text-gray-800 dark:text-white">{certificateInfo.totalRecipients}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Divider Line*/}
                                    <hr className="border-gray-200 dark:border-gray-600 mb-6" />                          

                                    <div className="space-y-3">
                                        <button 
                                            id="download-batch-button" 
                                            className="w-full flex items-center justify-center px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                                            disabled={certificateInfo.status !== 'approved' && certificateInfo.status !== 'completed'}
                                        >
                                            <span className="btn-text">
                                            <i className="ri-download-2-line mr-2"></i>Download Batch PDF
                                            </span>
                                            <span className="loader hidden"></span>
                                        </button>

                                        {(certificateInfo.status !== 'approved' && certificateInfo.status !== 'completed') && (
                                            <p className="text-xs text-center text-red-500 mt-2">
                                            Download is only available for approved or completed certificates.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                            {/* Recipient List Section */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recipient List</h2>
                            </div>
                            <div className="mb-4">
                                <BoSearchInput
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearch}
                                    onClear={handleClear}
                                    placeholder="Search by name or National ID..."
                                    className="w-full md:w-1/2"
                                />
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <div className="overflow-x-auto">
                                    {filteredData.length > 0 ? (
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">#</th>
                                                    <th scope="col" className="px-6 py-3">RECIPIENT NAME</th>
                                                    <th scope="col" className="px-6 py-3">NATIONAL ID</th>
                                                    <th scope="col" className="px-6 py-3 text-right">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedItems.map((recipient, index) => {
                                                    const itemNumber = startIndex + index + 1;
                                                    
                                                    return (
                                                        <tr key={recipient.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-4">{itemNumber}</td>
                                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{recipient.name}</td>
                                                            <td className="px-6 py-4">{recipient.nationalId}</td>
                                                            <td className="px-6 py-4 text-right">
                                                                {(certificateInfo.status === 'approved' || certificateInfo.status === 'completed') ? (
                                                                    <a href="#" className="text-teal-600 hover:text-teal-800 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 inline-block">
                                                                        <i className="ri-download-2-line text-lg"></i>
                                                                    </a>
                                                                ) : (
                                                                    <button
                                                                        disabled
                                                                        className="text-teal-600 p-2 rounded-md opacity-50 cursor-not-allowed inline-block"
                                                                    >
                                                                        <i class="ri-download-2-line text-lg"></i>
                                                                    </button>
                                                                )
                                                                    }
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                            <i className="ri-search-eye-line text-5xl mb-4"></i>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Recipients Found</h3>
                                            <p className="mt-2">Your search did not match any recipients.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="block md:hidden space-y-4">
                                {filteredData.length > 0 ? (
                                    paginatedItems.map((recipient) => {                                        
                                        return (
                                            <div key={recipient.id} className="flex justify-between items-center p-4 border-b dark:border-gray-700 last:border-b-0">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{recipient.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{recipient.nationalId}</p>
                                                </div>
                                                <div className="flex-shrink-0 ml-4">
                                                    <a href="#" className="text-teal-600 hover:text-teal-800 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 inline-block">
                                                        <i className="ri-download-line text-lg"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                        <i className="ri-search-eye-line text-5xl mb-4"></i>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Recipients Found</h3>
                                        <p className="mt-2">Your search did not match any recipients.</p>
                                    </div>
                                )}
                            </div>
                            
                            {filteredData.length > 0 && (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <BoPagination
                                        currentPage={currentPage}
                                        totalItems={filteredData.length}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BoViewCertificateBatch;