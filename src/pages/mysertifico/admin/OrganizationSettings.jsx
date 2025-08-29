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
    const [toast, setToast] = useState(null);

    // --- State for Position Management ---
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
    const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
    const [isPositionDeleteConfirmOpen, setIsPositionDeleteConfirmOpen] = useState(false);
    const [positionToEdit, setPositionToEdit] = useState(null);
    const [positionToDelete, setPositionToDelete] = useState(null);

    // --- State for Classroom Management ---
    const [classrooms, setClassrooms] = useState([
        { id: 1, name: '1 Amanah' },
        { id: 2, name: '2 Bestari' },
        { id: 3, name: '3 Cerdas' },
        { id: 4, name: '4 Dedikasi' },
        { id: 5, name: '5 Elit' },
        { id: 6, name: '6 Fikrah' },
    ]);
    const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
    const [isClassroomDeleteConfirmOpen, setIsClassroomDeleteConfirmOpen] = useState(false);
    const [classroomToEdit, setClassroomToEdit] = useState(null);
    const [classroomToDelete, setClassroomToDelete] = useState(null);


    // --- Handlers for Position Management ---
    const handleOpenAddPositionModal = () => {
        setPositionToEdit(null);
        setIsPositionModalOpen(true);
    };
    const handleOpenEditPositionModal = (position) => {
        setPositionToEdit(position);
        setIsPositionModalOpen(true);
    };
    const handleOpenDeletePositionConfirm = (position) => {
        setPositionToDelete(position);
        setIsPositionDeleteConfirmOpen(true);
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
        setIsPositionModalOpen(false);
        setToast({ message: toastMessage, type: 'success' });
    };
    const handleConfirmDeletePosition = (position) => {
        const deletedPositionName = position.name;
        setPositions(positions.filter(p => p.id !== position.id));
        setIsPositionDeleteConfirmOpen(false);
        setPositionToDelete(null);
        setToast({ message: `Position "${deletedPositionName}" has been deleted.`, type: 'success' });
    };

    // --- Handlers for Classroom Management ---
    const handleOpenAddClassroomModal = () => {
        setClassroomToEdit(null);
        setIsClassroomModalOpen(true);
    };
    const handleOpenEditClassroomModal = (classroom) => {
        setClassroomToEdit(classroom);
        setIsClassroomModalOpen(true);
    };
    const handleOpenDeleteClassroomConfirm = (classroom) => {
        setClassroomToDelete(classroom);
        setIsClassroomDeleteConfirmOpen(true);
    };
    const handleSaveClassroom = (newName, classroom) => {
        let toastMessage = '';
        if (classroom) { // Editing
            setClassrooms(classrooms.map(c => c.id === classroom.id ? { ...c, name: newName } : c));
            toastMessage = `Classroom "${newName}" updated successfully.`;
        } else { // Adding
            const newClassroom = {
                id: classrooms.length > 0 ? Math.max(...classrooms.map(c => c.id)) + 1 : 1,
                name: newName,
            };
            setClassrooms([...classrooms, newClassroom]);
            toastMessage = `Classroom "${newName}" added successfully.`;
        }
        setIsClassroomModalOpen(false);
        setToast({ message: toastMessage, type: 'success' });
    };
    const handleConfirmDeleteClassroom = (classroom) => {
        const deletedClassroomName = classroom.name;
        setClassrooms(classrooms.filter(c => c.id !== classroom.id));
        setIsClassroomDeleteConfirmOpen(false);
        setClassroomToDelete(null);
        setToast({ message: `Classroom "${deletedClassroomName}" has been deleted.`, type: 'success' });
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'position':
                return <PositionManagementTab
                    positions={positions}
                    onSave={handleSavePosition}
                    onDelete={handleConfirmDeletePosition}
                    isModalOpen={isPositionModalOpen}
                    setIsModalOpen={setIsPositionModalOpen}
                    isDeleteConfirmOpen={isPositionDeleteConfirmOpen}
                    setIsDeleteConfirmOpen={setIsPositionDeleteConfirmOpen}
                    positionToEdit={positionToEdit}
                    positionToDelete={positionToDelete}
                    onOpenAddModal={handleOpenAddPositionModal}
                    onOpenEditModal={handleOpenEditPositionModal}
                    onOpenDeleteConfirm={handleOpenDeletePositionConfirm}
                />;
            case 'classroom':
                return <ClassroomManagementTab
                    classrooms={classrooms}
                    onSave={handleSaveClassroom}
                    onDelete={handleConfirmDeleteClassroom}
                    isModalOpen={isClassroomModalOpen}
                    setIsModalOpen={setIsClassroomModalOpen}
                    isDeleteConfirmOpen={isClassroomDeleteConfirmOpen}
                    setIsDeleteConfirmOpen={setIsClassroomDeleteConfirmOpen}
                    itemToEdit={classroomToEdit}
                    itemToDelete={classroomToDelete}
                    onOpenAddModal={handleOpenAddClassroomModal}
                    onOpenEditModal={handleOpenEditClassroomModal}
                    onOpenDeleteConfirm={handleOpenDeleteClassroomConfirm}
                />;
            case 'organization':
            default:
                return <OrganizationDetailsTab />;
        }
    };

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
                                <TabButton id="classroom" activeTab={activeTab} onClick={setActiveTab}>Section</TabButton>
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