import React, { useState } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';
import OrganizationDetailsTab from '../../../components/mysertifico/OrganizationDetailsTab';
import PositionManagementTab from '../../../components/mysertifico/PositionManagementTab';
import ClassroomManagementTab from '../../../components/mysertifico/ClassroomManagementTab';

const OrganizationSettings = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('organization');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'position':
                return <PositionManagementTab />;
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
                                <TabButton id="organisation" activeTab={activeTab} onClick={setActiveTab}>Organization</TabButton>
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
