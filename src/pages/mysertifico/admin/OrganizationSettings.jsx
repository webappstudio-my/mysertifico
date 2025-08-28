import React, { useState } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import OrganizationDetailsTab from '../../../components/mysertifico/OrganizationDetailsTab';
import PositionManagementTab from '../../../components/mysertifico/PositionManagementTab';
import ClassroomManagementTab from '../../../components/mysertifico/ClassroomManagementTab';
import Toast from '../../../components/common/Toast';

const OrganizationSettings = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('organization');
    const [positions, setPositions] = useState([
        { id: 1, name: 'Principal' },
        { id: 2, name: 'Senior Assistant' },
        { id: 3, name: 'Head of Department' },
        { id: 4, name: 'Teacher' },
        { id: 5, name: 'Discipline Teacher' },
        { id: 6, name: 'Counselor' },
        { id: 7, name: 'Librarian' },
        { id: 8, name: 'Lab Assistant' },
        { id: 9, name: 'Sports Teacher' },
        { id: 10, name: 'Music Teacher' },
        { id: 11, name: 'Art Teacher' },
        { id: 12, name: 'Administrative Officer' },
    ]);
    const [toast, setToast] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [positionToEdit, setPositionToEdit] = useState(null);
    const [positionToDelete, setPositionToDelete] = useState(null);

    const handleOpenAddModal = () => {
        setPositionToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (position) => {
        setPositionToEdit(position);
        setIsModalOpen(true);
    };

    const handleOpenDeleteConfirm = (position) => {
        setPositionToDelete(position);
        setIsDeleteConfirmOpen(true);
    };

    const handleSavePosition = (newName, position) => {
        let toastMessage = '';
        if (position) { // Editing
            setPositions(positions.map(p => p.id === position.id ? { ...p, name: newName } : p));
            toastMessage = `Position "${newName}" updated successfully.`;
        } else { // Adding
            const newPosition = {
                id: positions.length > 0 ? Math.max(...positions.map(p => p.id)) + 1 : 1,
                name: newName,
            };
            setPositions([...positions, newPosition]);
            toastMessage = `Position "${newName}" added successfully.`;
        }
        setIsModalOpen(false);
        setToast({ message: toastMessage, type: 'success' });
    };

    const handleConfirmDelete = (position) => {
        const deletedPositionName = position.name;
        setPositions(positions.filter(p => p.id !== position.id));
        setIsDeleteConfirmOpen(false);
        setPositionToDelete(null);
        setToast({ message: `Position "${deletedPositionName}" has been deleted.`, type: 'success' });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'position':
                return <PositionManagementTab
                    positions={positions}
                    onSave={handleSavePosition}
                    onDelete={handleConfirmDelete}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    isDeleteConfirmOpen={isDeleteConfirmOpen}
                    setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
                    positionToEdit={positionToEdit}
                    positionToDelete={positionToDelete}
                    onOpenAddModal={handleOpenAddModal}
                    onOpenEditModal={handleOpenEditModal}
                    onOpenDeleteConfirm={handleOpenDeleteConfirm}
                />;
            case 'classroom':
                return <ClassroomManagementTab />;
            case 'organization':
            default:
                return <OrganizationDetailsTab />;
        }
    };

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
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">Organization Settings</h1>

                        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                                <TabButton id="organization" activeTab={activeTab} onClick={setActiveTab}>Organization</TabButton>
                                <TabButton id="position" activeTab={activeTab} onClick={setActiveTab}>Position</TabButton>
                                <TabButton id="classroom" activeTab={activeTab} onClick={setActiveTab}>Classroom</TabButton>
                            </ul>
                        </div>

                        <div id="myTabContent">
                            {renderTabContent()}
                        </div>
                    </div>
                </main>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

const TabButton = ({ id, activeTab, onClick, children }) => {
    const isActive = activeTab === id;
    const activeClasses = 'text-primary border-primary dark:text-accent dark:border-accent';
    const inactiveClasses = 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300';

    return (
        <li className="mr-2" role="presentation">
            <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${isActive ? activeClasses : inactiveClasses}`}
                onClick={() => onClick(id)}
                type="button"
                role="tab"
            >
                {children}
            </button>
        </li>
    );
};

export default OrganizationSettings;
