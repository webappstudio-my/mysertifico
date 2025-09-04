import React, { useState, useMemo, useEffect, useRef } from 'react';
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

const ActionMenu = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
        <a href="#" onClick={(e) => { e.preventDefault(); onEdit(); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-pencil-line mr-3"></i>Edit
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onDelete(); }} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="ri-delete-bin-line mr-3"></i>Delete
        </a>
    </div>
);

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
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const renderGroupRow = (cls, index) => (
        <tr key={cls.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cls.name}</th>
            <td className="px-6 py-4 text-center">
                <div className="relative inline-block" ref={activeMenuId === cls.id ? menuRef : null}>
                    <button onClick={() => setActiveMenuId(activeMenuId === cls.id ? null : cls.id)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <i className="ri-more-2-fill"></i>
                    </button>
                    {activeMenuId === cls.id && (
                        <ActionMenu
                            onEdit={() => { onOpenEditModal(cls); setActiveMenuId(null); }}
                            onDelete={() => { onOpenDeleteConfirm(cls); setActiveMenuId(null); }}
                        />
                    )}
                </div>
            </td>
        </tr>
    );

    const renderGroupCard = (cls) => (
        <div key={cls.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-white">{cls.name}</span>
            <div className="relative" ref={activeMenuId === cls.id ? menuRef : null}>
                <button onClick={() => setActiveMenuId(activeMenuId === cls.id ? null : cls.id)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <i className="ri-more-2-fill"></i>
                </button>
                {activeMenuId === cls.id && (
                    <ActionMenu
                        onEdit={() => { onOpenEditModal(cls); setActiveMenuId(null); }}
                        onDelete={() => { onOpenDeleteConfirm(cls); setActiveMenuId(null); }}
                    />
                )}
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
                message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
                iconClass="ri-error-warning-line text-red-500"
                confirmButtonText="Yes, Delete"
                confirmButtonClass="bg-danger text-white hover:bg-danger-hover"
            />
        </>
    );
};

export default GroupManagementTab;