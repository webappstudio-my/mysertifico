import React, { useState, useMemo } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import PaginationV2 from '../../../components/common/PaginationV2';

// Mock Data - in a real app, this would come from an API
const logosData = [
    { id: 'logo01', name: 'Official Logo', description: 'Primary organization logo.', imgSrc: 'https://placehold.co/150x150/0d9488/FFFFFF?text=Logo' },
    { id: 'badge01', name: 'Gold Badge', description: 'For excellence awards.', imgSrc: 'https://placehold.co/150x150/f59e0b/FFFFFF?text=Badge' },
    { id: 'seal01', name: 'Official Seal', description: 'Seal of authenticity.', imgSrc: 'https://placehold.co/150x150/1e40af/FFFFFF?text=Seal' },
    { id: 'logo02', name: 'Secondary Logo', description: 'Monochrome version.', imgSrc: 'https://placehold.co/150x150/374151/FFFFFF?text=Logo+2' },
    { id: 'badge02', name: 'Silver Badge', description: 'For participation awards.', imgSrc: 'https://placehold.co/150x150/9ca3af/FFFFFF?text=Badge' },
    { id: 'logo03', name: 'Partner Logo', description: 'Logo for partner events.', imgSrc: 'https://placehold.co/150x150/be123c/FFFFFF?text=Partner' },
    { id: 'seal02', name: 'Validation Seal', description: 'Digital validation seal.', imgSrc: 'https://placehold.co/150x150/581c87/FFFFFF?text=Seal' },
    { id: 'badge03', name: 'Completion Badge', description: 'Course completion badge.', imgSrc: 'https://placehold.co/150x150/166534/FFFFFF?text=Done' }
];

const ITEMS_PER_PAGE = 4;

const LogosBadges = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedLogos = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return logosData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage]);

    const totalPages = Math.ceil(logosData.length / ITEMS_PER_PAGE);

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />
                <main className="p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Logos & Badges</h1>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">Browse and select official logos, badges, and seals to add to your certificate templates.</p>
                        </div>

                        <div id="logo-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedLogos.map(item => (
                                <LogoCard key={item.id} item={item} />
                            ))}
                        </div>

                        <PaginationV2
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={logosData.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

const LogoCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-center items-center h-48">
            <img
                src={item.imgSrc}
                alt={item.name}
                className={`max-h-full max-w-full ${item.name.toLowerCase().includes('badge') ? 'rounded-full' : ''}`}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=Error'; }}
            />
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-grow">{item.description}</p>
        </div>
    </div>
);

export default LogosBadges;
