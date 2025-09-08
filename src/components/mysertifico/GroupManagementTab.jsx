import React, { useState, useMemo, useEffect } from 'react';
import PaginationV2 from '../common/PaginationV2';
import ConfirmationModal from '../common/ConfirmationModal';

const ITEMS_PER_PAGE = 5;

// --- REUSABLE COMPONENTS (Modal, Action Menu, etc.) ---

const ItemModal = ({ isOpen, onClose, onSave, itemToEdit, itemType }) => {
    const [name, setName] = useState('');
    const isEditing = !!itemToEdit;

    useEffect(() => {
        if (isEditing) {
            setName(itemToEdit.name);
        } else {
            setName('');
        }
    }, [itemToEdit, isEditing]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim(), itemToEdit);
        }
    };

    const handleClose = () => {
        setName('');
        onClose();
    };

    return (
        <div className="modal fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 md:w-1/3 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? `Edit ${itemType}` : `Add New ${itemType}`}
                    </h3>
                    <button type="button" onClick={handleClose} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="item-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{`${itemType} Name`}</label>
                        <input
                            type="text"
                            id="item-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={handleClose} className="px-4 py-2 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Action Menu for each table row
const ActionMenu = ({ onEdit, onDelete, position, onClose }) => {
    if (!position) return null;

    return (
        <div 
            className="absolute w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-600"
            style={{ top: position.y, left: position.x }}
        >
            <button
                onClick={() => { onEdit(); onClose(); }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <i className="ri-pencil-line mr-3 text-gray-600 dark:text-gray-400"></i>
                Edit
            </button>
            <button
                onClick={() => { onDelete(); onClose(); }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <i className="ri-delete-bin-line mr-3"></i>
                Delete
            </button>
        </div>
    );
};


// --- MAIN COMPONENT ---

const GroupManagementTab = ({
    groups,
    onSave,
    onDelete,
    isModalOpen,
    setIsModalOpen,
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    itemToEdit,
    itemToDelete,
    onOpenAddModal,
    onOpenEditModal,
    onOpenDeleteConfirm,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (activeMenuId && !e.target.closest('.action-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [activeMenuId]);

    const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [groups, currentPage, totalPages]);

    const paginatedGroups = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return groups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, groups]);

    // Handle action menu
    const handleActionMenu = (e, group) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setActiveMenuId({
            position: {
                x: rect.left - 170 + window.scrollX, // Adjust x to align menu
                y: rect.bottom + window.scrollY + 5
            },
            item: group
        });
    };

    // --- Render ---

    const renderGroupRow = (cls, index) => (
        <tr key={cls.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cls.name}</th>
            <td className="px-6 py-4 text-center">
                <div className="relative inline-block action-menu-container">
                    <button 
                        onClick={(e) => handleActionMenu(e, cls)}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        title="More actions"
                    >
                        <i className="ri-more-2-fill text-lg"></i>
                    </button>
                </div>
            </td>
        </tr>
    );

    const renderGroupCard = (cls) => (
        <div key={cls.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-white">{cls.name}</span>
            <div className="relative action-menu-container">
                <button 
                    onClick={(e) => handleActionMenu(e, cls)}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    title="More actions"
                >
                    <i className="ri-more-2-fill text-lg"></i>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Management</h3>
                    <button onClick={onOpenAddModal} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center">
                        <i className="ri-add-line mr-2"></i>Add Group
                    </button>
                </div>

                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">#</th>
                                <th scope="col" className="px-6 py-3">Group Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedGroups.map(renderGroupRow)}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 md:hidden">
                    {paginatedGroups.map(renderGroupCard)}
                </div>

                <PaginationV2
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={groups.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            </div>

            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={onSave}
                itemToEdit={itemToEdit}
                itemType="Group"
            />
            <ConfirmationModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={() => onDelete(itemToDelete)}
                title="Confirm Deletion"
                message={itemToDelete ? `Are you sure you want to delete "${itemToDelete.name}"?` : ''}
                iconClass="ri-error-warning-line text-4xl text-red-600 dark:text-red-400"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="text-white bg-red-600 hover:bg-red-700"
            />

            {/* Action Menu */}
            {activeMenuId && (
                <div className="action-menu-dropdown">
                    <ActionMenu
                        position={activeMenuId.position}
                        onEdit={() => onOpenEditModal(activeMenuId.item)}
                        onDelete={() => onOpenDeleteConfirm(activeMenuId.item)}
                        onClose={() => setActiveMenuId(null)}
                    />
                </div>
            )}
        </>
    );
};

export default GroupManagementTab;